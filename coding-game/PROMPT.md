# Starting Prompt

Copy-paste this into a fresh Claude Code session opened in the `coding-game/` folder:

---

Build the coding game from scratch following the CLAUDE.md spec exactly. Create all three files: `index.html`, `style.css`, and `app.js`.

Build order:
1. `index.html` — markup skeleton with all three screen divs (profile select, level select, game screen with two-column layout: grid left, commands right)
2. `style.css` — full styling with orange theme, CSS Grid for the puzzle grid, bot styling with direction arrows, command palette buttons with distinct colors, command sequence list, kid-friendly sizes
3. `app.js` — this is the most complex file, build it in stages:
   a. Profile CRUD + screen navigation
   b. Level data for all 8 levels (grid arrays, start positions, goals, hints)
   c. Grid renderer that reads level data and creates the visual grid
   d. Bot renderer with position calculation and CSS transition animation
   e. Command system: click-to-add, sequence display, remove from sequence, reset
   f. Execution engine: step-through with setTimeout/async, direction vectors, Forward (wall-blocked), Turn Left/Right, Jump (wall-ignoring), win/lose detection
   g. Level completion persistence in localStorage

After building all three files, open the game in the browser and verify it works. Manually trace through every level to confirm they're all solvable. Run through the verification checklist in CLAUDE.md.
