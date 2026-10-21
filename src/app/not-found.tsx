import type { Metadata } from "next";
import { Container, PageHeader, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="Page not found">
        <p className="text-base text-fg-2">That page doesn’t exist, or it has moved.</p>
      </PageHeader>
      <Container className="pb-24">
        <TextLink href="/">Back to the home page</TextLink>
      </Container>
    </>
  );
}
