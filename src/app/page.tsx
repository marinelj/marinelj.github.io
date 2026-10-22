import type { CSSProperties, ReactNode } from "react";
import { Glyph } from "@/components/Glyph";
import {
  ActivityIcon,
  ArrowDownIcon,
  BagIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/Icons";
import { MixedText } from "@/components/MixedText";
import { PhotoGrid, PhotoStack } from "@/components/Photo";
import { ThreadCard } from "@/components/ThreadCard";
import { ButtonLink, Container, StatTile, TextLink, delay } from "@/components/ui";
import { mailto, profile } from "@/lib/profile";
import { photoById, story, threadFor, type Block, type Chapter } from "@/lib/story";

const METRIC_ICONS: Record<string, ReactNode> = {
  orders: <BagIcon />,
  events: <ActivityIcon />,
  record: <TrophyIcon />,
  team: <UsersIcon />,
};

/**
 * Blurred pastel blobs drifting behind the hero. Decorative only. They sit in a
 * fixed-size box anchored to the top, so text reflowing as fonts load can't move them.
 */
function HeroBlobs() {
  const blobs = [
    { className: "left-[-8%] top-[-140px] size-[420px] bg-tint-lavender", dx: "40px", dy: "30px" },
    { className: "right-[-6%] top-[-100px] size-[360px] bg-tint-pink", dx: "-36px", dy: "24px" },
    { className: "right-[18%] top-[420px] size-[380px] bg-tint-peach", dx: "-24px", dy: "-30px" },
    { className: "left-[22%] top-[480px] size-[320px] bg-tint-sky", dx: "30px", dy: "-20px" },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[860px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
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

/** The cover: who I am, and three prints from the story. */
function Hero() {
  return (
    <div className="relative overflow-x-clip">
      <HeroBlobs />
      <Container className="relative grid items-center gap-10 pt-8 pb-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:pt-20 lg:pb-16">
        <section aria-labelledby="hero-name" className="flex min-w-0 flex-col gap-5 lg:gap-6">
          <span
            className="reveal inline-flex h-8 items-center gap-2 self-start rounded-full border border-ink-lavender/20 bg-tint-lavender px-3.5 font-mono text-xs font-medium text-ink-lavender"
            style={delay(0)}
          >
            <span className="pulse size-[7px] rounded-full bg-ink-lavender text-ink-lavender" aria-hidden="true" />
            {story.title}
          </span>
          <div className="flex flex-col gap-2">
            <h1
              id="hero-name"
              className="reveal-soft text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[56px] lg:text-[68px]"
              style={delay(60)}
            >
              {profile.name}
            </h1>
            <p className="reveal text-lg text-fg-2 sm:text-xl" style={delay(100)}>
              <span lang="zh-CN">{profile.nativeName}</span> · {profile.aka}
            </p>
          </div>
          <p
            className="reveal self-start bg-linear-90 from-accent to-accent-2 bg-clip-text text-xl font-semibold tracking-[-0.01em] text-transparent sm:text-2xl"
            style={delay(140)}
          >
            {story.tagline}
          </p>
          <div
            className="reveal-soft flex max-w-[60ch] flex-col gap-3 text-base leading-relaxed text-fg-2 sm:text-lg"
            style={delay(200)}
          >
            {story.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="reveal grid grid-cols-2 gap-2.5 pt-1 sm:flex sm:flex-wrap" style={delay(260)}>
            <ButtonLink href="#roots" variant="primary" className="col-span-2 text-base">
              Start reading
              <ArrowDownIcon size={18} />
            </ButtonLink>
            <ButtonLink href="/photos/">Photos</ButtonLink>
            <ButtonLink href="/projects/">Projects</ButtonLink>
          </div>
        </section>
        <PhotoStack photos={story.heroPhotos.map(photoById)} />
      </Container>
    </div>
  );
}

/** The line from Confucius that the whole story follows. */
function Epigraph() {
  const { motto } = story;
  return (
    <Container className="pb-10 lg:pb-14">
      <section
        aria-labelledby="motto"
        className="reveal pastel-wash rounded-3xl border border-line px-5 py-10 text-center sm:px-12 sm:py-14"
      >
        <p className="eyebrow text-accent">The main plot</p>
        <h2
          id="motto"
          lang="zh-CN"
          className="wipe mt-4 pl-[0.14em] font-zh text-[48px] leading-tight tracking-[0.14em] sm:text-[76px] lg:text-[92px]"
        >
          <span className="bg-linear-90 from-accent to-accent-2 bg-clip-text text-transparent">{motto.short}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[34ch] text-lg leading-snug font-medium sm:text-2xl">“{motto.translation}”</p>
        <p className="mt-3 font-mono text-xs leading-relaxed text-fg-3">
          {motto.source} · <span lang="zh-CN">{motto.full}</span>
        </p>
        <p className="mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-fg-2">{motto.note}</p>
      </section>
    </Container>
  );
}

function Contents() {
  return (
    <Container>
      <nav aria-labelledby="contents" className="flex flex-col gap-4">
        <h2 id="contents" className="reveal eyebrow text-fg-3">
          Contents
        </h2>
        <ol className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {story.chapters.map((chapter, index) => (
            <li key={chapter.id} className="reveal" style={delay(index * 60)}>
              <a
                href={`#${chapter.id}`}
                className="lift flex h-full min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface p-2.5 sm:min-h-[68px] sm:p-4"
              >
                <Glyph char={chapter.glyph} index={index} size="sm" />
                {/* Phones show the chapter name only; wider screens add its title. */}
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-fg-3">
                    {String(index + 1).padStart(2, "0")}
                    <span className="hidden sm:inline"> · {chapter.label}</span>
                  </span>
                  <span className="text-[15px] leading-snug font-medium text-fg sm:hidden">{chapter.label}</span>
                  <span className="hidden text-[15px] leading-snug font-medium text-fg sm:block">
                    <MixedText text={chapter.title} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}

function ChapterBlock({ block, chapterId }: { block: Block; chapterId: string }) {
  switch (block.type) {
    case "text":
      return (
        <p className="reveal max-w-[64ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          <MixedText text={block.text} />
        </p>
      );
    case "quote":
      return (
        <figure className="reveal m-0 max-w-[40ch] border-l-4 border-accent/60 py-1 pl-5 sm:pl-6">
          <blockquote className="text-[22px] leading-snug font-medium tracking-[-0.01em] text-fg sm:text-[28px]">
            “{block.text}”
          </blockquote>
          <figcaption className="mt-3 font-mono text-xs text-fg-3">In my own words</figcaption>
        </figure>
      );
    case "stats":
      return (
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
      );
    case "thread":
      return (
        <ul className="flex flex-col gap-4">
          {threadFor(chapterId).map((item, index) => (
            <li key={item.id}>
              <ThreadCard item={item} order={index} />
            </li>
          ))}
        </ul>
      );
    case "photos":
      return <PhotoGrid photos={block.ids.map(photoById)} layout={block.layout} />;
    case "link":
      return <TextLink href={block.href}>{block.label}</TextLink>;
  }
}

function ChapterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  const titleId = `${chapter.id}-title`;
  return (
    <section
      id={chapter.id}
      aria-labelledby={titleId}
      className="grid gap-6 py-10 sm:py-14 lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-10"
    >
      {/* On wide screens the chapter's glyph rides down the thread while you read. */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-full ring-8 ring-bg">
          <Glyph char={chapter.glyph} index={index} size="lg" className="pop" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-6">
        <header className="reveal flex flex-col gap-3 lg:gap-1.5">
          <div className="flex items-center gap-3">
            <Glyph char={chapter.glyph} index={index} className="lg:hidden" />
            <p className="eyebrow flex flex-wrap gap-x-2 text-accent">
              <span className="whitespace-nowrap">
                Chapter {index + 1} · {chapter.label}
              </span>
              <span className="whitespace-nowrap text-fg-3">— {chapter.place}</span>
            </p>
          </div>
          <h2
            id={titleId}
            className="text-[28px] leading-[1.12] font-semibold tracking-[-0.02em] sm:text-[36px] lg:text-[40px]"
          >
            <MixedText text={chapter.title} />
          </h2>
        </header>
        {chapter.blocks.map((block, blockIndex) => (
          <ChapterBlock key={blockIndex} block={block} chapterId={chapter.id} />
        ))}
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <Container className="relative">
      {/* The thread: one line through every chapter. It fills in as you scroll, where supported. */}
      <span
        className="thread-line pointer-events-none absolute top-32 bottom-32 left-[calc(2rem+35px)] hidden w-0.5 rounded-full lg:block"
        aria-hidden="true"
      >
        <span className="thread-progress absolute inset-0" />
      </span>
      {story.chapters.map((chapter, index) => (
        <ChapterSection key={chapter.id} chapter={chapter} index={index} />
      ))}
    </Container>
  );
}

function Ending() {
  return (
    <Container className="pb-16 lg:pb-24">
      <section
        aria-labelledby="ending"
        className="reveal pastel-wash flex flex-col items-center gap-5 rounded-3xl border border-line px-5 py-12 text-center sm:px-12 sm:py-16"
      >
        <span className="seal pop" lang="zh-CN" aria-hidden="true">
          {profile.nativeName}
        </span>
        <h2 id="ending" className="text-[28px] leading-tight font-semibold tracking-[-0.02em] sm:text-[36px]">
          {story.ending.title}
        </h2>
        <p className="max-w-[46ch] text-base leading-relaxed text-fg-2 sm:text-lg">{story.ending.text}</p>
        <div className="grid w-full grid-cols-2 gap-2.5 pt-1 sm:flex sm:w-auto sm:flex-wrap sm:justify-center">
          <ButtonLink href={mailto} variant="primary" className="col-span-2 text-base">
            <MailIcon />
            Email me
          </ButtonLink>
          <ButtonLink href={profile.contact.linkedin}>
            <LinkedInIcon size={16} />
            LinkedIn
          </ButtonLink>
          <ButtonLink href={profile.contact.github}>
            <GitHubIcon size={16} />
            GitHub
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Epigraph />
      <Contents />
      <Chapters />
      <Ending />
    </>
  );
}
