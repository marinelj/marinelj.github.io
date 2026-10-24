import type { ChapterIconName } from "@/lib/story";
import {
  BasketballIcon,
  CameraIcon,
  ChatIcon,
  DatabaseIcon,
  GraduationCapIcon,
  SparklesIcon,
  SproutIcon,
} from "./Icons";
import { tintAt } from "./ui";

const ICONS = {
  sprout: SproutIcon,
  chat: ChatIcon,
  database: DatabaseIcon,
  basketball: BasketballIcon,
  sparkles: SparklesIcon,
  camera: CameraIcon,
  cap: GraduationCapIcon,
} satisfies Record<ChapterIconName, unknown>;

const SIZES = {
  xs: { circle: "size-8", icon: 16 },
  sm: { circle: "size-10", icon: 20 },
  md: { circle: "size-14", icon: 26 },
  lg: { circle: "size-[72px]", icon: 32 },
};

/** A chapter's icon in a pastel circle. Decorative: the chapter label says the same. */
export function ChapterIcon({
  icon,
  index,
  size = "md",
  className = "",
}: {
  icon: ChapterIconName;
  /** Chapter position: picks the tint. */
  index: number;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const tint = tintAt(index);
  const Icon = ICONS[icon];
  return (
    <span
      aria-hidden="true"
      className={`chapter-icon inline-flex shrink-0 items-center justify-center rounded-full ${tint.bg} ${tint.ink} ${SIZES[size].circle} ${className}`}
    >
      <Icon size={SIZES[size].icon} />
    </span>
  );
}
