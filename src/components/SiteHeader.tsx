"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type CSSProperties } from "react";
import { NAV_ITEMS } from "@/config/site";
import { setTheme, useTheme, type Theme } from "@/lib/theme";
import {
  ChevronRightIcon,
  CloseIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
} from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  resumePdf: string;
  github: string;
  linkedin: string;
  mailto: string;
};

const APPEARANCE: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname === href.replace(/\/$/, "");
}

function Monogram() {
  return (
    <span
      className="inline-flex size-8 items-center justify-center rounded-[10px] bg-linear-135 from-[#6b4ef0] to-[#c2306e] text-[13px] font-semibold tracking-tight text-white shadow-[0_6px_16px_-6px_rgb(107_78_240/0.6)]"
      aria-hidden="true"
    >
      JL
    </span>
  );
}

export function SiteHeader({ resumePdf, github, linkedin, mailto }: Props) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => menuRef.current?.close();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex min-h-11 items-center gap-2.5 rounded-lg text-fg">
          <span className="transition-transform duration-300 group-hover:-rotate-6">
            <Monogram />
          </span>
          <span className="text-base font-semibold">Jia Li</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.filter((item) => item.href !== "/contact/").map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  current ? "bg-accent-soft text-accent" : "text-fg-2 hover:bg-surface-2 hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 lg:gap-2">
          <ThemeToggle className="lg:border lg:border-line lg:bg-surface" />
          <Link
            href="/contact/"
            aria-current={isCurrent(pathname, "/contact/") ? "page" : undefined}
            className="press hidden h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-on-accent hover:bg-accent-hover lg:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="press inline-flex size-11 items-center justify-center rounded-xl text-fg hover:bg-surface-2 lg:hidden"
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>

      <dialog
        id="site-menu"
        ref={menuRef}
        aria-label="Site menu"
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto border-0 bg-bg p-0 text-fg open:flex lg:hidden"
      >
        <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
          <span className="inline-flex items-center gap-2.5">
            <Monogram />
            <span className="text-base font-semibold">Jia Li</span>
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="press inline-flex size-11 items-center justify-center rounded-xl bg-surface-2 text-fg"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-col px-5 pt-3 sm:px-6">
          {NAV_ITEMS.map((item, index) => {
            const current = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={current ? "page" : undefined}
                style={{ "--i": index } as CSSProperties}
                className="menu-item flex min-h-16 items-center gap-4 border-b border-line text-fg"
              >
                <span
                  className={`w-6 font-mono text-xs ${current ? "text-accent" : "text-fg-3"}`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-2xl tracking-tight ${current ? "font-semibold text-accent" : "font-medium"}`}
                >
                  {item.label}
                </span>
                {current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent">
                    <span className="size-[7px] rounded-full bg-accent" aria-hidden="true" />
                    Current
                  </span>
                ) : (
                  <ChevronRightIcon className="text-fg-3" />
                )}
              </Link>
            );
          })}
        </nav>

        <fieldset
          className="menu-item mt-7 flex flex-col gap-2.5 px-5 sm:px-6"
          style={{ "--i": NAV_ITEMS.length } as CSSProperties}
        >
          <legend className="eyebrow mb-2.5 text-fg-3">Appearance</legend>
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1">
            {APPEARANCE.map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="appearance"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={() => setTheme(option.value)}
                  className="peer sr-only"
                />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-transparent text-sm font-medium text-fg-2 transition-colors peer-checked:border-line peer-checked:bg-surface peer-checked:font-semibold peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div
          className="menu-item mt-auto flex flex-col gap-3 border-t border-line px-5 pt-5 pb-8 sm:px-6"
          style={{ "--i": NAV_ITEMS.length + 1 } as CSSProperties}
        >
          <a
            href={resumePdf}
            download
            className="press flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-base font-medium text-on-accent"
          >
            <DownloadIcon />
            Download resume (PDF)
          </a>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href={github}
              aria-label="GitHub"
              className="press flex h-12 items-center justify-center rounded-2xl border border-line bg-surface text-fg"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href={linkedin}
              aria-label="LinkedIn"
              className="press flex h-12 items-center justify-center rounded-2xl border border-line bg-surface text-fg"
            >
              <LinkedInIcon size={20} />
            </a>
            <a
              href={mailto}
              aria-label="Email"
              className="press flex h-12 items-center justify-center rounded-2xl border border-line bg-surface text-fg"
            >
              <MailIcon size={20} />
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
