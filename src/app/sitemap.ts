import type { MetadataRoute } from "next";
import { NAV_ITEMS, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map((item) => ({
    url: `${SITE_URL}${item.href}`,
    changeFrequency: item.href === "/projects/" ? "daily" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
