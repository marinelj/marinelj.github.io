import data from "@/data/story.json";

/** A piece of a chapter, rendered in order. */
export type Block =
  | { type: "text"; text: string }
  | { type: "quote"; text: string }
  /** The craft chapter's number tiles, from profile.json metrics. */
  | { type: "stats" }
  /** The chapter's projects from `thread`, in thread order. */
  | { type: "thread" }
  /** "feature" gives the first photo double width; "even" (default) uses equal columns. */
  | { type: "photos"; ids: string[]; layout?: "feature" | "even" }
  | { type: "link"; href: string; label: string };

export type ChapterIconName = "sprout" | "chat" | "database" | "basketball" | "sparkles" | "camera" | "cap";

export type Chapter = {
  id: string;
  /** The chapter's icon, shown in a pastel circle. */
  icon: ChapterIconName;
  label: string;
  place: string;
  title: string;
  blocks: Block[];
};

export type ThreadTag = "work" | "open-source" | "live" | "private";

/** A project told the way the story is: the old thing it starts from, and the new thing it makes. */
export type ThreadItem = {
  id: string;
  chapter: string;
  title: string;
  where: string;
  when: string;
  old: string;
  next: string;
  role?: string;
  detail?: string;
  tags: ThreadTag[];
  links?: { label: string; href: string }[];
};

export type Photo = {
  id: string;
  group: "family" | "younger" | "court" | "travel" | "work";
  /** Pre-sized copies of the same image, smallest first. */
  sources: { src: string; width: number }[];
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Story = {
  title: string;
  tagline: string;
  intro: string[];
  motto: { quote: string; source: string; note: string };
  /** Hero stack, back to front. */
  heroPhotos: string[];
  chapters: Chapter[];
  ending: { title: string; text: string };
  /** Every project, in the order the story happened. */
  thread: ThreadItem[];
  photos: Photo[];
};

export const story = data as Story;

export function chapterById(id: string, source: Story = story) {
  const chapter = source.chapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter "${id}" in story.json`);
  return chapter;
}

export function threadFor(chapterId: string, source: Story = story) {
  return source.thread.filter((item) => item.chapter === chapterId);
}

export function photoById(id: string, source: Story = story) {
  const photo = source.photos.find((p) => p.id === id);
  if (!photo) throw new Error(`Unknown photo "${id}" in story.json`);
  return photo;
}

export function photosIn(group: Photo["group"], source: Story = story) {
  return source.photos.filter((p) => p.group === group);
}
