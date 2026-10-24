import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteDocument } from "@/components/SiteDocument";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site";
import { profile } from "@/lib/profile";
import { story } from "@/lib/story";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";

const defaultTitle = `${profile.name} — ${story.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/", languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#fafaff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument content={content}>{children}</SiteDocument>;
}
