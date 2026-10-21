import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AnimatedValue } from "./AnimatedValue";
import { ArrowRightIcon } from "./Icons";

/** Pastel tints for widgets. Full class names so Tailwind can see them. */
const TINTS = [
  { bg: "bg-tint-lavender", ink: "text-ink-lavender" },
  { bg: "bg-tint-sky", ink: "text-ink-sky" },
  { bg: "bg-tint-peach", ink: "text-ink-peach" },
  { bg: "bg-tint-mint", ink: "text-ink-mint" },
  { bg: "bg-tint-pink", ink: "text-ink-pink" },
  { bg: "bg-tint-lemon", ink: "text-ink-lemon" },
] as const;

export function tintAt(index: number) {
  return TINTS[index % TINTS.length];
}

/** Stagger delay for entrance animations, as a style prop. */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  download?: boolean;
};

const buttonBase =
  "press inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium whitespace-nowrap [&>svg]:shrink-0";
const buttonVariants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover shadow-[0_10px_24px_-14px_var(--shadow)]",
  secondary: "border border-line bg-surface text-fg hover:border-accent/40 hover:bg-accent-soft",
};

/** Internal routes use client-side navigation; files, mail and other sites use a plain <a>. */
export function ButtonLink({ href, children, variant = "secondary", className = "", download }: ButtonLinkProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  if (download || /^(https?:|mailto:)/.test(href) || /\.\w+$/.test(href)) {
    return (
      <a href={href} download={download || undefined} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="nudge inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium text-accent hover:text-accent-hover"
    >
      {children}
      <ArrowRightIcon size={16} />
    </Link>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-accent">{eyebrow}</span>
        <h2 id={id} className="text-[26px] leading-tight font-semibold tracking-[-0.02em] sm:text-[32px]">
          {title}
        </h2>
      </div>
      {action && <TextLink href={action.href}>{action.label}</TextLink>}
    </div>
  );
}

/** Page title block shared by the inner pages. */
export function PageHeader({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Container className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 pt-8 pb-8 sm:pt-12 lg:pt-16">
      <div className="flex max-w-[720px] min-w-0 flex-[999_1_520px] flex-col gap-3">
        <span className="reveal eyebrow text-accent">{eyebrow}</span>
        <h1
          className="reveal-soft text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px] lg:text-[48px]"
          style={delay(60)}
        >
          {title}
        </h1>
        <div className="reveal-soft flex flex-col gap-3" style={delay(120)}>
          {children}
        </div>
      </div>
      {aside && (
        <div className="pop" style={delay(180)}>
          {aside}
        </div>
      )}
    </Container>
  );
}

export function Chip({ children, tint }: { children: ReactNode; tint?: number }) {
  const color = tint === undefined ? "bg-surface-2" : tintAt(tint).bg;
  return (
    <li
      className={`inline-flex min-h-[30px] items-center rounded-full px-3 py-1 text-[13px] leading-snug text-fg-2 ${color}`}
    >
      {children}
    </li>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "aside" | "figure";
  interactive?: boolean;
}) {
  return (
    <Tag className={`rounded-2xl border border-line bg-surface ${interactive ? "lift" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/** A tinted circle holding a widget's icon. */
export function IconBadge({ tint, children }: { tint: number; children: ReactNode }) {
  return (
    <span
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface shadow-[0_4px_12px_-6px_var(--shadow)] ${tintAt(tint).ink}`}
    >
      {children}
    </span>
  );
}

/**
 * Pastel stat tile: icon, a number that counts up, and its labels.
 * `label` sits above the value (dashboard); `caption` sits below it (home).
 */
export function StatTile({
  icon,
  value,
  label,
  caption,
  note,
  index,
}: {
  icon: ReactNode;
  value: string;
  label?: string;
  caption?: string;
  note: string;
  index: number;
}) {
  return (
    <div
      className={`reveal lift flex h-full min-w-0 flex-col gap-2 rounded-2xl border border-transparent p-4 sm:p-5 ${tintAt(index).bg}`}
      style={delay(index * 90)}
    >
      <div className="flex items-center gap-2.5">
        <IconBadge tint={index}>{icon}</IconBadge>
        {label && <span className="text-[13px] font-medium text-fg-2">{label}</span>}
      </div>
      <span className="mt-1 text-[28px] leading-[1.05] font-semibold tracking-[-0.02em] [overflow-wrap:anywhere] sm:text-[36px] lg:text-[40px]">
        <AnimatedValue value={value} delay={index * 90} />
      </span>
      {caption && <span className="text-sm leading-snug text-fg-2">{caption}</span>}
      <span className="mt-auto pt-1 font-mono text-[11px] text-fg-3 sm:text-xs">{note}</span>
    </div>
  );
}
