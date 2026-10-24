import type { Locale } from "@/i18n/types";

/** UTC keeps the exported page and browser in agreement. */
export function formatDate(iso: string, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: locale === "en" ? "short" : "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatMonthDay(iso: string, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: locale === "en" ? "short" : "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatMonthYear(iso: string, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : locale, {
    month: locale === "en" ? "short" : "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(iso));
}

/** Resume dates are "YYYY" or "YYYY-MM"; null means the role is current. */
export function formatRange(start: string, end: string | null, locale: Locale = "en"): string {
  return locale === "en"
    ? `${start.slice(0, 4)} — ${end ? end.slice(0, 4) : "now"}`
    : `${start.slice(0, 4)} 年 — ${end ? `${end.slice(0, 4)} 年` : "至今"}`;
}

function toMonths(value: string): number {
  const [year, month = "1"] = value.split("-");
  return Number(year) * 12 + Number(month) - 1;
}

/** Whole years between two resume dates. Open-ended ranges run to now. */
export function formatDuration(start: string, end: string | null, now = new Date()): string {
  const endMonths = end ? toMonths(end) : now.getUTCFullYear() * 12 + now.getUTCMonth();
  const months = Math.max(0, endMonths - toMonths(start));
  const years = Math.floor(months / 12);
  if (years === 0) return `${months} mo${months === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"}`;
}

/** SI units, matching GitHub. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes >= 1e3) return `${Math.round(bytes / 1e3)} KB`;
  return `${bytes} B`;
}

export function formatShare(share: number): string {
  return `${(share * 100).toFixed(1)}%`;
}
