import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

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
  "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[15px] font-medium whitespace-nowrap transition-colors [&>svg]:shrink-0";
const buttonVariants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-fg hover:bg-surface-2",
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
      className="inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium text-accent hover:text-accent-hover"
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
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
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
        <span className="eyebrow text-accent">{eyebrow}</span>
        <h1 className="text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px] lg:text-[48px]">
          {title}
        </h1>
        {children}
      </div>
      {aside}
    </Container>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex min-h-[30px] items-center rounded-lg bg-surface-2 px-2.5 py-1 text-[13px] leading-snug text-fg-2">
      {children}
    </li>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "aside" | "figure";
}) {
  return <Tag className={`rounded-xl border border-line bg-surface ${className}`}>{children}</Tag>;
}
