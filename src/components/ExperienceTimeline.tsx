import { formatDuration, formatRange } from "@/lib/format";
import type { Job } from "@/lib/profile";
import { Card, delay, tintAt } from "./ui";

type Props = {
  jobs: Job[];
  /** "full" adds each role's summary and highlights (About page). */
  detail?: "compact" | "full";
  headingLevel?: "h2" | "h3";
};

/** Companies with their roles nested on a thin rail; the current role gets the accent dot. */
export function ExperienceTimeline({ jobs, detail = "compact", headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  return (
    <ol className="flex flex-col gap-4">
      {jobs.map((job, jobIndex) => (
        <li key={job.company} className="reveal" style={delay(jobIndex * 90)}>
          <Card interactive className="flex flex-wrap gap-x-6 gap-y-3 p-5 sm:p-6">
            <div className="flex shrink-0 basis-[140px] flex-row items-center gap-3 font-mono text-[13px] text-fg-2 sm:flex-col sm:items-start sm:gap-1.5">
              <span className={`rounded-full px-2.5 py-0.5 ${tintAt(jobIndex).bg}`}>
                {formatRange(job.start, job.end)}
              </span>
              <span className="text-xs text-fg-3 sm:pl-2.5">{formatDuration(job.start, job.end)}</span>
            </div>
            <div className="flex min-w-0 flex-[999_1_300px] flex-col gap-3.5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Heading className="text-lg font-semibold sm:text-xl">{job.company}</Heading>
                <span className="text-[13px] text-fg-3">{job.location}</span>
              </div>
              <ol className="relative flex flex-col gap-3.5 pl-[22px]">
                <span className="absolute top-2 bottom-2 left-1 w-px bg-line" aria-hidden="true" />
                {job.roles.map((role) => {
                  const current = role.end === null;
                  return (
                    <li key={`${role.title}-${role.start}`} className="relative flex flex-col gap-0.5">
                      <span
                        className={`absolute top-1.5 -left-[22px] size-[9px] rounded-full ${
                          current ? "pulse bg-accent text-accent" : "border border-fg-3 bg-surface"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">{role.title}</span>
                        {role.level && (
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-medium text-accent">
                            {role.level}
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-fg-2">
                        {role.team} · {formatRange(role.start, role.end)}
                      </span>
                      {detail === "full" && (
                        <div className="mt-2 flex flex-col gap-3">
                          <p className="text-[15px] leading-relaxed text-fg-2">{role.summary}</p>
                          <ul className="flex flex-col gap-2.5">
                            {role.highlights.map((highlight) => (
                              <li key={highlight.title} className="text-[15px] leading-relaxed text-fg-2">
                                <span className="font-medium text-fg">{highlight.title}.</span>{" "}
                                {highlight.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
