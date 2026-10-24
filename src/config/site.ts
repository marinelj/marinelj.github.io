/** Where the site is published. Used for canonical URLs, the sitemap and Open Graph tags. */
export const SITE_URL = "https://marinelj.github.io";

export const SITE_NAME = "Jia Li";

export const SITE_DESCRIPTION =
  "The story of Jia Li (Marine Lee): a coder from Beijing and a parent of two. Twenty years of data at JD.com and Alibaba, basketball, languages, family, and the projects that tie them together.";

export const NAV_ITEMS = [
  { href: "/", label: "Story" },
  { href: "/projects/", label: "Projects" },
  { href: "/photos/", label: "Photos" },
  { href: "/resume/", label: "Resume" },
  { href: "/contact/", label: "Contact" },
] as const;
