import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import { SiteDocument } from "@/components/SiteDocument";
import { content } from "@/i18n/content.en";
import { Container, PageHeader, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found — Jia Li",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteDocument content={content}>
      <PageHeader eyebrow="404" title="Page not found">
        <p className="text-base text-fg-2">That page doesn’t exist, or it has moved.</p>
      </PageHeader>
      <Container className="pb-24">
        <TextLink href="/">Back to the home page</TextLink>
      </Container>
    </SiteDocument>
  );
}
