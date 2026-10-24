"use client";

import type { Dictionary } from "@/i18n/types";

import { setTheme, useTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./Icons";

/** Flips between light and dark. Which icon shows is decided in CSS, so it never flashes. */
export function ThemeToggle({ className = "", ui }: { className?: string; ui: Dictionary }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={next === "light" ? ui.switchLight : ui.switchDark}
      title={next === "light" ? ui.switchLight : ui.switchDark}
      className={`press inline-flex size-11 items-center justify-center rounded-xl text-fg-2 hover:bg-surface-2 hover:text-fg ${className}`}
    >
      <MoonIcon className="theme-icon-light" />
      <SunIcon className="theme-icon-dark" />
    </button>
  );
}
