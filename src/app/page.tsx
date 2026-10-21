import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import {
  ActivityIcon,
  BagIcon,
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/Icons";
import { RepoCard } from "@/components/RepoCard";
import { ButtonLink, Card, Chip, Container, SectionHeader, StatTile, delay } from "@/components/ui";
import { repoViews } from "@/lib/github";
import { mailto, profile } from "@/lib/profile";

const METRIC_ICONS: Record<string, ReactNode> = {
  orders: <BagIcon />,
  events: <ActivityIcon />,
  record: <TrophyIcon />,
  team: <UsersIcon />,
};

/** Pre-sized copies of the portrait (2× the displayed size) sit next to the original. */
function photoAt(width: 160 | 336) {
  return profile.photo.src.replace(/\.jpg$/, `-${width}.jpg`);
}

/** Portrait inside a slowly turning gradient ring. */
function Portrait({ size, src, className = "" }: { size: number; src: string; className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ width: size + 12, height: size + 12 }}
    >
      <span className="photo-ring spin-slow absolute inset-0 rounded-full" aria-hidden="true" />
      <span className="absolute inset-[3px] rounded-full bg-surface" aria-hidden="true" />
      <Image
        src={src}
        alt={profile.photo.alt}
        width={size}
        height={size}
        className="relative rounded-full bg-surface-2 object-cover"
        style={{ width: size, height: size }}
      />
    </span>
  );
}

/** Blurred pastel blobs drifting behind the hero. Decorative only. */
function HeroBlobs() {
  const blobs = [
    { className: "left-[-8%] top-[-30%] size-[420px] bg-tint-lavender", dx: "40px", dy: "30px" },
    { className: "right-[-6%] top-[-20%] size-[360px] bg-tint-pink", dx: "-36px", dy: "24px" },
    { className: "right-[18%] bottom-[-35%] size-[380px] bg-tint-peach", dx: "-24px", dy: "-30px" },
    { className: "left-[22%] bottom-[-40%] size-[320px] bg-tint-sky", dx: "30px", dy: "-20px" },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      aria-hidden="true"
    >
      {blobs.map((blob) => (
        <span
          key={blob.className}
          className={`drift absolute rounded-full opacity-80 blur-3xl ${blob.className}`}
          style={{ "--dx": blob.dx, "--dy": blob.dy } as CSSProperties}
        />
      ))}
    </div>
  );
}

function StatusChip() {
  return (
    <span
      className="reveal inline-flex h-8 items-center gap-2 self-start rounded-full border border-ink-mint/20 bg-tint-mint px-3.5 font-mono text-xs font-medium text-ink-mint"
      style={delay(0)}
    >
      <span className="pulse size-[7px] rounded-full bg-ink-mint text-ink-mint" aria-hidden="true" />
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
    <Card
      as="aside"
      className="pop relative hidden w-[360px] shrink-0 flex-col items-center gap-5 p-7 shadow-[0_30px_60px_-36px_var(--shadow)] lg:flex"
    >
      <Portrait size={168} src={photoAt(336)} />
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
      <div className="relative overflow-x-clip">
        <HeroBlobs />
        <Container className="relative flex items-center gap-16 pt-8 pb-12 sm:pt-14 lg:pt-[88px] lg:pb-20">
          <section aria-labelledby="hero-name" className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
            <StatusChip />
            <div className="flex items-center gap-4">
              <Portrait size={72} src={photoAt(160)} className="pop lg:hidden" />
              <div className="flex flex-col gap-1 lg:gap-3">
                <h1
                  id="hero-name"
                  className="reveal-soft text-[40px] leading-[1.03] font-semibold tracking-[-0.035em] sm:text-[52px] lg:text-[64px]"
                  style={delay(60)}
                >
                  {profile.name}
                </h1>
                <p
                  className="reveal bg-linear-90 from-accent to-accent-2 bg-clip-text text-lg font-semibold tracking-[-0.01em] text-transparent sm:text-2xl"
                  style={delay(120)}
                >
                  {profile.headline}
                </p>
              </div>
            </div>
            <p className="reveal eyebrow tracking-[0.06em] text-fg-3" style={delay(180)}>
              {profile.focus.join(" · ")}
            </p>
            <p className="reveal-soft max-w-[62ch] text-base leading-relaxed text-fg-2 sm:text-lg" style={delay(200)}>
              {profile.intro}
            </p>
            <div className="reveal grid grid-cols-3 gap-2.5 pt-1 sm:flex sm:flex-wrap" style={delay(260)}>
              <ButtonLink href="/contact/" variant="primary" className="col-span-3 text-base">
                <MailIcon />
                Contact me
              </ButtonLink>
              <ButtonLink href="/resume/" className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]">
                <FileIcon size={16} />
                Resume
              </ButtonLink>
              <ButtonLink
                href={profile.contact.github}
                className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]"
              >
                <GitHubIcon size={16} />
                GitHub
              </ButtonLink>
              <ButtonLink
                href={profile.contact.linkedin}
                className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-[18px] sm:text-[15px]"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </ButtonLink>
            </div>
          </section>
          <ProfileCard />
        </Container>
      </div>

      <Container className="pb-14 lg:pb-24">
        <section aria-labelledby="glance" className="flex flex-col gap-3.5 lg:gap-4">
          <h2 id="glance" className="reveal eyebrow text-fg-3">
            At a glance
          </h2>
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
            {profile.metrics.map((metric, index) => (
              <li key={metric.value}>
                <StatTile
                  index={index}
                  icon={METRIC_ICONS[metric.icon] ?? <ActivityIcon />}
                  value={metric.value}
                  caption={metric.label}
                  note={metric.source}
                />
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
            <Card as="aside" className="reveal hidden flex-col lg:flex">
              <div className="flex flex-col gap-3 border-b border-line px-6 py-5">
                <h3 className="text-[15px] font-semibold">Core skills</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {profile.coreSkills.map((skill, index) => (
                    <Chip key={skill} tint={index}>
                      {skill}
                    </Chip>
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
              <RepoCard
                key={repo.name}
                repo={repo}
                index={index}
                className={index > 0 ? "hidden md:flex" : ""}
              />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <section aria-labelledby="contact-band" className="reveal">
          <div className="pastel-wash flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-3xl border border-line p-6 sm:p-10 lg:p-12">
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
              <ButtonLink href={profile.contact.linkedin}>LinkedIn</ButtonLink>
              <ButtonLink href={profile.contact.github}>GitHub</ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
