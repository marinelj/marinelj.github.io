import { text, type Content } from "@/i18n/types";
import { ArrowUpRightIcon, ClockIcon, CodeIcon, GitHubIcon, RepoIcon, StarIcon } from "@/components/Icons";
import { LanguageBreakdown } from "@/components/LanguageBreakdown";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { ThreadCard } from "@/components/ThreadCard";
import { ButtonLink, Card, Container, PageHeader, SectionHeader, StatTile } from "@/components/ui";
import { EXCLUDED_LANGUAGES } from "@/config/github";
import { formatDate, formatMonthDay, formatMonthYear } from "@/lib/format";
import { dashboardSummary, github, languageBreakdown, repoViews } from "@/lib/github";

/** Every project in story order, strung on one line. */
function Thread({ content }: { content: Content }) {
  const { story } = content;
  return (
    <ol className="relative flex flex-col gap-5 pl-7 sm:gap-6 sm:pl-12">
      <span
        className="absolute top-3 bottom-3 left-[9px] w-0.5 rounded-full bg-linear-180 from-chart-1 via-accent-2 to-chart-3 sm:left-[17px]"
        aria-hidden="true"
      />
      {story.thread.map((item) => (
        <li key={item.id} className="relative">
          <span
            className="absolute top-7 -left-7 size-5 rounded-full border-4 border-bg bg-accent sm:-left-12 sm:size-[22px]"
            aria-hidden="true"
          />
          <ThreadCard item={item} showChapter heading="h2" content={content} />
        </li>
      ))}
    </ol>
  );
}

export function ProjectsPage({ content }: { content: Content }) {
  const { ui, locale } = content;
  const summary = dashboardSummary();
  const slices = languageBreakdown(undefined, ui.other);
  const repos = repoViews(undefined, locale);
  const { user, generatedAt } = github;
  const excluded = EXCLUDED_LANGUAGES.length > 0 ? text(ui.excluded, { names: EXCLUDED_LANGUAGES.join(ui.comma) }) : "";

  const stats = [
    {
      icon: <RepoIcon />,
      label: ui.showcased,
      value: String(summary.showcased),
      note: text(ui.ofPublic, { count: summary.publicRepos }),
    },
    { icon: <StarIcon />, label: ui.totalStars, value: String(summary.totalStars), note: ui.acrossRepos },
    {
      icon: <CodeIcon />,
      label: ui.topLanguage,
      value: summary.topLanguage?.name ?? "—",
      note: summary.topLanguage ? text(ui.codeShare, { count: Math.round(summary.topLanguage.share * 100) }) : ui.noData,
    },
    {
      icon: <ClockIcon />,
      label: ui.lastUpdate,
      value: summary.latest ? formatMonthDay(summary.latest.pushedAt, locale) : "—",
      note: summary.latest
        ? `${summary.latest.name} · ${new Date(summary.latest.pushedAt).getUTCFullYear()}`
        : ui.noRepos,
    },
  ];

  return (
    <>
      <PageHeader eyebrow={ui.projectsEyebrow} title={ui.projectsTitle}>
        <p className="max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          {ui.projectsIntro}
        </p>
      </PageHeader>

      <Container className="pb-16 lg:pb-24">
        <Thread content={content} />
      </Container>

      <Container className="flex flex-col gap-4 pb-16 sm:gap-6 lg:pb-20">
        <div className="flex flex-col gap-3">
          <SectionHeader id="github" eyebrow={ui.githubEyebrow} title={ui.githubTitle} />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-fg-2">
            {ui.githubIntro}
            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-fg-2">
              <span className="size-[7px] rounded-full bg-accent" aria-hidden="true" />
              {ui.refresh} <time dateTime={generatedAt}>{formatDate(generatedAt, locale)}</time>
            </span>
          </p>
        </div>

        <section aria-label={ui.summary}>
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
              <span className="text-base font-semibold sm:text-lg">{ui.languageBreakdown}</span>
              <span className="text-[13px] text-fg-3">
                {text(ui.shareRepos, { count: repos.length })}{excluded}
              </span>
            </figcaption>
            <LanguageBreakdown slices={slices} ui={ui} />
          </Card>

          <Card className="reveal flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tint-lavender text-ink-lavender">
                <GitHubIcon size={22} />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="text-[17px] font-semibold">@{user.login}</h3>
                <p className="text-[13px] text-fg-3">{ui.githubProfile}</p>
              </div>
            </div>
            <dl className="flex flex-col border-t border-line text-sm">
              {[
                [ui.publicRepos, String(user.publicRepos)],
                [ui.followers, String(user.followers)],
                [ui.memberSince, formatMonthYear(user.createdAt, locale)],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-3 border-b border-line py-3">
                  <dt className="text-fg-2">{term}</dt>
                  <dd className="font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={user.htmlUrl} className="nudge mt-auto h-11 w-full text-sm">
              {ui.openGithub}
              <ArrowUpRightIcon size={14} />
            </ButtonLink>
          </Card>
        </div>

        <ProjectsBrowser repos={repos} ui={ui} locale={locale} />
      </Container>
    </>
  );
}
