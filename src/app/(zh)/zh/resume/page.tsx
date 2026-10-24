import { ResumePage } from "@/components/pages/ResumePage";
import { content } from "@/i18n/content.zh";
import { chineseMetadata } from "@/i18n/metadata.zh";

export const metadata = chineseMetadata("resume");

export default function Page() {
  return <ResumePage content={content} />;
}
