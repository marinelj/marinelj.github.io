import { tintAt } from "./ui";

const SIZES = {
  xs: "size-8 text-base",
  sm: "size-10 text-xl",
  md: "size-14 text-[28px]",
  lg: "size-[72px] text-[38px]",
};

/** A chapter's Chinese character in a pastel circle. Decorative: the chapter label says the same. */
export function Glyph({
  char,
  index,
  size = "md",
  className = "",
}: {
  char: string;
  /** Chapter position: picks the tint. */
  index: number;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const tint = tintAt(index);
  return (
    <span
      lang="zh-CN"
      aria-hidden="true"
      className={`glyph inline-flex shrink-0 items-center justify-center rounded-full font-zh leading-none ${tint.bg} ${tint.ink} ${SIZES[size]} ${className}`}
    >
      {char}
    </span>
  );
}
