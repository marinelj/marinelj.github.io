import { type Content } from "@/i18n/types";
import { PhotoGrid } from "@/components/Photo";
import { Container, PageHeader, SectionHeader } from "@/components/ui";
import { photosIn, type Photo } from "@/lib/story";


export function PhotosPage({ content }: { content: Content }) {
  const { story, ui } = content;
  return (
    <>
      <PageHeader eyebrow={ui.nav[2]} title={ui.photosTitle}>
        <p className="max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          {ui.photosIntro}
        </p>
      </PageHeader>

      <Container className="flex flex-col gap-14 pb-16 lg:gap-20 lg:pb-24">
        {ui.photoGroups.map((group, index) => (
          <section key={group.id} aria-labelledby={group.id} className="flex flex-col gap-6">
            <SectionHeader id={group.id} eyebrow={group.eyebrow} title={group.title} />
            <PhotoGrid photos={photosIn(group.id as Photo["group"], story)} layout={group.layout as "feature" | "even"} priority={index === 0} />
          </section>
        ))}
      </Container>
    </>
  );
}
