import type { Metadata } from "next";
import { PhotoGrid } from "@/components/Photo";
import { Container, PageHeader, SectionHeader } from "@/components/ui";
import { photosIn } from "@/lib/story";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photos from Jia Li’s story: family, younger days, basketball, old towns in Suzhou, Chengdu and Beijing, and a moment from work.",
  alternates: { canonical: "/photos/" },
  openGraph: { url: "/photos/" },
};

const GROUPS = [
  { id: "family", eyebrow: "Family", title: "My daughter and my son", layout: "feature" },
  { id: "younger", eyebrow: "Younger days", title: "Me, years ago", layout: "even" },
  { id: "court", eyebrow: "Basketball", title: "On the court", layout: "even" },
  { id: "travel", eyebrow: "Travel", title: "Suzhou, Chengdu and Beijing", layout: "even" },
  { id: "work", eyebrow: "Work", title: "At JD.com", layout: "even" },
] as const;

export default function PhotosPage() {
  return (
    <>
      <PageHeader eyebrow="Photos" title="The people and places in my story">
        <p className="max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          My family, younger days, the basketball court, old towns, and a moment from work.
        </p>
      </PageHeader>

      <Container className="flex flex-col gap-14 pb-16 lg:gap-20 lg:pb-24">
        {GROUPS.map((group, index) => (
          <section key={group.id} aria-labelledby={group.id} className="flex flex-col gap-6">
            <SectionHeader id={group.id} eyebrow={group.eyebrow} title={group.title} />
            <PhotoGrid photos={photosIn(group.id)} layout={group.layout} priority={index === 0} />
          </section>
        ))}
      </Container>
    </>
  );
}
