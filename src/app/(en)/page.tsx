import { StoryPage } from "@/components/pages/StoryPage";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";
import { metadata as rootMetadata } from "./layout";
import type { Metadata } from "next";

// Top-level file metadata is outside this route group's root layout. Restore the
// home page's existing sharing image explicitly; inner English pages stay unchanged.
const image = { url: "/opengraph-image.png", type: "image/png", width: 1200, height: 630, alt: "Jia Li (Marine Lee): My story, so far. Review the old, discover the new." };
export const metadata: Metadata = {
  alternates: { canonical: "/", languages: languageAlternates("/") },
  openGraph: { ...rootMetadata.openGraph, images: [image] },
  twitter: { ...rootMetadata.twitter, images: [image] },
};

export default function Page() {
  return <StoryPage content={content} />;
}
