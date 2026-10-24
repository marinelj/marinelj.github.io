import { PhotosPage } from "@/components/pages/PhotosPage";
import { content } from "@/i18n/content.zh";
import { chineseMetadata } from "@/i18n/metadata.zh";

export const metadata = chineseMetadata("photos");

export default function Page() {
  return <PhotosPage content={content} />;
}
