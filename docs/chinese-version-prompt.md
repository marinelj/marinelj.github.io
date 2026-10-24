# Prompt for ChatGPT: build the Chinese version

Give this prompt to ChatGPT to build an independent Chinese version of this site. It works best in Codex, ChatGPT's coding agent, with this repo connected, because then it can run the build and open a pull request. Paste everything below the line, or send: "Read docs/chinese-version-prompt.md in github.com/marinelj/marinelj.github.io and follow it."

---

You're working on the personal website of Jia Li, whose English name is Marine Lee. The repo is https://github.com/marinelj/marinelj.github.io (branch `main`), and the site is live at https://marinelj.github.io. The site is Jia Li's autobiography in English: one story, with every project tied to one line from Confucius.

**Your task:** build an independent Chinese version of the whole site at https://marinelj.github.io/zh/, in this repo, so that the existing GitHub Actions workflow builds and deploys both versions together.

What "independent" means:

- The Chinese version has its own pages under `/zh/` and its own content files.
- It reads as if Jia Li wrote it in Chinese: natural, warm, first-person Simplified Chinese, not a word-for-word translation.
- The English version stays as it is, and stays pure English. The only change allowed on English pages is the language link in section 4.
- Both versions share the design, the photos and the facts.

## 1. Read the latest work first

Start from the latest `main`, and read these before you write anything:

1. `AGENTS.md`. This repo uses Next.js 16.4, which has breaking changes compared with what you may know. After `npm ci`, read the guides in `node_modules/next/dist/docs/` for everything you touch: route groups, layouts, metadata files, `not-found` and static exports.
2. `README.md`: how the site is organized, plus the rules for photos and repos.
3. `git log -15`: the recent decisions. The latest commit made the site English only and replaced Chinese characters with icons. That still holds for the English pages.
4. `src/data/story.json`: the whole story. It has the intro, the motto, seven chapters, the project thread (each project with "the old" it starts from and "the new" it makes) and every photo's alt text and caption. Most of your Chinese writing happens here.
5. `src/data/profile.json`: the resume.
6. `src/app/`, `src/components/`, `src/lib/` and `src/config/`. Note every place where a component writes English text inline.
7. `.github/workflows/deploy.yml` and `scripts/`: how the site is built, checked and deployed.
8. The live site, for the look and the animations.

## 2. Write it in Chinese, with the same facts

Use only facts that are already in the repo. Don't add anything about Jia Li's life, family, work or opinions, even where it would make the story flow better. If a sentence sounds unnatural in Chinese, rewrite it, but keep its meaning and its strength.

Names and terms:

| English | Chinese |
| --- | --- |
| Jia Li, also known as Marine Lee | 李嘉（Marine Lee） |
| "Review the old to discover the new, and you can teach others." (Confucius, The Analects 2.11) | 温故而知新，可以为师矣。（《论语·为政》） |
| Congdong Sports | 丛动体育 |
| JD.com, Asia No.1, Double 11 | 京东、亚洲一号、双十一 |
| Alibaba, Freshippo, Taobao Flash Sale | 阿里巴巴、盒马、淘宝闪购 |
| China Mobile, PCCW | 中国移动、电讯盈科 |
| Nokia Siemens Networks, ZTE Soft | 诺基亚西门子通信、中兴软创 |
| Henan University | 河南大学 |
| JD Chairman Richard Liu | 京东董事局主席刘强东 |
| China Computer Federation (CCF) | 中国计算机学会（CCF） |
| Summer Palace, Kunming Lake, Seventeen-Arch Bridge | 颐和园、昆明湖、十七孔桥 |
| Jinli, Chengdu | 成都锦里 |

Keep these in Latin letters: LesMots, Hoopformer, NBA Data Science Studio, REEL · Reality Engine, NL2SQL, product and tool names (MaxCompute, Hive, Spark and so on) and programming language names.

If you don't know the official Chinese name of something, such as an award or an internal project, translate it plainly and list it in your pull request so Jia Li can check it. Never present a guess as an official name.

