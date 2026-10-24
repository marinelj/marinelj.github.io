import image from "@/app/(zh)/zh/opengraph-image.png";
import type { Metadata } from "next";
import { languageAlternates } from "./types";

export const DESCRIPTION_ZH = "李嘉（Marine Lee）的故事：在北京长大，写代码，也是两个孩子的家长。从京东、阿里巴巴的数据工作，到篮球、语言、家人和自己的项目，一路温故而知新。";

const pages: Record<string, { title: string; description: string }> = {
  "": { title: "我的故事，写到这里", description: DESCRIPTION_ZH },
  projects: { title: "项目", description: "从京东仓库到 Hoopformer，李嘉的每个项目都在一条线上：从什么出发，做出了什么。还有每天更新的 GitHub 数据。" },
  photos: { title: "照片", description: "李嘉故事里的照片：家人、年轻时、篮球场，苏州、成都与北京的老城，还有工作中的一刻。" },
  resume: { title: "简历", description: "李嘉的简历：资深数据工程师的工作经历、技能、教育与语言，以及英文 PDF 下载。" },
  contact: { title: "联系", description: "通过电子邮件、LinkedIn 或 GitHub 联系李嘉。" },
};

export function chineseMetadata(slug: string): Metadata {
  const { title, description } = pages[slug];
  const path = slug ? `/${slug}/` : "/";
  const images = [{ url: image.src, type: "image/png", width: 1200, height: 630, alt: "李嘉（Marine Lee）：温故而知新，可以为师矣。年轻时与在京东的照片。" }];
  return {
    title,
    description,
    alternates: { canonical: `/zh${path}`, languages: languageAlternates(path) },
    openGraph: { type: "website", siteName: "李嘉", locale: "zh_CN", url: `/zh${path}`, title: `李嘉 — ${title}`, description, images },
    twitter: { card: "summary_large_image", title: `李嘉 — ${title}`, description, images },
  };
}
