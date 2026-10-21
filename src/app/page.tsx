import Image from "next/image";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { RepoCard } from "@/components/RepoCard";
import { ButtonLink, Card, Chip, Container, SectionHeader } from "@/components/ui";
import { repoViews } from "@/lib/github";
import { mailto, profile } from "@/lib/profile";

/** Pre-sized copies of the portrait (2× the displayed size) sit next to the original. */
function photoAt(width: 160 | 336) {
  return profile.photo.src.replace(/\.jpg$/, `-${width}.jpg`);
}

function StatusChip() {
  return (
    <span className="inline-flex h-[30px] items-center gap-2 self-start rounded-full bg-accent-soft px-3 font-mono text-xs font-medium text-accent">
      <span className="size-[7px] rounded-full bg-accent" aria-hidden="true" />
      {profile.status}
    </span>
  );
}

function ProfileCard() {
  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Availability", value: profile.availability },
    { label: "Languages", value: profile.languages.map((l) => l.name).join(" · ") },
  ];
  const [currentJob] = profile.experience;
  const [currentRole] = currentJob.roles;
  return (
    <Card as="aside" className="hidden w-[360px] shrink-0 flex-col items-center gap-5 p-7 lg:flex">
      <Image
        src={photoAt(336)}
        alt={profile.photo.alt}
        width={168}
        height={168}
        className="size-[168px] rounded-full border border-line bg-surface-2 object-cover"
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-lg font-semibold">
          <span lang="zh-CN">{profile.nativeName}</span> · {profile.aka}
        </p>
        <p className="text-sm text-fg-2">
          {currentRole.title} ({currentRole.level}) · {currentJob.company}
        </p>
      </div>
      <dl className="flex w-full flex-col border-t border-line">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`flex items-baseline justify-between gap-4 py-3 ${
              index < facts.length - 1 ? "border-b border-line" : "pb-0"
            }`}
          >
            <dt className="font-mono text-xs tracking-[0.06em] text-fg-3 uppercase">{fact.label}</dt>
            <dd className="text-right text-sm">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default function Home() {
  const repos = repoViews();
  const [education] = profile.education;

  return (
    <>
      <Container className="flex items-center gap-16 pt-7 pb-12 sm:pt-14 lg:pt-[88px] lg:pb-20">
        <section aria-labelledby="hero-name" className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
          <StatusChip />
          <div className="flex items-center gap-4">
            <Image
              src={photoAt(160)}
              alt={profile.photo.alt}
              width={72}
              height={72}
              className="size-[72px] shrink-0 rounded-full border border-line bg-surface-2 object-cover lg:hidden"
            />
            <div className="flex flex-col gap-1 lg:gap-3">
              <h1
                id="hero-name"
                className="text-[40px] leading-[1.03] font-semibold tracking-[-0.035em] sm:text-[52px] lg:text-[64px]"
              >
                {profile.name}
              </h1>
              <p className="text-lg font-medium tracking-[-0.01em] text-fg-2 sm:text-2xl">
                {profile.headline}
              </p>
            </div>
          </div>
          <p className="eyebrow tracking-[0.06em] text-fg-3">{profile.focus.join(" · ")}</p>
          <p className="max-w-[62ch] text-base leading-relaxed text-fg-2 sm:text-lg">{profile.intro}</p>
          <div className="grid grid-cols-3 gap-2.5 pt-1 sm:flex sm:flex-wrap">
            <ButtonLink href="/contact/" variant="primary" className="col-span-3 text-base">
              <MailIcon />
              Contact me
            </ButtonLink>
            <ButtonLink href="/resume/" className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]">
              <FileIcon size={16} />
              Resume
            </ButtonLink>
            <ButtonLink href={profile.contact.github} className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]">
              <GitHubIcon size={16} />
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.contact.linkedin} className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]">
              <LinkedInIcon size={16} />
              LinkedIn
            </ButtonLink>
          </div>
        </section>
        <ProfileCard />
      </Container>

      <Container className="pb-14 lg:pb-24">
        <section aria-labelledby="glance" className="flex flex-col gap-3.5 lg:gap-4">
          <h2 id="glance" className="eyebrow text-fg-3">
            At a glance
          </h2>
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
            {profile.metrics.map((metric) => (
              <li key={metric.value}>
                <Card className="flex h-full flex-col gap-1.5 px-3.5 py-4 lg:gap-2 lg:p-5">
                  <span className="text-[30px] leading-[1.1] font-semibold tracking-[-0.02em] lg:text-[40px] lg:leading-[1.05] lg:tracking-[-0.03em]">
                    {metric.value}
                  </span>
                  <span className="text-sm leading-snug text-fg-2">{metric.label}</span>
                  <span className="mt-auto pt-1 font-mono text-[11px] text-fg-3 lg:text-xs">
                    {metric.source}
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-14 lg:pb-24">
        <section aria-labelledby="experience" className="flex flex-col gap-6">
          <SectionHeader
            id="experience"
            eyebrow="01 / About"
            title="Experience"
            action={{ href: "/about/", label: "Full experience & skills" }}
          />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <ExperienceTimeline jobs={profile.experience} />
            <Card as="aside" className="hidden flex-col lg:flex">
              <div className="flex flex-col gap-3 border-b border-line px-6 py-5">
                <h3 className="text-[15px] font-semibold">Core skills</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {profile.coreSkills.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2.5 border-b border-line px-6 py-5">
                <h3 className="text-[15px] font-semibold">Education</h3>
                <p className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium">{education.school}</span>
                  <span className="text-sm text-fg-2">{education.degree}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2.5 border-b border-line px-6 py-5">
                <h3 className="text-[15px] font-semibold">Languages</h3>
                <dl className="flex flex-col gap-2 text-sm">
                  {profile.languages.map((language) => (
                    <div key={language.name} className="flex justify-between gap-3">
                      <dt className="font-medium">{language.name}</dt>
                      <dd className="text-right text-fg-2">{language.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-col gap-2.5 px-6 py-5">
                <h3 className="text-[15px] font-semibold">Recognition</h3>
                <ul className="flex flex-col gap-2 text-sm leading-snug text-fg-2">
                  {profile.awards.slice(0, 1).map((award) => (
                    <li key={award.title}>
                      {award.title} · {award.year}
                    </li>
                  ))}
                  {profile.patents.map((patent) => (
                    <li key={patent.title}>{patent.title}</li>
                  ))}
                  <li>{profile.memberships.slice(0, 2).join(" · ")}</li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </Container>

      <Container className="pb-14 lg:pb-24">
        <section aria-labelledby="projects" className="flex flex-col gap-6">
          <SectionHeader
            id="projects"
            eyebrow="02 / Projects"
            title="On GitHub"
            action={{ href: "/projects/", label: "Open the projects dashboard" }}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, 3).map((repo, index) => (
              <RepoCard key={repo.name} repo={repo} className={index > 0 ? "hidden md:flex" : ""} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <section aria-labelledby="contact-band">
          <Card className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 p-6 sm:p-10 lg:p-12">
            <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-2.5">
              <span className="eyebrow text-accent">03 / Contact</span>
              <h2
                id="contact-band"
                className="text-[26px] leading-tight font-semibold tracking-[-0.02em] sm:text-[32px]"
              >
                Get in touch
              </h2>
              <p className="text-base leading-relaxed text-fg-2">
                {profile.status}. Based in {profile.location}, and {profile.availability.toLowerCase()}.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:flex-wrap">
              <ButtonLink href={mailto} variant="primary" className="col-span-2 text-base">
                <MailIcon />
                Email me
              </ButtonLink>
              <ButtonLink href={profile.contact.linkedin} className="bg-bg">
                LinkedIn
              </ButtonLink>
              <ButtonLink href={profile.contact.github} className="bg-bg">
                GitHub
              </ButtonLink>
            </div>
          </Card>
        </section>
      </Container>
    </>
  );
}
