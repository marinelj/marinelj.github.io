import { text, type Dictionary, type Locale } from "@/i18n/types";
import type { ChartColor, RepoView } from "@/lib/github";
import { formatDate, formatShare } from "@/lib/format";
import { ArrowUpRightIcon, ForkIcon, GlobeIcon, RepoIcon, StarIcon } from "./Icons";
import { delay, tintAt } from "./ui";

/** Full class names so Tailwind sees them; colors come from the chart tokens. */
export const swatchClass: Record<ChartColor, string> = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-other": "bg-chart-other",
};

export function RepoCard({
  repo,
  ui,
  locale,
  index = 0,
  className = "",
}: {
  repo: RepoView;
  ui: Dictionary;
  locale: Locale;
  /** Position in the grid: staggers the entrance and picks the icon's tint. */
  index?: number;
  className?: string;
}) {
  const mix = repo.segments.map((s) => `${s.name} ${formatShare(s.share)}`).join(", ");
  const tint = tintAt(index);
  return (
    <article
      className={`reveal lift flex min-w-0 flex-col gap-3 rounded-2xl border border-line bg-surface p-5 ${className}`}
      style={{ ...delay(index * 90), viewTransitionName: `repo-${repo.name.replace(/[^\w-]/g, "-")}` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex size-10 items-center justify-center rounded-xl ${tint.bg} ${tint.ink}`} aria-hidden="true">
          <RepoIcon size={18} />
        </span>
        <span className="shrink-0 font-mono text-xs text-fg-3">
          <span className="sr-only">{ui.updated} </span>
          <time dateTime={repo.pushedAt}>{formatDate(repo.pushedAt, locale)}</time>
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 text-[17px] font-semibold [overflow-wrap:anywhere]">
          <a href={repo.htmlUrl} className="-my-2.5 inline-block min-h-11 py-2.5 text-fg hover:text-accent">
            {repo.name}
          </a>
        </h3>
      </div>

      {repo.description ? (
        <p className="text-sm leading-relaxed text-fg-2">{repo.description}</p>
      ) : (
        <p className="text-sm leading-relaxed text-fg-3 italic">{ui.noDescription}</p>
      )}

      {repo.topics.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label={ui.topics}>
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
        aria-label={text(ui.languageMix, { mix })}
        className="grow-x mt-auto flex h-1.5 gap-0.5 overflow-hidden rounded-full"
        style={delay(index * 90)}
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
          {text(repo.stars === 1 ? ui.star : ui.stars, { count: repo.stars })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ForkIcon size={15} />
          {text(repo.forks === 1 ? ui.fork : ui.forks, { count: repo.forks })}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 border-t border-line pt-1">
        <a
          href={repo.htmlUrl}
          className="nudge inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
        >
          {ui.viewCode}<span className="sr-only">{text(ui.codeFor, { name: repo.name })}</span>
          <ArrowUpRightIcon size={14} />
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            <GlobeIcon size={15} />
            {ui.liveDemo}<span className="sr-only">{text(ui.demoOf, { name: repo.name })}</span>
          </a>
        )}
      </div>
    </article>
  );
}
