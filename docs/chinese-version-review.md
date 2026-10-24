# Chinese version review notes

The English site now has an independently written Simplified Chinese counterpart at `/zh/`, `/zh/projects/`, `/zh/photos/`, `/zh/resume/` and `/zh/contact/`. Both versions use the same components, photos, project identities and facts. Separate root layouts give each document the right language; language switches load a fresh document and land on the matching page.

Chinese story and résumé writing live in `src/data/story.zh.json` and `src/data/profile.zh.json`. Interface dictionaries are selected on the server. Client components receive the selected strings through props, so English pages do not download a Chinese dictionary. GitHub descriptions and exclusion configuration remain server-side. No project dependency was added.

The Chinese typography uses local system Chinese fonts after Geist. The Chinese sharing image uses only the existing younger/work photos. The original English PDF is shared and explicitly labeled as English. The main Chinese hero photo does not fade in.

## Validation

- `npm ci`, `npm run lint`, `npm run build`, `npm run check:exclusions` and `npm run check:languages` pass.
- Compared normalized body text against a build of `main` at `1fe7543`: all five English pages and the English 404 match, excluding the added language links.
- Checked all ten pages in the browser at 375, 768, 1024 and 1440 CSS pixels: no page-level horizontal overflow. Mobile interactive targets meet 44 × 44 pixels. The Chinese language table also fits its container without horizontal scrolling.
- Verified the mobile menu, repository filtering and sorting, and a matching Chinese-to-English projects link. Confirmed the Chinese main photo is opaque during its entrance animation.
- Verified Chinese metadata, images, `zh_CN`, `zh-CN`, canonical URLs, all three language alternates and sitemap entries. No exported metadata URL points to localhost.
- Compared JSON shapes, numeric fields, ids, dates, photo sources, external URLs, contact fields and PDF paths. Private projects have no external links. English data files, the photos, PDF, GitHub snapshot, package lock, workflow permissions and secrets are unchanged.
- Exercised the language checker with temporary invalid English HTML, text and XML, plus a Chinese page with the wrong document language; each failed as expected. These probes were removed.
- Checked English client JavaScript for Chinese text and the exclusion list, and Chinese RSC payloads for English interface phrases. Neither language loads the other dictionary.
- Verified date formatting with the real UTC timestamp `2026-10-24T23:30:00Z`, preserving English defaults and producing `2026年10月24日` in Chinese.

| Page | Performance | Accessibility | Best practices | SEO | Layout shift |
| --- | --- | --- | --- | --- | --- |
| `/zh/` | 96 | 100 | 100 | 100 | 0 |
| `/zh/photos/` | 97 | 100 | 100 | 100 | 0 |

Mobile Lighthouse reports are supplied with the local handoff. Audits use the exported site served with gzip, as observed in the live GitHub Pages response, with the default mobile simulation. Scores are local measurements, not a guarantee of a deployed network result.

Next.js prints a `metadataBase` warning while collecting top-level metadata with multiple root layouts. The exported canonical, sharing-image and alternate URLs were checked against the production domain; none uses the fallback localhost URL. `globalNotFound` is the documented experimental flag needed for multiple root layouts; `out/404.html` is present and remains English.

## Names to check

These are plain working translations, not claims about official internal or publication names:

| Source wording | Chinese wording used |
| --- | --- |
| Scientific Warehouse Layout | 科学仓储布局 |
| JD Gold Project Award — First Prize | 京东金项目奖一等奖 |
| Company-wide commendation from JD Chairman Richard Liu | 京东董事局主席刘强东全公司通报表扬 |
| Taobao & Tmall Data Mid-Platform | 淘系数据中台 |
| X Business Unit — Unmanned Supermarket | X 事业部 · 无人超市 |
| Senior Data R&D Expert / Data R&D Expert / Data Product Expert | 高级数据研发专家 / 数据研发专家 / 数据产品专家 |
| Product R&D Manager / WMS R&D Manager | 产品研发经理 / WMS 研发经理 |
| Mining the Value of Product Relationship Chains in Supply Chains | 《挖掘供应链中商品关系链的价值》 |
| JD.com Research | 京东研究 |
| Record linkage / Finance | 记录匹配 / 财务管理 |

## Existing privacy exception

The unchanged English résumé PDF contains a visible email address, but no mainland mobile-phone pattern was found in its extracted text. The prompt requires leaving this PDF untouched. All exported web-page text keeps the email inside `mailto:` links, and no phone number or home address was added. Removing the PDF's visible email would require a separately approved PDF update.
