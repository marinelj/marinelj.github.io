/** Where the site is published. Used for canonical URLs, the sitemap and Open Graph tags. */
export const SITE_URL = "https://marinelj.github.io";

export const SITE_NAME = "Jia Li";

export const SITE_DESCRIPTION =
  "Jia Li (Marine Lee) is a senior data engineer in Beijing with 10+ years building large-scale ETL/ELT pipelines, data platforms, and analytics and ML infrastructure at Alibaba and JD.com.";

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About & Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/resume/", label: "Resume" },
  { href: "/contact/", label: "Contact" },
] as const;
