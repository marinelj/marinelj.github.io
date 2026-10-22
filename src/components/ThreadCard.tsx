import { chapterById, story, type ThreadItem, type ThreadTag } from "@/lib/story";
import { Glyph } from "./Glyph";
import { ArrowRightIcon, ArrowUpRightIcon } from "./Icons";
import { MixedText } from "./MixedText";
import { delay, tintAt } from "./ui";

const TAGS: Record<ThreadTag, { label: string; className: string }> = {
  work: { label: "At work", className: "bg-tint-lemon" },
  "open-source": { label: "Open source", className: "bg-tint-mint" },
  live: { label: "Live", className: "bg-tint-sky" },
  private: { label: "Private", className: "bg-surface-2" },
};

/**
 * One project told the way the whole story is: 温故 (what it starts from) → 知新
 * (what it makes). With `showChapter`, it also links back to its chapter.
 */
export function ThreadCard({
  item,
  order = 0,
  showChapter = false,
  heading: Heading = "h3",
}: {
  item: ThreadItem;
  /** Position in its list: staggers the entrance. */
  order?: number;
  showChapter?: boolean;
  heading?: "h2" | "h3";
}) {
  // Tint by place in the whole thread, so neighbouring chapters don't repeat colors.
  // Lavender (tint 0) is skipped: it is too close to the "old" side.
  const tint = tintAt(1 + (story.thread.indexOf(item) % 5));
  const chapterIndex = story.chapters.findIndex((c) => c.id === item.chapter);
  const chapter = chapterById(item.chapter);

  return (
    <article
      className="reveal lift flex min-w-0 flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-6"
      style={delay(order * 90)}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-col gap-1">
          <Heading className="text-lg leading-snug font-semibold tracking-[-0.01em] sm:text-xl">
            <MixedText text={item.title} />
          </Heading>
          <p className="font-mono text-xs text-fg-3">
            {item.where} · {item.when}
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Status">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className={`inline-flex min-h-[26px] items-center rounded-full px-2.5 text-xs font-medium text-fg-2 ${TAGS[tag].className}`}
            >
              {TAGS[tag].label}
            </li>
          ))}
        </ul>
      </header>

      {item.role && <p className="-mt-1 text-sm font-medium text-accent">{item.role}</p>}

      <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
        <p className="m-0 flex flex-col gap-1.5 rounded-xl border border-dashed border-fg-3/40 bg-bg p-4">
          <span className="eyebrow text-fg-3">
            <span lang="zh-CN">温故</span> · From
          </span>
          <span className="text-[15px] leading-snug text-fg-2">{item.old}</span>
        </p>
        <span
          className="relative z-10 -my-2.5 inline-flex size-9 items-center justify-center self-center justify-self-center rounded-full border border-line bg-surface text-accent shadow-[0_6px_14px_-8px_var(--shadow)] md:-mx-2.5 md:my-0"
          aria-hidden="true"
        >
          <ArrowRightIcon size={16} className="rotate-90 md:rotate-0" />
        </span>
        <p className={`m-0 flex flex-col gap-1.5 rounded-xl p-4 ${tint.bg}`}>
          <span className="eyebrow text-fg-2">
            <span lang="zh-CN">知新</span> · To
          </span>
          <span className="text-[15px] leading-snug font-medium text-fg">{item.next}</span>
        </p>
      </div>

      {item.detail && <p className="text-sm leading-relaxed text-fg-2">{item.detail}</p>}

      {(item.links || showChapter) && (
        <ul className="flex flex-wrap gap-2">
          {showChapter && (
            <li>
              <a
                href={`/#${chapter.id}`}
                className="press inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface pr-4 pl-1.5 text-sm font-medium text-fg hover:border-accent/40 hover:bg-accent-soft"
              >
                <Glyph char={chapter.glyph} index={chapterIndex} size="xs" />
                Chapter {chapterIndex + 1}: {chapter.label}
              </a>
            </li>
          )}
          {item.links?.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="press nudge inline-flex h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg hover:border-accent/40 hover:bg-accent-soft"
              >
                {link.label}
                <span className="sr-only"> ({item.title})</span>
                <ArrowUpRightIcon size={14} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
