"use client";

import { setThemePreference, useResolvedTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./Icons";

/** Flips between light and dark. Which icon shows is decided in CSS, so it never flashes. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useResolvedTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setThemePreference(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`inline-flex size-11 items-center justify-center rounded-[10px] text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
    >
      <MoonIcon className="theme-icon-light" />
      <SunIcon className="theme-icon-dark" />
    </button>
  );
}
