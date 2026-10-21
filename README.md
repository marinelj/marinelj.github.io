# marinelj.github.io

Personal website of Jia Li (Marine Lee), senior data engineer.

**Live site: https://marinelj.github.io**

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS and Recharts.
Every page renders from data files, and GitHub Pages hosts the site for free.

## Run it locally

Requires Node.js 24 or newer.

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm start       # serve out/ locally
```

## Update the resume data

- **Text:** edit `src/data/profile.json` (headline, bio, experience, skills, languages and so on). Every page reads from it.
- **PDF:** replace `public/Jia_Li_Resume.pdf`, then update `resume.updated` in `profile.json`. Remove the phone number from the PDF first; the site never publishes phone numbers or home addresses.
- **Photo:** replace `public/images/jia-li.jpg` (square, 480 px) and regenerate the two smaller copies:
  ```sh
  sips -Z 160 public/images/jia-li.jpg --out public/images/jia-li-160.jpg
  sips -Z 336 public/images/jia-li.jpg --out public/images/jia-li-336.jpg
  ```

Push to `main` and the site redeploys automatically.

## Refresh the GitHub data

The projects dashboard reads `src/data/github.json`, which `scripts/fetch-github.ts` writes:

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

Forks and archived repos are hidden by default (`INCLUDE_FORKS`, `INCLUDE_ARCHIVED`). `EXCLUDED_LANGUAGES` keeps a language, currently HTML, out of the language chart. The build fails if an excluded repo ever appears in the site (`npm run check:exclusions`).
