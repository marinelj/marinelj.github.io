/** Check the actual static export, including RSC text payloads, before deployment. */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("../out", import.meta.url));
const CHINESE_OR_FULL_WIDTH = /[\u3000-\u303f\u3400-\u9fff\uf900-\ufaff\uff00-\uffef]/u;
const failures: string[] = [];
let englishFiles = 0;
let chinesePages = 0;

async function check(dir: string) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    const name = relative(OUT_DIR, path).split(sep).join("/");
    if (name === "_next") continue;
    if (entry.isDirectory()) { await check(path); continue; }
    if (!/\.(html|txt|xml)$/.test(entry.name)) continue;
    const content = await readFile(path, "utf8");
    if (name.startsWith("zh/")) {
      if (entry.name.endsWith(".html")) {
        chinesePages++;
        if (!/<html\b[^>]*\slang="zh-CN"(?:\s|>)/.test(content)) failures.push(`${name}: missing lang="zh-CN"`);
      }
    } else {
      englishFiles++;
      const match = content.match(CHINESE_OR_FULL_WIDTH);
      if (match) failures.push(`${name}: Chinese/full-width character U+${match[0].codePointAt(0)!.toString(16).toUpperCase()}`);
    }
  }
}

await check(OUT_DIR);
if (chinesePages === 0) failures.push("No Chinese HTML pages found in out/zh/");
if (failures.length) {
  console.error(`Language checks failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`OK: ${englishFiles} English export files contain no Chinese/full-width characters; ${chinesePages} Chinese pages use zh-CN.`);
