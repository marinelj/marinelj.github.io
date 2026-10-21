/**
 * Fetches public GitHub data for the projects dashboard and writes src/data/github.json.
 *
 *   npm run fetch:github                    # unauthenticated: 60 requests/hour
 *   GITHUB_TOKEN=xxx npm run fetch:github   # authenticated: much higher limit
 *
 * Excluded repos, forks and archived repos are dropped here, so they never reach the site.
 * Runs on Node 24+, which executes TypeScript directly.
 */
import { writeFile } from "node:fs/promises";
import {
  EXCLUDED_REPOS,
  GITHUB_USERNAME,
  INCLUDE_ARCHIVED,
  INCLUDE_FORKS,
} from "../src/config/github.ts";

type ApiUser = {
  login: string;
  html_url: string;
  followers: number;
  public_repos: number;
  created_at: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
};

const API = "https://api.github.com";
const OUT_FILE = new URL("../src/data/github.json", import.meta.url);

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${GITHUB_USERNAME}-personal-site`,
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

class FatalError extends Error {}

/** GET a GitHub API path, retrying network errors and 5xx/429 responses with backoff. */
async function getJson<T>(path: string, attempts = 4): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(`${API}${path}`, { headers });
      if (res.ok) return (await res.json()) as T;
      const limited = res.headers.get("x-ratelimit-remaining") === "0";
      const message = `GET ${path} failed: ${res.status} ${res.statusText}${
        limited ? " (rate limit reached; set GITHUB_TOKEN)" : ""
      }`;
      if (res.status !== 429 && res.status < 500) throw new FatalError(message);
      throw new Error(message);
    } catch (error) {
      if (error instanceof FatalError || attempt >= attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
    }
  }
}

async function listOwnedRepos(user: string): Promise<ApiRepo[]> {
  const repos: ApiRepo[] = [];
  for (let page = 1; ; page++) {
    const batch = await getJson<ApiRepo[]>(
      `/users/${user}/repos?type=owner&sort=pushed&per_page=100&page=${page}`,
    );
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

function normalizeHomepage(url: string | null): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const user = await getJson<ApiUser>(`/users/${GITHUB_USERNAME}`);
const excluded = new Set(EXCLUDED_REPOS.map((name) => name.toLowerCase()));
const showcased = (await listOwnedRepos(GITHUB_USERNAME)).filter(
  (repo) =>
    !repo.private &&
    !excluded.has(repo.name.toLowerCase()) &&
    (INCLUDE_FORKS || !repo.fork) &&
    (INCLUDE_ARCHIVED || !repo.archived),
);

const repos = [];
for (const repo of showcased) {
  const languages = await getJson<Record<string, number>>(
    `/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
  );
  repos.push({
    name: repo.name,
    description: repo.description?.trim() || null,
    htmlUrl: repo.html_url,
    homepage: normalizeHomepage(repo.homepage),
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushedAt: repo.pushed_at,
    topics: repo.topics ?? [],
    languages,
  });
}
repos.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

const data = {
  generatedAt: new Date().toISOString(),
  user: {
    login: user.login,
    htmlUrl: user.html_url,
    followers: user.followers,
    publicRepos: user.public_repos,
    createdAt: user.created_at,
  },
  repos,
};

await writeFile(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(
  `Wrote ${repos.length} repos to src/data/github.json (${repos.map((r) => r.name).join(", ")})`,
);
