import { ContactPage } from "@/components/pages/ContactPage";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Jia Li by email, LinkedIn or GitHub.",
  alternates: { canonical: "/contact/", languages: languageAlternates("/contact/") },
  openGraph: { url: "/contact/" },
};

export default function Page() {
  return <ContactPage content={content} />;
}
