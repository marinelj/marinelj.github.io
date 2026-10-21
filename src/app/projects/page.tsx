import type { Metadata } from "next";
import { ArrowUpRightIcon, ClockIcon, CodeIcon, GitHubIcon, RepoIcon, StarIcon } from "@/components/Icons";
import { LanguageBreakdown } from "@/components/LanguageBreakdown";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { ButtonLink, Card, Container, PageHeader, StatTile } from "@/components/ui";
import { EXCLUDED_LANGUAGES } from "@/config/github";
import { formatDate, formatMonthDay, formatMonthYear } from "@/lib/format";
import { dashboardSummary, github, languageBreakdown, repoViews } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Public GitHub repositories by Jia Li (marinelj), refreshed daily: language breakdown, stars and recent activity.",
  alternates: { canonical: "/projects/" },
  openGraph: { url: "/projects/" },
};

export default function ProjectsPage() {
  const summary = dashboardSummary();
  const slices = languageBreakdown();
  const repos = repoViews();
  const { user, generatedAt } = github;
  const excluded = EXCLUDED_LANGUAGES.length > 0 ? ` · ${EXCLUDED_LANGUAGES.join(", ")} excluded` : "";

  const stats = [
    {
      icon: <RepoIcon />,
      label: "Showcased repos",
      value: String(summary.showcased),
      note: `of ${summary.publicRepos} public repos`,
    },
    { icon: <StarIcon />, label: "Total stars", value: String(summary.totalStars), note: "across showcased repos" },
    {
      icon: <CodeIcon />,
      label: "Top language",
      value: summary.topLanguage?.name ?? "—",
      note: summary.topLanguage ? `${Math.round(summary.topLanguage.share * 100)}% of code by bytes` : "no data yet",
    },
    {
      icon: <ClockIcon />,
      label: "Last update",
      value: summary.latest ? formatMonthDay(summary.latest.pushedAt) : "—",
      note: summary.latest
        ? `${summary.latest.name} · ${new Date(summary.latest.pushedAt).getUTCFullYear()}`
        : "no repos yet",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="03 / Projects"
        title="GitHub work"
        aside={
          <span className="inline-flex h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-fg-2">
            <span className="size-[7px] rounded-full bg-accent" aria-hidden="true" />
            Data refreshed <time dateTime={generatedAt}>{formatDate(generatedAt)}</time>
          </span>
        }
      >
        <p className="max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          Public repositories, rebuilt daily from the GitHub API. Forks and archived repos are left out.
        </p>
      </PageHeader>

      <Container className="flex flex-col gap-4 pb-16 sm:gap-6 lg:pb-20">
        <section aria-label="Summary">
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <li key={stat.label}>
                <StatTile index={index} {...stat} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card as="figure" className="reveal m-0 flex min-w-0 flex-col gap-5 p-4 sm:p-6">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-base font-semibold sm:text-lg">Language breakdown</span>
              <span className="text-[13px] text-fg-3">
                Share of code by bytes · {repos.length} repos{excluded}
              </span>
            </figcaption>
            <LanguageBreakdown slices={slices} />
          </Card>

          <Card className="reveal flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tint-lavender text-ink-lavender">
                <GitHubIcon size={22} />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <h2 className="text-[17px] font-semibold">@{user.login}</h2>
                <p className="text-[13px] text-fg-3">GitHub profile</p>
              </div>
            </div>
            <dl className="flex flex-col border-t border-line text-sm">
              {[
                ["Public repos", String(user.publicRepos)],
                ["Followers", String(user.followers)],
                ["Member since", formatMonthYear(user.createdAt)],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-3 border-b border-line py-3">
                  <dt className="text-fg-2">{term}</dt>
                  <dd className="font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={user.htmlUrl} className="nudge mt-auto h-11 w-full text-sm">
              Open GitHub profile
              <ArrowUpRightIcon size={14} />
            </ButtonLink>
          </Card>
        </div>

        <ProjectsBrowser repos={repos} />
      </Container>
    </>
  );
}
