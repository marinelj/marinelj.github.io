import type { CSSProperties } from "react";
import type { Photo } from "@/lib/story";
import { delay } from "./ui";

/** Small, varied tilts so a grid of prints looks hand-placed. */
const TILTS = ["-1.2deg", "1deg", "-0.6deg", "1.3deg", "-1deg", "0.7deg"];

/** A photo printed as a polaroid, with its caption on the white margin. */
export function PhotoFigure({
  photo,
  sizes,
  load = "lazy",
  caption = true,
  className = "",
  style,
}: {
  photo: Photo;
  /** The `sizes` attribute: how wide the photo is shown. */
  sizes: string;
  /** "priority" for the page's main photo, "eager" for others in the first screen. */
  load?: "lazy" | "eager" | "priority";
  /** Prints at the back of a stack hide their caption; the alt text still describes them. */
  caption?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const largest = photo.sources[photo.sources.length - 1];
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP copies; a static export has no image optimizer
    <img
      src={largest.src}
      srcSet={photo.sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={load === "lazy" ? "lazy" : "eager"}
      fetchPriority={load === "priority" ? "high" : undefined}
      decoding="async"
      className="block h-auto w-full rounded-[3px] bg-surface-2"
    />
  );
  if (!caption) {
    return (
      <div className={`polaroid pb-7 ${className}`} style={style}>
        {image}
      </div>
    );
  }
  return (
    <figure className={`polaroid m-0 ${className}`} style={style}>
      {image}
      <figcaption className="px-1 pt-2.5 pb-3 text-[13px] leading-snug text-fg-2 sm:text-sm">{photo.caption}</figcaption>
    </figure>
  );
}

/**
 * Prints laid out in a grid. "feature" gives the first photo double width (it suits
 * one landscape photo followed by portraits); "even" uses equal columns. On phones
 * (two columns) the first photo also runs full width when the count is odd, so no
 * print is left alone on the last row.
 */
export function PhotoGrid({
  photos,
  layout = "even",
  priority = false,
}: {
  photos: Photo[];
  layout?: "feature" | "even";
  /** The grid opens the page: load its first photo first. */
  priority?: boolean;
}) {
  const grid =
    layout === "feature"
      ? "grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]"
      : photos.length === 2
        ? "grid-cols-2 lg:max-w-[760px]"
        : "grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid items-start gap-3 sm:gap-5 ${grid}`}>
      {photos.map((photo, index) => {
        const wide = index === 0 && (layout === "feature" || photos.length % 2 === 1);
        // The page's main photo skips the fade-in: browsers only count it as shown once it's opaque.
        const main = priority && index === 0;
        return (
          <li key={photo.id} className={wide ? "col-span-2 lg:col-span-1" : ""}>
            <PhotoFigure
              photo={photo}
              load={main ? "priority" : "lazy"}
              sizes={
                layout === "feature" && index === 0
                  ? "(min-width: 1024px) 520px, 92vw"
                  : wide
                    ? "(min-width: 1024px) 340px, 92vw"
                    : "(min-width: 1024px) 340px, 46vw"
              }
              className={main ? "tilt" : "tilt reveal"}
              style={{ ...delay(index * 90), "--r": TILTS[index % TILTS.length] } as CSSProperties}
            />
          </li>
        );
      })}
    </ul>
  );
}

/** Where each print sits in the hero stack, back to front. The front print is dealt first. */
const STACK = [
  { className: "left-0 top-[5%] w-[52%]", tilt: "-8deg", delay: 260 },
  { className: "right-0 top-0 w-[58%]", tilt: "7deg", delay: 400 },
  { className: "left-[13%] top-[31%] w-[72%]", tilt: "-2deg", delay: 100 },
];

/** Three prints dealt onto the hero; they fan out a little on hover. */
export function PhotoStack({ photos }: { photos: Photo[] }) {
  return (
    <div className="photo-stack relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px]">
      {photos.slice(0, STACK.length).map((photo, index) => {
        const place = STACK[index];
        const front = index === STACK.length - 1;
        return (
          <PhotoFigure
            key={photo.id}
            photo={photo}
            load={front ? "priority" : "eager"}
            caption={front}
            sizes={front ? "(min-width: 640px) 300px, 230px" : "(min-width: 640px) 240px, 180px"}
            className={`deal absolute ${place.className}`}
            style={{ ...delay(place.delay), "--r": place.tilt } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
