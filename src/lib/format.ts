const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-19T18:10:06Z" → "Oct 19, 2026" (UTC, so build and browser agree). */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

const monthDayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** "2026-10-19T18:10:06Z" → "Oct 19", for tight spots where the year is shown nearby. */
export function formatMonthDay(iso: string): string {
  return monthDayFormat.format(new Date(iso));
}

/** "2024-04-29T15:35:36Z" → "Apr 2024". */
export function formatMonthYear(iso: string): string {
  return monthYearFormat.format(new Date(iso));
}

/** Resume dates are "YYYY" or "YYYY-MM"; `null` means the role is current. */
export function formatRange(start: string, end: string | null): string {
  return `${start.slice(0, 4)} — ${end ? end.slice(0, 4) : "now"}`;
}

function toMonths(value: string): number {
  const [year, month = "1"] = value.split("-");
  return Number(year) * 12 + Number(month) - 1;
}

/** Whole years between two resume dates, e.g. "8 yrs". Open-ended ranges run to `now`. */
export function formatDuration(start: string, end: string | null, now = new Date()): string {
  const endMonths = end ? toMonths(end) : now.getUTCFullYear() * 12 + now.getUTCMonth();
  const months = Math.max(0, endMonths - toMonths(start));
  const years = Math.floor(months / 12);
  if (years === 0) return `${months} mo${months === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"}`;
}

/** SI units, matching how GitHub sizes are usually quoted: 5,377,947 → "5.38 MB". */
export function formatBytes(bytes: number): string {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes >= 1e3) return `${Math.round(bytes / 1e3)} KB`;
  return `${bytes} B`;
}

/** 0.5583 → "55.8%". */
export function formatShare(share: number): string {
  return `${(share * 100).toFixed(1)}%`;
}
