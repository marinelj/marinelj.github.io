import ui from "./zh.json";
import profile from "@/data/profile.zh.json";
import story from "@/data/story.zh.json";
import type { Content } from "./types";
import type { Story } from "@/lib/story";

export const content: Content = { locale: "zh-CN", ui, profile, story: story as Story };
