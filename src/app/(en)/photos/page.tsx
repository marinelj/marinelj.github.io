import { PhotosPage } from "@/components/pages/PhotosPage";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos from Jia Li’s story: family, younger days, basketball, old towns in Suzhou, Chengdu and Beijing, and a moment from work.",
  alternates: { canonical: "/photos/", languages: languageAlternates("/photos/") },
  openGraph: { url: "/photos/" },
};

export default function Page() {
  return <PhotosPage content={content} />;
}
