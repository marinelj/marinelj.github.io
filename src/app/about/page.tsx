import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Card, Chip, Container, PageHeader, SectionHeader } from "@/components/ui";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About & Experience",
  description:
    "Experience, skills and education of Jia Li, senior data engineer: data platforms and ETL at Alibaba, warehouse systems at JD.com, telecom software at Nokia Siemens Networks.",
  alternates: { canonical: "/about/" },
  openGraph: { url: "/about/" },
};

export default function AboutPage() {
  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Availability", value: profile.availability },
    { label: "Focus", value: profile.focus.join(" · ") },
  ];

  return (
    <>
      <PageHeader eyebrow="01 / About" title="About & Experience">
        <p className="max-w-[68ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">{profile.bio}</p>
        <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-0.5">
              <dt className="eyebrow text-fg-3">{fact.label}</dt>
              <dd className="text-[15px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Container className="pb-14 lg:pb-20">
        <section aria-labelledby="experience" className="flex flex-col gap-6">
          <SectionHeader id="experience" eyebrow="Career" title="Experience" />
          <ExperienceTimeline jobs={profile.experience} detail="full" />
          <Card className="flex flex-wrap gap-x-6 gap-y-3 p-5 sm:p-6">
            <span className="shrink-0 basis-[140px] font-mono text-[13px] text-fg-3">Education</span>
            <ul className="flex min-w-0 flex-[999_1_300px] flex-col gap-3">
              {profile.education.map((item) => (
                <li key={item.school} className="flex flex-col gap-0.5">
                  <h3 className="text-lg font-semibold sm:text-xl">{item.school}</h3>
                  <p className="text-sm text-fg-2">{item.degree}</p>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </Container>

      <Container className="pb-14 lg:pb-20">
        <section aria-labelledby="skills" className="flex flex-col gap-6">
          <SectionHeader id="skills" eyebrow="Toolkit" title="Skills" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.skills.map((group) => (
              <li key={group.category}>
                <Card className="flex h-full flex-col gap-3 p-5">
                  <h3 className="text-[15px] font-semibold">{group.category}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <section aria-labelledby="more" className="flex flex-col gap-6">
          <SectionHeader id="more" eyebrow="Also" title="Languages & recognition" />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-4 p-5 sm:p-6">
              <h3 className="text-[15px] font-semibold">Languages</h3>
              <dl className="flex flex-col">
                {profile.languages.map((language, index) => (
                  <div
                    key={language.name}
                    className={`flex flex-wrap justify-between gap-x-4 gap-y-0.5 py-3 ${
                      index > 0 ? "border-t border-line" : "pt-0"
                    }`}
                  >
                    <dt className="font-medium">{language.name}</dt>
                    <dd className="text-right text-fg-2">
                      {language.level}
                      {language.note && <span className="text-fg-3"> · {language.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card className="flex flex-col gap-4 p-5 sm:p-6">
              <h3 className="text-[15px] font-semibold">Recognition</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-relaxed">
                {profile.awards.map((award) => (
                  <li key={award.title} className="flex flex-col">
                    <span className="font-medium">
                      {award.title}
                      {award.year && <span className="font-normal text-fg-3"> · {award.year}</span>}
                    </span>
                    <span className="text-sm text-fg-2">
                      {award.org} — {award.detail}
                    </span>
                  </li>
                ))}
                {profile.patents.map((patent) => (
                  <li key={patent.title} className="flex flex-col">
                    <span className="font-medium">{patent.title}</span>
                    <span className="text-sm text-fg-2">{patent.detail}</span>
                  </li>
                ))}
                {profile.publications.map((publication) => (
                  <li key={publication.title} className="flex flex-col">
                    <span className="font-medium">{publication.title}</span>
                    <span className="text-sm text-fg-2">
                      {publication.venue} · {publication.year}
                    </span>
                  </li>
                ))}
                <li className="text-sm text-fg-2">{profile.memberships.join(" · ")}</li>
              </ul>
            </Card>
          </div>
        </section>
      </Container>
    </>
  );
}
