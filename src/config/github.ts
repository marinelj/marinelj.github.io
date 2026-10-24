/** GitHub account whose public repos power the projects dashboard. */
export const GITHUB_USERNAME = "marinelj";

/**
 * Repos that never appear anywhere on the site, matched case-insensitively.
 * After adding a name, run `npm run fetch:github` (or wait for the daily rebuild).
 */
export const EXCLUDED_REPOS = ["andoop", "marinelj.github.io"];

/**
 * On English pages these replace a repo's GitHub description (names match
 * case-insensitively). A description in Chinese with no entry here is hidden.
 */
export const REPO_DESCRIPTIONS: Record<string, string> = {
  congdong:
    "Official website of Congdong Sports: a mobile-first static site (Vite) that publishes to GitHub Pages on every push to main.",
};

/** Forks and archived repos stay hidden unless these are switched on. */
export const INCLUDE_FORKS = false;
export const INCLUDE_ARCHIVED = false;

/**
 * Languages left out of the language-breakdown chart and the "Top language" stat.
 * HTML is excluded so generated lesson pages don't drown out the code itself.
 * Set to [] to count every language GitHub reports.
 */
export const EXCLUDED_LANGUAGES = ["HTML"];

/** Chinese descriptions used when GitHub has no Chinese description of its own. */
export const REPO_DESCRIPTIONS_ZH: Record<string, string> = {
  congdong: "丛动体育官网：移动端优先的静态网站（Vite），推送到 main 后自动发布到 GitHub Pages。",
  hoopformer: "开源的 NBA 阵容深度学习模型，研究球场上的组合及其延伸应用。",
  "nba-data-science-studio": "可复现的 NBA 数据科学课程，附代码、字幕与视频素材。",
  lesmots: "围绕快要忘记的单词，用简单英语改写每日新闻的语言学习应用。",
};
