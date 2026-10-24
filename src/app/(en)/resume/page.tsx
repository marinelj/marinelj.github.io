import { ResumePage } from "@/components/pages/ResumePage";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Jia Li, senior data engineer: experience, skills, education and languages, with a PDF download.",
  alternates: { canonical: "/resume/", languages: languageAlternates("/resume/") },
  openGraph: { url: "/resume/" },
};

export default function Page() {
  return <ResumePage content={content} />;
}
