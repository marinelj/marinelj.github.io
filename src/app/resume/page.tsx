import type { Metadata } from "next";
import { DownloadIcon } from "@/components/Icons";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { formatDate, formatRange } from "@/lib/format";
import { mailto, profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Jia Li, senior data engineer: experience, skills, education and languages, with a PDF download.",
  alternates: { canonical: "/resume/" },
  openGraph: { url: "/resume/" },
};

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-line pt-6 print:break-inside-avoid-page">
      <h3 className="eyebrow text-accent">{title}</h3>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="04 / Resume"
        title="Resume"
        aside={
          <ButtonLink href={profile.resume.pdf} download variant="primary" className="no-print">
            <DownloadIcon />
            Download PDF
          </ButtonLink>
        }
      >
        <p className="text-base text-fg-2">
          Last updated <time dateTime={profile.resume.updated}>{formatDate(profile.resume.updated)}</time>
        </p>
      </PageHeader>

      <Container className="pb-16 lg:pb-24">
        <article
          aria-labelledby="resume-name"
          className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-5 sm:p-10 lg:p-12 print:border-0 print:p-0"
        >
          <header className="flex flex-col gap-2">
            <h2 id="resume-name" className="text-[28px] leading-tight font-semibold tracking-[-0.02em] sm:text-[34px]">
              {profile.name}
            </h2>
            <p className="text-base font-medium text-fg-2 sm:text-lg">
              {profile.headline} · {profile.focus.join(" · ")}
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 text-sm text-fg-2">
              <li>{profile.location}</li>
              <li>{profile.availability}</li>
              <li>
                <a href={mailto} className="inline-flex min-h-11 min-w-11 items-center text-accent hover:text-accent-hover">
                  Email
                </a>
              </li>
              <li>
                <a href={profile.contact.linkedin} className="inline-flex min-h-11 min-w-11 items-center text-accent hover:text-accent-hover">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.contact.github} className="inline-flex min-h-11 min-w-11 items-center text-accent hover:text-accent-hover">
                  GitHub
                </a>
              </li>
            </ul>
          </header>

          <ResumeSection title="Summary">
            <p className="text-[15px] leading-relaxed text-fg-2">{profile.bio}</p>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="flex flex-col gap-7">
              {profile.experience.map((job) => (
                <div key={job.company} className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-lg font-semibold">{job.company}</h4>
                    <span className="font-mono text-[13px] text-fg-3">
                      {job.location} · {formatRange(job.start, job.end)}
                    </span>
                  </div>
                  {job.roles.map((role) => (
                    <div key={`${role.title}-${role.start}`} className="flex flex-col gap-2 print:break-inside-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                        <h5 className="text-base font-semibold">
                          {role.title}
                          {role.level && <span className="font-normal text-fg-3"> · {role.level}</span>}
                        </h5>
                        <span className="font-mono text-[13px] text-fg-3">{formatRange(role.start, role.end)}</span>
                      </div>
                      <p className="text-sm text-fg-2">
                        <span className="font-medium text-fg">{role.team}.</span> {role.summary}
                      </p>
                      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-fg-2 marker:text-fg-3">
                        {role.highlights.map((highlight) => (
                          <li key={highlight.title}>
                            <span className="font-medium text-fg">{highlight.title}:</span> {highlight.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Skills">
            <dl className="grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-[200px_minmax(0,1fr)]">
              {profile.skills.map((group) => (
                <div key={group.category} className="contents">
                  <dt className="font-medium">{group.category}</dt>
                  <dd className="mb-2 text-fg-2 sm:mb-0">{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2 sm:gap-10">
            <section className="flex flex-col gap-3">
              <h3 className="eyebrow text-accent">Education</h3>
              {profile.education.map((item) => (
                <p key={item.school} className="flex flex-col text-sm">
                  <span className="font-medium">{item.school}</span>
                  <span className="text-fg-2">{item.degree}</span>
                </p>
              ))}
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="eyebrow text-accent">Languages</h3>
              <ul className="flex flex-col gap-1 text-sm">
                {profile.languages.map((language) => (
                  <li key={language.name}>
                    <span className="font-medium">{language.name}</span>{" "}
                    <span className="text-fg-2">
                      — {language.level}
                      {language.note && ` · ${language.note}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <ResumeSection title="Recognition">
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-fg-2 marker:text-fg-3">
              {profile.awards.map((award) => (
                <li key={award.title}>
                  <span className="font-medium text-fg">{award.title}</span> — {award.org}
                  {award.year && `, ${award.year}`}. {award.detail}.
                </li>
              ))}
              {profile.patents.map((patent) => (
                <li key={patent.title}>
                  <span className="font-medium text-fg">{patent.title}</span> — {patent.detail}.
                </li>
              ))}
              {profile.publications.map((publication) => (
                <li key={publication.title}>
                  <span className="font-medium text-fg">{publication.title}</span> — {publication.venue},{" "}
                  {publication.year}.
                </li>
              ))}
              <li>{profile.memberships.join("; ")}.</li>
            </ul>
          </ResumeSection>
        </article>
      </Container>
    </>
  );
}
