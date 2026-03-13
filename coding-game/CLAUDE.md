# Coding Game

A grid-based puzzle game where kids build a sequence of commands to guide a bot to a goal. Part of the `kid-games` suite but fully self-contained — no shared dependencies.

## Tech Stack

- Vanilla HTML + CSS + JS — no frameworks, no build tools, no npm
- Must work when opened via `file://` protocol (double-click `index.html`)
- Three files only: `index.html`, `style.css`, `app.js`

## Color Scheme

- Primary: `#FF9800` (orange)
- Background: `#FFF3E0`
- Text on primary: white
- Grid floor: `#FAFAFA` (light)
- Grid wall: `#424242` (dark)
- Grid goal: `#FFD700` (gold) with a star character ★
- Bot: `#9C27B0` (purple) — contrasts with orange theme
- Command buttons: distinct colors per command (see below)

## UI Conventions

- Base font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Max-width container: `1000px` for this game (wider to fit two-column layout), centered
- Kid-friendly: large text, bright colors, minimal reading required

---

## Profile System

### Storage
- localStorage key: `codingGame`
- Loaded/saved as a single JSON object

### Profile Object
```json
{
  "id": "...",
  "name": "Charlie",
  "completedLevels": [1, 2, 3]
}
```

### Full localStorage Schema
```json
{
  "profiles": [ ...profile objects... ],
  "activeProfileId": "abc123"
}
```

### ID Generation
```js
Date.now().toString(36) + Math.random().toString(36).slice(2)
```
This avoids `crypto.randomUUID()` which requires a secure context and fails on `file://`.

### CRUD Operations
- **Create:** Inline text input (not a modal) + "Add" button. Reject empty names.
- **Select:** Click a profile button to set it as active.
- **Delete:** Small delete button on each profile, uses `confirm()` dialog.

---

## Screen Navigation

All screens are `<div>` sections. Only one visible at a time — toggle via `display: none` / `display: block`. No routing, no URL fragments.

### Flow
```
Profile Select → Level Select → Game Screen → (win: Next Level or Level Select) / (lose: retry)
```

### Screen 1: Profile Select
- List of profile buttons (name on each)
- Clicking a profile selects it and navigates to Level Select
- Inline input field + "Create Profile" button at bottom
- Each profile has a small "X" / delete button
- "Back to Launcher" link at top → `../index.html`

### Screen 2: Level Select
- Header showing active profile name
- 8 numbered buttons in a 2×4 or 4×2 grid
- Completed levels show a ✓ checkmark
- All levels are always accessible (no locking — kids should be free to try any level)
- "Change Profile" button to go back to Profile Select

### Screen 3: Game Screen (Two-Column Layout)
**Left column (~60% width): Grid + Bot**
- The puzzle grid rendered with CSS Grid
- Bot displayed as an overlay on the grid
- Level title at top (e.g., "Level 1")

**Right column (~40% width): Commands**
- **Command palette:** 4 buttons (Forward, Turn Left, Turn Right, Jump)
- **Command sequence:** ordered list of commands the kid has added
  - Each command block shows the command name and an "X" to remove it
  - Commands can be removed from any position
- **Action buttons:**
  - "Run" — executes the command sequence
  - "Reset" — clears the sequence and resets bot to start position
  - "Back to Levels" — returns to level select

---

## Grid Rendering

### Implementation
- Use CSS Grid on a container div
- Each cell is a div with a data attribute for its type
- Cell size: calculate based on grid dimensions to fit nicely (e.g., `60px` per cell)
- Cell types:
  - `floor` — light background (`#FAFAFA`), subtle border
  - `wall` — dark background (`#424242`)
  - `goal` — gold background (`#FFD700`) with ★ character centered
  - `start` — same as floor but with a subtle indicator (or just where the bot spawns)

### Bot Rendering
- The bot is a `div` positioned absolutely over the grid
- Size: slightly smaller than a cell (e.g., 80% of cell size)
- Color: purple (`#9C27B0`)
- Direction indicator: an arrow character (▲ ▶ ▼ ◀) rotated to match facing direction, or just use the character directly
- **Animation:** CSS transitions on `left` and `top` properties (`transition: left 0.3s, top 0.3s`)
- Bot position is calculated from grid cell positions

### Calculating Bot Position
- Get the grid container's position
- Calculate cell position: `col * cellSize` and `row * cellSize`
- Set bot's `left` and `top` CSS properties
- CSS transition handles the smooth animation

---

## Commands

