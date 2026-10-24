import type { MetadataRoute } from "next";
import { languageAlternates } from "@/i18n/types";
import { NAV_ITEMS, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.flatMap((item) => [item.href, `/zh${item.href}`].map((path) => ({
    url: `${SITE_URL}${path}`,
    alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(item.href)).map(([language, href]) => [language, `${SITE_URL}${href}`])) },
    changeFrequency: item.href === "/projects/" ? "daily" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  })));
}
