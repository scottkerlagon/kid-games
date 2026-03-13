# Starting Prompt

Copy-paste this into a fresh Claude Code session opened in the `typing-game/` folder:

---

Build the typing game from scratch following the CLAUDE.md spec exactly. Create all three files: `index.html`, `style.css`, and `app.js`.

Build order:
1. `index.html` — markup skeleton with all three screen divs (profile select, level select, typing screen with inline results area)
2. `style.css` — full styling with blue theme, large monospace word display, character span coloring (green/red/gray), kid-friendly sizes
3. `app.js` — everything: profile CRUD, screen navigation, word lists (home row + full keyboard), keydown listener on document (NOT input field), character-by-character highlighting, WPM calculation, accuracy tracking, personal best updates, localStorage persistence

After building all three files, open the game in the browser and verify it works by checking for console errors. Run through the verification checklist in CLAUDE.md.
