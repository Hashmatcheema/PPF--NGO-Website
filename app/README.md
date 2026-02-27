# PPF — React + Vite + Tailwind + shadcn/ui

Landing page for Pak-Palestine Forum (Phase 1), built with:

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS v4**
- **shadcn/ui** (Button, Card, Accordion, Sheet, Input, Label, Separator)

## Run locally

```bash
cd app
npm install
npm run dev
```

Open **http://localhost:5173**.

## Build

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host.

## Images (Gaza & Palestine cause)

All image URLs are in **`src/data/images.ts`**. They currently point to humanitarian/solidarity-themed placeholders (Unsplash). To use your own Gaza/Palestine imagery:

1. Add your images to `public/` (e.g. `public/hero.jpg`, `public/gallery/1.jpg`).
2. In `src/data/images.ts`, set `hero: "/hero.jpg"`, `gallery: ["/gallery/1.jpg", ...]`, etc.

Sections that use images:

- **Hero** — full-bleed background
- **Vision** — two images (solidarity + olive/peace)
- **Impact** — humanitarian, hope, + 6-image gallery (“In focus — solidarity & relief”)
- **Where We Exist** — map/region image with overlay
- **Team** — three profile photos

## Urdu map labels (“Across the Nation” section)

The base map uses OpenStreetMap tiles, which do not support a language parameter, so place names can appear in a mix of scripts. To show **place names in Urdu** when the site is in Urdu mode:

1. Create a free account at [MapTiler Cloud](https://cloud.maptiler.com/).
2. Create a new map (e.g. based on “Streets”) and in **Settings → Worldview → Language** set the main language to **Urdu** (or “Local” for regional names). Save the map and note its **map ID**.
3. In the Cloud dashboard, copy your **API key**.
4. In the project root (or `app/`), create a `.env` file (or add to it):
   - `VITE_MAPTILER_API_KEY=your_api_key`
   - `VITE_MAPTILER_URDU_MAP_ID=your_urdu_map_id`
5. Restart the dev server (`npm run dev`). When the site language is Urdu, the map will use your MapTiler map so place names appear in Urdu where the data provides them.

If these env variables are not set, the map keeps using OpenStreetMap in both languages (unchanged behaviour).

## Features

- **English & Urdu** — toggle in header; RTL when Urdu; preference stored in `localStorage`
- **Responsive** — mobile sheet nav, stacked layout on small screens
- **Chatbot** — floating button + panel (wire to your backend when ready)
- **Contact form** — client-side “Sent!” feedback; connect to API later

## Project structure

- `src/components/` — Header, Hero, Vision, Impact, FAQ, WhereWeExist, Team, Contact, Footer, Chatbot
- `src/components/ui/` — shadcn components
- `src/data/content.ts` — all EN/UR copy
- `src/data/images.ts` — image URLs
