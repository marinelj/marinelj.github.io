# marinelj.github.io

The personal website of Jia Li (Marine Lee), told as one story with one main plot: "review the old to discover the new". The English site is at `/`; an independently written Simplified Chinese version is at `/zh/`.

**Live site: https://marinelj.github.io**

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS and Recharts.
Every page renders from data files, and GitHub Pages hosts the site for free.

| Page | What it shows |
| --- | --- |
| `/` Story | The autobiography, in seven chapters, with every project on one thread |
| `/projects/` | All projects in the order they happened, plus live GitHub stats |
| `/photos/` | Family, younger days, basketball, travel and work photos |
| `/resume/` | The resume, with a PDF download |
| `/contact/` | Email, LinkedIn and GitHub |

## Run it locally

Requires Node.js 24 or newer.

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm start       # serve out/ locally
```

## Edit the story

`src/data/story.json` holds the whole story:

- **`chapters`:** each has an `icon` (`sprout`, `chat`, `database`, `basketball`, `sparkles`, `camera` or `cap`), a label, a title and `blocks`, which render in order. A block can be `text`, `quote`, `stats` (the numbers from `profile.json`), `thread` (the chapter's projects), `photos` (a list of photo ids) or `link`.
- **`thread`:** every project, in the order it happened. Each one has `old` (what it starts from) and `next` (what it makes), a `chapter`, `tags` (`work`, `open-source`, `live`, `private`) and optional `links`. Private projects have no links.
- **`photos`:** every photo with its alt text, caption and group (`family`, `younger`, `court`, `travel`, `work`). Photos live in `public/images/story/` as pre-sized WebP copies listed in `sources`, smallest first.

To add a photo, export two WebP copies (about 360 px and 720 px wide) with all EXIF and location data removed, put them in `public/images/story/`, then add an entry to `photos`. Only use photos of Jia Li, the family photos Jia Li chose, or scenery. Never use a photo where someone else is the subject, and blur the face of anyone else who could be recognized in the background.

## Update the resume data

- **Text:** edit `src/data/profile.json` (headline, bio, experience, skills, languages and so on). The resume page and the craft chapter read from it.
- **PDF:** replace `public/Jia_Li_Resume.pdf`, then update `resume.updated` in `profile.json`. Remove the phone number from the PDF first; the site never publishes phone numbers or home addresses.

Push to `main` and the site redeploys automatically.

## Refresh the GitHub data

The projects page reads `src/data/github.json`, which `scripts/fetch-github.ts` writes:

```sh
npm run fetch:github
# optional, for a higher API rate limit (never commit a token):
GITHUB_TOKEN=<token> npm run fetch:github
```

You don't need to do this by hand. The GitHub Action in `.github/workflows/deploy.yml` fetches fresh data and redeploys on every push and every day at 06:00 UTC. To refresh now, run it from the **Actions** tab ("Run workflow") or with `gh workflow run deploy.yml`.

Note: GitHub pauses scheduled workflows after 60 days without commits; re-enable it from the Actions tab if that happens.

## Hide a repo from the dashboard

Add its name to `EXCLUDED_REPOS` in `src/config/github.ts` (matching ignores case):

```ts
export const EXCLUDED_REPOS = ["andoop", "marinelj.github.io", "another-repo"];
```

On English pages, `REPO_DESCRIPTIONS` in the same file gives a repo an English description to show instead of its GitHub one; a Chinese description with no entry there is hidden.

Forks and archived repos are hidden by default (`INCLUDE_FORKS`, `INCLUDE_ARCHIVED`). `EXCLUDED_LANGUAGES` keeps a language, currently HTML, out of the language chart. The build fails if an excluded repo ever appears in the site (`npm run check:exclusions`).

## Edit the Chinese version

The five English pages each have a matching page under `/zh/`, with a language link in the header and mobile menu. Separate root layouts in `src/app/(en)/` and `src/app/(zh)/` set `lang="en"` and `lang="zh-CN"`; changing language loads a fresh document.

- Edit `src/data/story.zh.json` and `src/data/profile.zh.json` for Chinese writing. They have the same shape, ids, photo sources, external URLs and facts as their English counterparts. Keep both versions in sync when facts change. Chinese internal page links start with `/zh/`; the résumé PDF is shared and labeled as English.
- Edit `src/i18n/en.json` and `src/i18n/zh.json` for interface wording. Server-selected strings are passed to shared components; client components never import either dictionary. Shared page components live in `src/components/pages/`.
- Edit `src/i18n/metadata.zh.ts` for Chinese page titles and descriptions. The Chinese sharing image and its alt text are in `src/app/(zh)/zh/`. It uses the same younger/work photos as the English image. Fonts fall back to local Chinese system fonts, without a Chinese font download.
- `REPO_DESCRIPTIONS_ZH` in `src/config/github.ts` supplies Chinese descriptions when GitHub does not already provide one. English descriptions retain their existing fallback behavior. GitHub configuration and description selection stay on the server.

After editing, run `npm run lint`, `npm run build`, `npm run check:exclusions` and `npm run check:languages`. The language check scans exported HTML, RSC text and XML outside `/zh/` and `/_next/` for Chinese/full-width characters, and verifies `zh-CN` on Chinese HTML. The deployment workflow runs both export checks. All ten pages publish together; review changes on a branch before merging to `main`.
