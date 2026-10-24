/** GitHub account whose public repos power the projects dashboard. */
export const GITHUB_USERNAME = "marinelj";

/**
 * Repos that never appear anywhere on the site, matched case-insensitively.
 * After adding a name, run `npm run fetch:github` (or wait for the daily rebuild).
 */
export const EXCLUDED_REPOS = ["andoop", "marinelj.github.io"];

/**
 * The site is English only. These replace a repo's GitHub description (names match
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
