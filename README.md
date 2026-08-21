# Parsa Derakhshan — Portfolio

A warm-tinted, editorial portfolio for **Parsa Derakhshan**, built with Next.js (App Router), React, TypeScript, and Tailwind CSS. Statically exported and deployed to Netlify.

## Design

The site follows an institutional/editorial direction rather than a startup aesthetic:

- **Palette** — a warm-tinted monochrome ground (bone `#FAF8F5`, warm charcoal `#1C1917`) with terracotta `#B8482B` as the single, sparing accent. No gradients, no glassmorphism, no purple.
- **Type** — [Archivo](https://fonts.google.com/specimen/Archivo) (variable width axis) for display, [Inter](https://rsms.me/inter/) for body.
- **Layout** — full-bleed dark hero and footer, uppercase letter-spaced eyebrows, a stats/numbers block, hairline-ruled card grids, and a filterable technology directory.
- **Signature element** — the Projects section is a stack of sticky panels that collapse like envelopes as you scroll, leaving only each project's title edge visible.

## Features

- Dark / light mode, applied pre-paint to avoid any flash (no render-blocking gate).
- Full EN/FR bilingual support with a working header switcher. Locale files are statically bundled and type-checked against each other.
- Contact form sends via EmailJS; it reports a clear error (with a `mailto:` fallback) if credentials are missing instead of silently faking success.
- Resume section with an access-code gate that downloads the actual PDF.
- Scroll-driven "envelope" project panels.
- Reduced-motion support throughout.

## Tech stack

- **Framework** — Next.js 16 (App Router, static export)
- **Language** — TypeScript (strict)
- **Styling** — Tailwind CSS 3
- **Animation** — Framer Motion
- **Email** — EmailJS
- **Icons** — React Icons

## Project structure

```
├── app/            # layout, page, loading/error/not-found, globals.css
├── components/     # Header, Hero, AboutMe, Projects, Skills, SoftSkills,
│                   # Contact, Resume, Footer
├── context/        # Theme, Language, Document providers
├── locales/        # en.json / fr.json (source of all user-facing copy)
├── types/          # shared types, derived from the locale shape
├── public/         # images and Resume.pdf
└── scripts/        # image optimization
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_RESUME_ACCESS_CODE` | Resume access code |
| `NEXT_PUBLIC_EMAIL` / `_GITHUB_URL` / `_LINKEDIN_URL` | Contact / social links |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

> **Note:** `NEXT_PUBLIC_*` values are inlined into the client bundle. The resume
> access code is a courtesy gate, not real access control — treat the PDF as public.

## Deployment

The site exports to `./out`. Netlify builds with `npm run build` and serves `out/`
(see `netlify.toml`, which also sets security headers and asset caching).
