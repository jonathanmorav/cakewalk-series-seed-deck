# Cakewalk React slide deck

A clean, GitHub Pages-ready presentation starter modeled on the architecture of [`cakewalk-series-a-deck`](https://github.com/jonathanmorav/cakewalk-series-a-deck), rebuilt around the attached Cakewalk v2 design system.

## What is included

- React 19, TypeScript, Vite, Framer Motion, and Lucide icons
- A central slide registry in `src/deck/slides.tsx`
- Responsive 16:9 presentation framing with a readable portrait-mobile mode
- Hash deep links such as `#flow`, so every slide can be shared directly
- Keyboard, touch, menu, browser-history, and fullscreen navigation
- A print layout for exporting the complete deck to PDF
- Cakewalk v2 color, type, spacing, radius, shadow, layout, and motion tokens
- An automated GitHub Pages workflow; no committed `dist/` or manual `docs/` sync

## Start locally

```sh
nvm use
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run check` before publishing.

## Edit the deck

The story lives in one place: `src/deck/slides.tsx`.

1. Edit an existing slide component or add a new one.
2. Add or reorder its entry in the exported `slides` array.
3. Give every slide a unique, URL-safe `id`.
4. Keep supporting details in the optional `notes` field.

Reusable presentation framing and navigation live under `src/components/`. Cakewalk source tokens are copied under `src/design-system/`; deck-specific layout is in `src/styles/deck.css`.

## Narrative refinement

The feedback-driven workflow, stage status, exit criteria, and locked-decision log live in [`DECK_REFINEMENT_PLAN.md`](./DECK_REFINEMENT_PLAN.md). Update that reference as slide and voiceover decisions are approved.

## Presentation controls

| Action | Control |
| --- | --- |
| Next slide | `Right`, `Down`, `PageDown`, or `Space` |
| Previous slide | `Left`, `Up`, `PageUp`, or `Shift` + `Space` |
| First / last | `Home` / `End` |
| Slide overview | `O` |
| Fullscreen | `F` |
| Shortcut help | `?` |
| Close an overlay | `Esc` |

Horizontal swipes navigate on touch devices. Interactive elements are excluded from navigation shortcuts and swipe handling.

## Export to PDF

Use the browser's Print command and choose **Save as PDF**. The print stylesheet renders every slide at 16:9 with backgrounds enabled. In the print dialog, turn on background graphics if the browser does not do so automatically.

## Publish with GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`, or run the workflow manually from **Actions**.

The workflow builds and deploys `dist/` using GitHub's Pages artifact actions. `vite.config.ts` derives the correct repository subpath automatically, so a project site such as `https://username.github.io/repository/` works without a hard-coded repo name. Set `BASE_PATH=/custom/path/` only when you intentionally need an override.

## Design-system provenance

This starter copies the supplied June 2026 Cakewalk v2 tokens and approved logo files. It does not use the attachment's `_ds_bundle.js`, because that file targets static mock pages rather than a production Vite app. Plus Jakarta Sans italic 700 is explicitly requested so the approved coral hero emphasis renders with the real face instead of a synthesized italic.

The source attachment is a mirror rather than an installable package. When the production Cakewalk design system changes, replace `src/design-system/tokens/` and review any deck overrides in `src/styles/deck.css`.