The motto is the main plot. The English site shows it only in translation; the Chinese version uses the original line, 温故而知新，可以为师矣. The story follows its three steps: 温故 (start from what already exists), 知新 (make something new from it) and 可以为师矣 (teach others). Every chapter and project already follows that arc, so keep it.

Handle these with care:

- **Japan.** The English reads: "I love Japan. To me, it is a democratic and civilised country." Translate it at exactly that strength. Don't make it stronger or softer, and don't compare Japan with any other country.
- **Family.** The family photos show Jia Li with their daughter and son. Never name the children, and add nothing about them beyond what `story.json` says.
- **Basketball.** Jia Li plays basketball. Their son loves it, and Jia Li hopes he can get the most advanced basketball training. That's why Jia Li sponsors 丛动体育, and Jia Li also built its website. The player in the red shirt in the basketball photos is Jia Li.
- **Pronouns.** The story is in the first person (我). Where you need the third person, such as in alt text and page descriptions, write 李嘉, never 他 or 她.

Style:

- Simplified Chinese (`zh-CN`), with Chinese punctuation: ，。：；“”《》.
- Short paragraphs and plain words. Warm and honest, never boastful or stiff.
- Translate every photo's alt text and caption too, and describe only what the photo shows.
- Write big numbers the Chinese way: 1000万+, 100亿+, 50.2万. The count-up animation in `AnimatedValue` only runs on whole numbers, so 50.2万 simply shows without it, which is fine.
- Be consistent about spacing between Chinese characters and Latin letters or digits.

## 3. How to build it

This is the recommended structure. If the Next.js docs in `node_modules` show a better way for this version, use it and explain why in the pull request.

- **One root layout per language.** Use route groups, so each version gets the right `<html lang>`:
  - `src/app/(en)/layout.tsx` is today's root layout, with `lang="en"`. Move today's pages into `(en)` without changing any URL.
  - `src/app/(zh)/layout.tsx` uses `lang="zh-CN"` and Chinese metadata (Open Graph locale `zh_CN`). Its pages go in `src/app/(zh)/zh/`: `/zh/`, `/zh/projects/`, `/zh/photos/`, `/zh/resume/` and `/zh/contact/`.
  - Both layouts need everything today's layout has: `globals.css`, the fonts, the theme script, the skip link, the header, the footer and `MotionObserver`.
  - Moving between the two layouts does a full page load. That's fine.
  - With no single top-level layout, the 404 page needs `global-not-found`, which is behind an experimental flag in this version (see `not-found.md` in the docs). Make sure the build still writes `out/404.html`, because GitHub Pages serves it for every unknown URL. Keep it in English.
  - Leave `favicon.ico`, `icon.svg`, `apple-icon.png`, `sitemap.ts` and `robots.ts` in `src/app/`.
