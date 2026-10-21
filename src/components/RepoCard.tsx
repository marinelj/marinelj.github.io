import type { ChartColor, RepoView } from "@/lib/github";
import { formatDate, formatShare } from "@/lib/format";
import { ArrowUpRightIcon, ForkIcon, GlobeIcon, StarIcon } from "./Icons";

/** Full class names so Tailwind sees them; colors come from the chart tokens. */
export const swatchClass: Record<ChartColor, string> = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-other": "bg-chart-other",
};

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function RepoCard({ repo, className = "" }: { repo: RepoView; className?: string }) {
  const mix = repo.segments.map((s) => `${s.name} ${formatShare(s.share)}`).join(", ");
  return (
    <article
      className={`flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-surface p-5 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 text-[17px] font-semibold [overflow-wrap:anywhere]">
          <a href={repo.htmlUrl} className="-my-2.5 inline-block py-2.5 text-fg hover:text-accent">
            {repo.name}
          </a>
        </h3>
        <span className="shrink-0 font-mono text-xs text-fg-3">
          <span className="sr-only">Updated </span>
          <time dateTime={repo.pushedAt}>{formatDate(repo.pushedAt)}</time>
        </span>
      </div>

      {repo.description ? (
        <p className="text-sm leading-relaxed text-fg-2">{repo.description}</p>
      ) : (
        <p className="text-sm leading-relaxed text-fg-3 italic">No description on GitHub yet.</p>
      )}

      {repo.topics.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
          {repo.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent"
            >
              {topic}
            </li>
          ))}
        </ul>
      )}

      <div
        role="img"
        aria-label={`Language mix: ${mix}`}
        className="mt-auto flex h-1.5 gap-0.5 overflow-hidden rounded-[3px]"
      >
        {repo.segments.map((segment) => (
          <span
            key={segment.name}
            className={swatchClass[segment.color]}
            style={{ flex: `${segment.share} 1 0` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-fg-2">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className={`size-2.5 rounded-full ${swatchClass[repo.languageColor]}`} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <StarIcon size={15} />
          {plural(repo.stars, "star")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ForkIcon size={15} />
          {plural(repo.forks, "fork")}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 border-t border-line pt-1">
        <a
          href={repo.htmlUrl}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
        >
          View code<span className="sr-only"> for {repo.name} on GitHub</span>
          <ArrowUpRightIcon size={14} />
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            <GlobeIcon size={15} />
            Live demo<span className="sr-only"> of {repo.name}</span>
          </a>
        )}
      </div>
    </article>
  );
}
