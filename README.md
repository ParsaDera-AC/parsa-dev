# Parsa Derakhshan

Personal site, live at https://parsadera.netlify.app/. Next.js (static export), TypeScript, Tailwind (reset only), hosted on Netlify.

## Design rules

- Plain page: white paper, ink text, one link blue. Links are underlined. Dark mode swaps the same tokens (`app/globals.css`).
- Fonts: Atkinson Hyperlegible for text, IBM Plex Mono only for code and puzzle clues.
- Every fact on the page comes from the résumé or a public repo. No stats bars, skill percentages, stock or AI images.
- Projects show real material: the ski patrol repo's folder layout, a playable nonogram for the Picross project, the live SQO site screenshot.
- No em dashes in copy. English and French live in `locales/`; `fr.json` must have the same keys as `en.json` or the build fails.

## Files

```
app/                 layout (fonts, metadata, theme pre-paint), page, globals.css
components/Site.tsx  every section of the page
components/Nonogram.tsx  the 7 × 7 puzzle
context/             theme and language providers
locales/             en.json, fr.json (all copy)
```

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out, plus sitemap
```

Optional env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`. Defaults are in the code.
