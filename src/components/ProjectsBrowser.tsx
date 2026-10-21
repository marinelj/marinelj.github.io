"use client";

import { useMemo, useState } from "react";
import { flushSync } from "react-dom";
import type { ChartColor, RepoView } from "@/lib/github";
import { RepoCard, swatchClass } from "./RepoCard";

type Sort = "updated" | "stars";

const SORTS: { value: Sort; label: string }[] = [
  { value: "updated", label: "Recently updated" },
  { value: "stars", label: "Most stars" },
];

/** Animates the grid between states with the View Transitions API where available. */
function withTransition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !document.startViewTransition) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

/** Language filter chips, sort control and the repo grid. */
export function ProjectsBrowser({ repos }: { repos: RepoView[] }) {
  const [language, setLanguageState] = useState<string | null>(null);
  const [sort, setSortState] = useState<Sort>("updated");
  const setLanguage = (next: string | null) => withTransition(() => setLanguageState(next));
  const setSort = (next: Sort) => withTransition(() => setSortState(next));

  const languages = useMemo(() => {
    const counts = new Map<string, { count: number; color: ChartColor }>();
    for (const repo of repos) {
      if (!repo.language) continue;
      const entry = counts.get(repo.language) ?? { count: 0, color: repo.languageColor };
      counts.set(repo.language, { ...entry, count: entry.count + 1 });
    }
    return [...counts]
      .map(([name, entry]) => ({ name, ...entry }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [repos]);

  const shown = useMemo(() => {
    const filtered = language ? repos.filter((repo) => repo.language === language) : repos;
    return [...filtered].sort((a, b) =>
      sort === "stars"
        ? b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt)
        : b.pushedAt.localeCompare(a.pushedAt),
    );
  }, [repos, language, sort]);

  const chip =
    "press inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium";
  const chipOn = "border-accent bg-accent text-on-accent";
  const chipOff = "border-line bg-surface text-fg hover:border-accent/40 hover:bg-accent-soft";

  return (
    <section aria-labelledby="repositories" className="flex flex-col gap-4">
      <h2 id="repositories" className="sr-only">
        Repositories
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div role="group" aria-label="Filter by language" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={language === null}
            onClick={() => setLanguage(null)}
            className={`${chip} ${
              language === null ? chipOn : chipOff
            }`}
          >
            All
            <span className={`font-mono text-xs ${language === null ? "" : "text-fg-3"}`}>{repos.length}</span>
          </button>
          {languages.map((entry) => {
            const pressed = language === entry.name;
            return (
              <button
                key={entry.name}
                type="button"
                aria-pressed={pressed}
                onClick={() => setLanguage(pressed ? null : entry.name)}
                className={`${chip} ${
                  pressed ? chipOn : chipOff
                }`}
              >
                <span className={`size-2 rounded-full ${swatchClass[entry.color]}`} aria-hidden="true" />
                {entry.name}
                <span className={`font-mono text-xs ${pressed ? "" : "text-fg-3"}`}>{entry.count}</span>
              </button>
            );
          })}
        </div>

        <fieldset className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <legend className="sr-only">Sort repositories</legend>
          <span className="hidden text-[13px] text-fg-3 sm:inline" aria-hidden="true">
            Sort by
          </span>
          <div className="grid w-full grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1 sm:inline-flex sm:w-auto">
            {SORTS.map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sort === option.value}
                  onChange={() => setSort(option.value)}
                  className="peer sr-only"
                />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-transparent px-4 text-sm font-medium text-fg-2 transition-colors peer-checked:border-line peer-checked:bg-surface peer-checked:font-semibold peer-checked:text-accent peer-checked:shadow-[0_4px_12px_-8px_var(--shadow)] peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {repos.length} repositories
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((repo, index) => (
          <RepoCard key={repo.name} repo={repo} index={index} />
        ))}
      </div>
    </section>
  );
}
