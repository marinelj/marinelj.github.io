import { ContactPage } from "@/components/pages/ContactPage";
import { content } from "@/i18n/content.zh";
import { chineseMetadata } from "@/i18n/metadata.zh";

export const metadata = chineseMetadata("contact");

export default function Page() {
  return <ContactPage content={content} />;
}
