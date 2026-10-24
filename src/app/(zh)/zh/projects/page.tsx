import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { content } from "@/i18n/content.zh";
import { chineseMetadata } from "@/i18n/metadata.zh";

export const metadata = chineseMetadata("projects");

export default function Page() {
  return <ProjectsPage content={content} />;
}
