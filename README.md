# tommasofatticcioni.com

Personal portfolio built with [Astro](https://astro.build), React islands and Tailwind CSS, deployed as a static site on Cloudflare Pages.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

## Structure

| Path | What it is |
| --- | --- |
| `src/pages/index.astro` | Homepage (bento grid) |
| `src/pages/projects/xylo.astro` | Xylo project page |
| `src/pages/og-image.png.ts` | Builds the social preview image at build time (from `src/og/OgImage.tsx`) |
| `src/data/projects.ts` | Project list and status badges shown on the homepage |
| `src/layouts/BaseLayout.astro` | `<head>`, SEO tags, theme script, particles background |
| `src/components/` | `Card`, `Pill`, the React `Header` and `ui/Particles` |
| `src/styles/globals.css` | Tailwind setup, theme colors, `@font-face` rules |
| `public/fonts/` | Satoshi, Nippo and Kola web fonts |

Only `Particles` (and `Header`, if enabled) ship JavaScript; everything else renders to static HTML.

## Deploy (Cloudflare Pages)

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
