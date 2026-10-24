import type { Locale } from "@/i18n/types";
// Build-time helpers for the GitHub dashboard. Import only from Server Components so the
// config (and its exclusion list) never ships to the browser; pass results down as props.
import data from "@/data/github.json";
import { EXCLUDED_LANGUAGES, REPO_DESCRIPTIONS, REPO_DESCRIPTIONS_ZH } from "@/config/github";

export type Repo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
  languages: Record<string, number>;
};

export type GitHubData = {
  generatedAt: string;
  user: {
    login: string;
    htmlUrl: string;
    followers: number;
    publicRepos: number;
    createdAt: string;
  };
  repos: Repo[];
};

/** Chart color slots defined in globals.css: three categorical colors plus a neutral. */
export type ChartColor = "chart-1" | "chart-2" | "chart-3" | "chart-other";

export type LanguageSlice = {
  name: string;
  bytes: number;
  share: number;
  color: ChartColor;
  /** For the "Other" slice: the languages folded into it. */
  members?: string[];
};

export type RepoView = Omit<Repo, "languages"> & {
  languageColor: ChartColor;
  /** The repo's own language mix, colored like the overall breakdown. */
  segments: { name: string; share: number; color: ChartColor }[];
};

// TypeScript infers the JSON's type from its current contents (each repo's language keys
// differ), so that inferred type can't always be cast straight to GitHubData. The shape is
// guaranteed by scripts/fetch-github.ts, which writes this file.
export const github = data as unknown as GitHubData;

/** Only three categorical colors stay distinguishable; everything else is "Other". */
const MAX_SERIES = 3;

const excludedLanguages = new Set(EXCLUDED_LANGUAGES.map((name) => name.toLowerCase()));

const descriptions = new Map(Object.entries(REPO_DESCRIPTIONS).map(([name, text]) => [name.toLowerCase(), text]));
const descriptionsZh = new Map(Object.entries(REPO_DESCRIPTIONS_ZH).map(([name, text]) => [name.toLowerCase(), text]));
const CHINESE = /[㐀-鿿]/;

/** The English description to show: the config's, else GitHub's unless it's in Chinese. */
function englishDescription({ name, description }: Pick<Repo, "name" | "description">) {
  return descriptions.get(name.toLowerCase()) ?? (description && !CHINESE.test(description) ? description : null);
}

export function languageBreakdown(repos: Repo[] = github.repos, otherLabel = "Other"): LanguageSlice[] {
  const totals = new Map<string, number>();
  for (const repo of repos) {
    for (const [name, bytes] of Object.entries(repo.languages)) {
      if (excludedLanguages.has(name.toLowerCase())) continue;
      totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }
  const sorted = [...totals].sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return [];

  const slices: LanguageSlice[] = sorted.slice(0, MAX_SERIES).map(([name, bytes], index) => ({
    name,
    bytes,
    share: bytes / total,
    color: `chart-${index + 1}` as ChartColor,
  }));
  const rest = sorted.slice(MAX_SERIES);
  if (rest.length > 0) {
    const bytes = rest.reduce((sum, [, b]) => sum + b, 0);
    slices.push({
      name: otherLabel,
      bytes,
      share: bytes / total,
      color: "chart-other",
      members: rest.map(([name]) => name),
    });
  }
  return slices;
}

/** Repos with colors that match the overall breakdown, ready for client components. */
export function repoViews(repos: Repo[] = github.repos, locale: Locale = "en"): RepoView[] {
  const colors = new Map(
    languageBreakdown(repos)
      .filter((slice) => slice.color !== "chart-other")
      .map((slice) => [slice.name, slice.color]),
  );
  const colorFor = (name: string | null): ChartColor =>
    (name && colors.get(name)) || "chart-other";

  return repos.map(({ languages, ...repo }) => {
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const segments: RepoView["segments"] = [];
    let other = 0;
    for (const [name, bytes] of Object.entries(languages).sort((a, b) => b[1] - a[1])) {
      if (colorFor(name) === "chart-other") other += bytes;
      else segments.push({ name, share: bytes / total, color: colorFor(name) });
    }
    if (other > 0) segments.push({ name: locale === "en" ? "other" : "其他", share: other / total, color: "chart-other" });
    const description = locale === "en"
      ? englishDescription(repo)
      : repo.description && CHINESE.test(repo.description)
        ? repo.description
        : descriptionsZh.get(repo.name.toLowerCase()) ?? repo.description;
    return { ...repo, description, languageColor: colorFor(repo.language), segments };
  });
}

export function dashboardSummary(repos: Repo[] = github.repos) {
  const [top] = languageBreakdown(repos);
  const latest = [...repos].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))[0];
  return {
    showcased: repos.length,
    publicRepos: github.user.publicRepos,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    topLanguage: top && top.name !== "Other" ? top : null,
    latest: latest ?? null,
  };
}