| Command | Symbol | Color | Effect |
|---------|--------|-------|--------|
| Forward | ▲ | `#4CAF50` (green) | Move 1 cell in facing direction. Blocked by walls (no-op if wall ahead). |
| Turn Left | ↰ | `#2196F3` (blue) | Rotate 90° counter-clockwise. No movement. |
| Turn Right | ↱ | `#FF9800` (orange) | Rotate 90° clockwise. No movement. |
| Jump | ⟰ | `#9C27B0` (purple) | Move 1 cell forward, ignoring walls. Blocked by grid boundary. |

### Click-to-Add Input
- Kid clicks a command button → command is appended to the sequence list
- The sequence list is displayed as a vertical list of command blocks
- Each block shows the command name/symbol and has an X button to remove it
- No drag-and-drop (MVP simplicity)
- No limit on sequence length (kids can add as many as they want)

---

## Execution Engine

### Bot State
```js
{
  x: 0,        // column (0-indexed)
  y: 0,        // row (0-indexed)
  direction: 0  // 0=up, 1=right, 2=down, 3=left
}
```

### Direction Vectors
```js
const DIRECTIONS = [
  { dx: 0, dy: -1 },  // 0 = up
  { dx: 1, dy: 0 },   // 1 = right
  { dx: 0, dy: 1 },   // 2 = down
  { dx: -1, dy: 0 }   // 3 = left
];
```

### Command Execution
- **Forward:** Calculate target cell `(x + dx, y + dy)`. If target is in bounds AND not a wall → move. Otherwise → no-op (bot stays put, maybe a brief shake animation).
- **Turn Left:** `direction = (direction + 3) % 4`
- **Turn Right:** `direction = (direction + 1) % 4`
- **Jump:** Calculate target cell `(x + dx, y + dy)`. If target is in bounds → move (ignore wall status). If out of bounds → no-op.

