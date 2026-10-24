import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteDocument } from "@/components/SiteDocument";
import { SITE_URL } from "@/config/site";
import { content } from "@/i18n/content.zh";
import { chineseMetadata, DESCRIPTION_ZH } from "@/i18n/metadata.zh";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...chineseMetadata(""),
  title: { default: `李嘉 — ${content.story.title}`, template: "%s — 李嘉" },
  applicationName: "李嘉",
  authors: [{ name: "李嘉", url: `${SITE_URL}/zh/` }],
  twitter: { card: "summary_large_image", title: `李嘉 — ${content.story.title}`, description: DESCRIPTION_ZH },
};

export const viewport: Viewport = { themeColor: "#fafaff" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument content={content}>{children}</SiteDocument>;
}
