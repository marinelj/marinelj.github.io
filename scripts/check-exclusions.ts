/**
 * Fails if an excluded repo shows up anywhere in the exported site (`out/`).
 * Run after `npm run build`; CI runs it before every deploy.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { EXCLUDED_REPOS, GITHUB_USERNAME } from "../src/config/github.ts";
import { SITE_URL } from "../src/config/site.ts";

const OUT_DIR = fileURLToPath(new URL("../out", import.meta.url));
const TEXT_FILE = /\.(html|txt|js|json|xml|css|svg)$/;
const siteHost = new URL(SITE_URL).host.toLowerCase();

async function* files(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (TEXT_FILE.test(entry.name)) yield path;
  }
}

// The site's own repo shares its name with the domain, so for it only a repo link counts.
const patterns = EXCLUDED_REPOS.map((name) => {
  const repoUrl = `github.com/${GITHUB_USERNAME}/${name}`.toLowerCase();
  return { name, needle: name.toLowerCase() === siteHost ? repoUrl : name.toLowerCase() };
});

const hits: string[] = [];
for await (const path of files(OUT_DIR)) {
  const text = (await readFile(path, "utf8")).toLowerCase();
  for (const { name, needle } of patterns) {
    if (text.includes(needle)) hits.push(`${name} → ${path.slice(OUT_DIR.length + 1)}`);
  }
}

if (hits.length > 0) {
  console.error(`Excluded repos found in the built site:\n  ${hits.join("\n  ")}`);
  process.exit(1);
}
console.log(`OK: none of ${EXCLUDED_REPOS.join(", ")} appear in out/`);
