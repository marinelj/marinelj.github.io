// Build-time helpers for the GitHub dashboard. Import only from Server Components so the
// config (and its exclusion list) never ships to the browser; pass results down as props.
import data from "@/data/github.json";
import { EXCLUDED_LANGUAGES } from "@/config/github";

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

export type RepoView = Repo & {
  languageColor: ChartColor;
  /** The repo's own language mix, colored like the overall breakdown. */
  segments: { name: string; share: number; color: ChartColor }[];
};

export const github = data as GitHubData;

/** Only three categorical colors stay distinguishable; everything else is "Other". */
const MAX_SERIES = 3;

const excludedLanguages = new Set(EXCLUDED_LANGUAGES.map((name) => name.toLowerCase()));

export function languageBreakdown(repos: Repo[] = github.repos): LanguageSlice[] {
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
      name: "Other",
      bytes,
      share: bytes / total,
      color: "chart-other",
      members: rest.map(([name]) => name),
    });
  }
  return slices;
}

/** Repos with colors that match the overall breakdown, ready for client components. */
export function repoViews(repos: Repo[] = github.repos): RepoView[] {
  const colors = new Map(
    languageBreakdown(repos)
      .filter((slice) => slice.color !== "chart-other")
      .map((slice) => [slice.name, slice.color]),
  );
  const colorFor = (name: string | null): ChartColor =>
    (name && colors.get(name)) || "chart-other";

  return repos.map((repo) => {
    const total = Object.values(repo.languages).reduce((sum, bytes) => sum + bytes, 0);
    const segments: RepoView["segments"] = [];
    let other = 0;
    for (const [name, bytes] of Object.entries(repo.languages).sort((a, b) => b[1] - a[1])) {
      if (colorFor(name) === "chart-other") other += bytes;
      else segments.push({ name, share: bytes / total, color: colorFor(name) });
    }
    if (other > 0) segments.push({ name: "other", share: other / total, color: "chart-other" });
    return { ...repo, languageColor: colorFor(repo.language), segments };
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