### Step-by-Step Animation
```js
async function executeCommands(commands) {
  for (let i = 0; i < commands.length; i++) {
    highlightCurrentCommand(i);  // visually indicate which command is running
    executeOneCommand(commands[i]);
    updateBotVisual();
    await sleep(500);  // 500ms per step
  }
  checkWinCondition();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### During Execution
- Disable all command buttons and Run/Reset buttons
- Highlight the currently executing command in the sequence list
- After all commands execute, re-enable buttons

### Win/Lose Check
- After all commands execute: if `bot.x === goal.x && bot.y === goal.y` → **Win!**
- Win: show success message, mark level as completed in profile, show "Next Level" button (if not level 8) and "Back to Levels" button
- Lose: show "Not quite! Try again." message, keep the sequence so the kid can modify it

---

## Level Data

Each level is an object:
```js
{
  id: 1,
  grid: [          // 2D array: 0 = floor, 1 = wall
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  start: { x: 0, y: 2, direction: 0 },  // bot starting position and facing
  goal: { x: 2, y: 0 },                  // target cell
  hint: "Try using Forward!"              // optional hint text shown at top
}
```

### The 8 Levels

**Level 1 — "First Steps"** (3×3)
Teaches: Forward only
```
. . .
. . .
B . .     B=bot(facing up), ★=goal at (0,0) -- wait, let me lay this out properly
```
```js
{
  id: 1,
  grid: [[0,0,0],[0,0,0],[0,0,0]],
  start: { x: 0, y: 2, direction: 0 },  // bottom-left, facing up
  goal: { x: 0, y: 0 },                  // top-left
  hint: "Use Forward to move up!"
}
// Solution: F, F
```

**Level 2 — "Turn Right"** (3×3)
Teaches: Turning
```js
{
  id: 2,
  grid: [[0,0,0],[0,0,0],[0,0,0]],
  start: { x: 0, y: 2, direction: 0 },  // bottom-left, facing up
  goal: { x: 1, y: 1 },                  // center-right area
  hint: "You can turn to change direction!"
}
// Solution: F, Turn Right, F
```

**Level 3 — "Turn Left"** (3×3)
Teaches: Multiple turns
```js
{
  id: 3,
  grid: [[0,0,0],[0,0,0],[0,0,0]],
  start: { x: 2, y: 2, direction: 0 },  // bottom-right, facing up
  goal: { x: 0, y: 1 },                  // mid-left
  hint: "Sometimes you need to turn left!"
}
// Solution: F, Turn Left, F, F
```

**Level 4 — "Longer Path"** (4×4)
Teaches: Longer sequences
```js
{
  id: 4,
  grid: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ],
  start: { x: 0, y: 3, direction: 0 },  // bottom-left, facing up
  goal: { x: 2, y: 1 },
  hint: "Plan your path step by step!"
}
// Solution: F, F, Turn Right, F, F
```

**Level 5 — "Wall Ahead"** (4×4)
Teaches: Navigating around walls
```js
{
  id: 5,
  grid: [
    [0,0,0,0],
    [0,1,1,0],  // wall in the middle
    [0,0,0,0],
    [0,0,0,0]
  ],
  start: { x: 0, y: 3, direction: 0 },
  goal: { x: 3, y: 0 },
  hint: "Walls block your path. Go around them!"
}
// Solution: F, Turn Right, F, F, F, Turn Left, F, F (or similar)
```

**Level 6 — "L-Shape"** (5×5)
Teaches: L-shaped navigation
```js
{
  id: 6,
  grid: [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,1,1],  // wall blocks direct path
    [0,0,0,0,0],
    [0,0,0,0,0]
  ],
  start: { x: 0, y: 4, direction: 0 },
  goal: { x: 4, y: 0 },
  hint: "Find the L-shaped path around the walls!"
}
// Solution: F, F, F, F, Turn Right, F, F, F, F
```

**Level 7 — "Maze"** (5×5)
Teaches: Walls + multiple turns
```js
{
  id: 7,
  grid: [
    [0,0,0,0,0],
    [1,1,1,0,0],
    [0,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,0]
  ],
  start: { x: 0, y: 4, direction: 0 },
  goal: { x: 4, y: 0 },
  hint: "Navigate carefully through the maze!"
}
// Solution: ~7 commands navigating through gaps
```

**Level 8 — "Jump Master"** (5×5)
Teaches: Using Jump to cross walls (final challenge)
```js
{
  id: 8,
  grid: [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ],
  start: { x: 0, y: 4, direction: 0 },
  goal: { x: 4, y: 0 },
  hint: "Jump lets you leap over walls!"
}
// Solution: F, F, Turn Right, F, Jump, F, Turn Left, F, F (or similar using Jump)
```

### IMPORTANT: Verify all levels are solvable!
After implementing the levels, **manually trace through each solution** to confirm:
1. The bot can actually reach the goal
2. The provided hint is accurate
3. There are no unreachable goals due to wall placement
4. Jump levels actually require Jump (walls block Forward-only paths)

---

## Command Button Styling

Each command button in the palette should be large and clearly labeled:

```
[ ▲ Forward  ]  — green background
[ ↰ Left     ]  — blue background
[ ↱ Right    ]  — orange background
[ ⟰ Jump     ]  — purple background
```

Commands in the sequence list should be smaller blocks with matching colors and an X button:
```
┌──────────────┐
│ ▲ Forward  ✕ │
│ ↱ Right    ✕ │
│ ▲ Forward  ✕ │
│ ▲ Forward  ✕ │
└──────────────┘
```

---

## Verification Checklist

After building, manually test:

- [ ] Opens with no console errors via `file://` protocol
- [ ] Create profile → name appears → survives page refresh
- [ ] Create second profile, switch between them, delete one
- [ ] Empty profile name is rejected
- [ ] All 8 levels render correctly with proper grid sizes
- [ ] Bot appears at start position with correct direction arrow
- [ ] Clicking command buttons adds to sequence list
- [ ] X button on sequence items removes them
- [ ] Reset clears sequence and resets bot position
- [ ] Run executes commands step-by-step with visible animation
- [ ] Bot moves smoothly (CSS transition) between cells
- [ ] Forward is blocked by walls (bot doesn't move)
- [ ] Forward is blocked by grid boundaries
- [ ] Jump crosses over walls successfully
- [ ] Jump is blocked by grid boundaries
- [ ] Turn Left and Turn Right update the direction arrow correctly
- [ ] Commands in sequence highlight during execution
- [ ] Buttons are disabled during execution
- [ ] Win condition detected when bot reaches goal
- [ ] Completed levels get ✓ in level select
- [ ] Completed levels persist in localStorage
- [ ] "Not quite!" message when bot doesn't reach goal
- [ ] Sequence is preserved after a failed attempt (kid can modify and retry)
- [ ] "Next Level" button works after winning
- [ ] Level 8 requires using Jump
- [ ] All 8 levels are solvable (trace through manually!)
- [ ] "Back to Launcher" link works (goes to `../index.html`)
- [ ] Refresh mid-game: profile data preserved, game resets to profile select (acceptable for MVP)
