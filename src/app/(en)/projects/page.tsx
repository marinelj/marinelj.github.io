import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { content } from "@/i18n/content.en";
import { languageAlternates } from "@/i18n/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project by Jia Li on one thread, from JD's warehouse to Hoopformer: what each one starts from and what it makes. Plus live GitHub stats, refreshed daily.",
  alternates: { canonical: "/projects/", languages: languageAlternates("/projects/") },
  openGraph: { url: "/projects/" },
};

export default function Page() {
  return <ProjectsPage content={content} />;
}
