import type english from "./en.json";
import type { Profile } from "@/lib/profile";
import type { Story } from "@/lib/story";

export type Locale = "en" | "zh-CN";
export type Dictionary = typeof english;
export type Content = { locale: Locale; ui: Dictionary; story: Story; profile: Profile };

/** Plain templates keep client props serializable and wording in the dictionaries. */
export function text(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export function localPath(path: string, locale: Locale) {
  return locale === "en" ? path : `/zh${path}`;
}

export function languageAlternates(path: string) {
  return { en: path, "zh-CN": `/zh${path}`, "x-default": path };
}
