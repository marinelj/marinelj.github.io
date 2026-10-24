import { StoryPage } from "@/components/pages/StoryPage";
import { content } from "@/i18n/content.zh";
import { chineseMetadata } from "@/i18n/metadata.zh";

export const metadata = chineseMetadata("");

export default function Page() {
  return <StoryPage content={content} />;
}
