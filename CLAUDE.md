# Kid Games — Launcher

This is the root of a three-game educational suite for kids. Each game lives in its own subfolder and is fully self-contained (vanilla HTML + CSS + JS, no frameworks, no build tools).

## Project Structure

```
kid-games/
  index.html              ← Launcher page (YOU BUILD THIS)
  math-game/              ← Green theme, multiple-choice math (K-8)
  typing-game/            ← Blue theme, word typing with WPM tracking
  coding-game/            ← Orange theme, grid-based bot puzzle
```

## What the Launcher Does

`index.html` is a single page with three large buttons that link to each game's `index.html`. That's it — no logic, no localStorage, no JavaScript required (though a tiny bit of JS for hover effects is fine).

## Design Specs

- Background: `#F5F5F5`
- Max-width container: `800px`, centered
- Title: "Kid Games" in large friendly text
- Three game cards/buttons arranged vertically or in a row:
  - **Math Game** — Green (`#4CAF50`), links to `math-game/index.html`
  - **Typing Game** — Blue (`#2196F3`), links to `typing-game/index.html`
  - **Coding Game** — Orange (`#FF9800`), links to `coding-game/index.html`
- Each card: game name, 1-line description, large clickable area
- Font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Kid-friendly: large text, bright colors, minimal reading

## Important Constraints

- Must work when opened via `file://` protocol (double-click the HTML file)
- No server, no npm, no build tools, no frameworks
- The launcher is a single `index.html` file — no separate CSS/JS needed (inline is fine)
- Each game subfolder has its own `CLAUDE.md` with full implementation details

## Build This Last

The three games should be built first (each in their own Claude Code session). Build this launcher only after the games exist, so you can verify the links work.