- **Content files.** Add `src/data/story.zh.json` and `src/data/profile.zh.json`. Keep the same structure, ids, photo ids, chapter ids, thread ids, external links and numbers as the English files. Only the words change, and internal links point to `/zh/` pages. Load them through the existing types in `src/lib/`, and share components rather than copying them.
- **Interface text.** Many components write English inline: the header and mobile menu, the footer, "Skip to content", "Start reading", "The main plot", "Contents", "Chapter 1", "The old" and "The new", the project status tags, "In my own words", "Email me", the projects page's stats and labels, the repo filter and sort, the language chart and the theme button's label. Move this text into one small dictionary per language. The English wording must stay exactly the same.
- **Keep the languages apart in code.** English pages must not load Chinese text, and Chinese pages must not load English interface text. Pass strings from server components down as props, and don't import the Chinese dictionary into a client component that English pages also use. Keep `src/lib/github.ts` and `src/config/github.ts` server-only, as they are now.
- **Links.** Every internal link on a Chinese page goes to a Chinese page: the nav, the hero buttons, the chapter links on project cards (for example `/zh/#roots`), the resume link and the photos link.
- **Dates.** Use Chinese dates on Chinese pages, for example 2026年10月24日. `src/lib/format.ts` is hardcoded to `en-US`, so give it a locale, with English as the default.
- **Repo descriptions.** On Chinese pages, show a repo's GitHub description if it's in Chinese. Otherwise use a Chinese text from a new `REPO_DESCRIPTIONS_ZH` map next to `REPO_DESCRIPTIONS` in `src/config/github.ts`, and failing that, the GitHub description. English pages keep today's behaviour.
- **Fonts.** Keep Geist for Latin letters and digits, then fall back to system Chinese fonts, such as `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif`. Don't download a Chinese web font: it would weigh several megabytes. For Chinese text, open up the line height a little, drop the negative letter spacing on headings, and never use italics.
- **Preview image.** Give the Chinese pages their own 1200×630 Open Graph image in the style of `src/app/opengraph-image.png`: 李嘉, Marine Lee, 温故而知新, the URL, and the same two photos (`younger-white` and `jd-store` in `public/images/story/`). Never put the family photos in it. Add a Chinese alt text file next to it. If you can't render Chinese text cleanly where you work (for example, because no Chinese fonts are installed), keep the English image for now and say so.
- **Search engines.** Every page names its other-language version (`alternates.languages` with `en`, `zh-CN`, and `x-default` pointing to English). Add the `/zh/` pages to the sitemap.
- **Resume.** There is only an English PDF. On `/zh/resume/`, link to the same file and say it's in English, for example 下载简历 PDF（英文版）. Don't make a new PDF.
- **README.** Explain the Chinese version: where its files are and how to edit it. Replace the line that says the site is English only.
- **Leave alone:** the photos, the PDF, `src/data/github.json`, and the workflow's permissions and secrets. Don't add a dependency unless you really need one, and explain it if you do.

## 4. Language links

- English pages get one link to the same page in Chinese, labeled in English: "Chinese". English pages must not contain any Chinese characters, so don't label it 中文. Put it in the header and in the mobile menu.
- Chinese pages get a matching link, labeled "English".
- Each link goes to the matching page: `/projects/` to `/zh/projects/`, `/zh/photos/` to `/photos/`, and so on.

## 5. Check your work

1. `npm ci`, `npm run lint`, `npm run build` and `npm run check:exclusions` all pass. Skip `npm run fetch:github`: `src/data/github.json` is committed, and CI refreshes it.
2. Add `npm run check:languages`, a script in `scripts/` like `check-exclusions.ts`. It fails if any `.html`, `.txt` or `.xml` file in `out/` outside `out/zh/` and `out/_next/` contains a Chinese or full-width character (U+3000–U+303F, U+3400–U+9FFF, U+F900–U+FAFF, U+FF00–U+FFEF), or if a page in `out/zh/` lacks `lang="zh-CN"`. Today's English pages pass it. Add it to `deploy.yml` after the exclusions check.
3. The English pages haven't changed: compare the visible text of every English page before and after your work. Only the language link and the alternate-language tags may differ.
4. No English is left on Chinese pages, apart from names, product names and code.
5. Privacy: no phone number, home address or visible email address anywhere in `out/`. The email appears only inside `mailto:` links. Neither `andoop` nor the site's own repo appears anywhere, and the private projects (Record linkage, Finance and REEL) have no links.
6. If you can run a browser, check both versions at 375, 768, 1024 and 1440 pixels wide. Nothing scrolls sideways, tap targets stay at least 44 pixels, and Chinese headings wrap cleanly. On mobile, Lighthouse should give `/zh/` and `/zh/photos/` 90 or more for performance and 100 for accessibility, best practices and SEO, with no layout shift, as the English pages get today. A page's main photo must not fade in, or the largest paint waits for it.

## 6. Hand it back

- Work on a new branch, for example `chinese-version`, and open a pull request. Never push to `main`: every push to `main` deploys the live site. Jia Li will review the pull request and merge it, and the merge deploys both versions.
- If you can't push, reply with every new or changed file in full, each with its path.
- Write commits and the pull request in English. In the pull request, list what you changed and why, the checks you ran and their results, every translation or name you weren't sure about, and anything you couldn't do.
- Never commit tokens, passwords or other secrets. `GITHUB_TOKEN` is optional and only read from the environment.
