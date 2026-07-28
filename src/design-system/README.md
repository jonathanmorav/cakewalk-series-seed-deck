# Cakewalk design-system snapshot

This directory contains the CSS entrypoint and token files copied from the user-provided **Cakewalk Design System** attachment (v2, June 2026). The approved wordmark and mark live in `public/brand/` so Vite can resolve them correctly under a GitHub Pages repository subpath.

The original static-mock bundle is intentionally excluded. This React application imports the source tokens directly and adds presentation-only layout rules in `src/styles/deck.css`.

The sole local token adjustment is the Plus Jakarta Sans font request: italic 700 is included to support the approved coral italic hero treatment without synthesized italics.
