# marinelj.github.io

The personal website of Jia Li (Marine Lee), told as one story with one main plot: "review the old to discover the new". The site is English only.

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

The site is English only. `REPO_DESCRIPTIONS` in the same file gives a repo an English description to show instead of its GitHub one; a Chinese description with no entry there is hidden.

Forks and archived repos are hidden by default (`INCLUDE_FORKS`, `INCLUDE_ARCHIVED`). `EXCLUDED_LANGUAGES` keeps a language, currently HTML, out of the language chart. The build fails if an excluded repo ever appears in the site (`npm run check:exclusions`).
