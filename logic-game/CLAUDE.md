# Logic Game — Robot Brain Builder

A logic and reasoning educational game for K-8th graders. Players help Professor Circuit build a robot's brain by completing logic challenges that install brain modules. 38 logic topics covered across 24 levels grouped into 4 modules. Part of the `kid-games` suite but fully self-contained — no shared dependencies.

## Tech Stack

- Vanilla HTML + CSS + JS — no frameworks, no build tools, no npm
- Must work when opened via `file://` protocol (double-click `index.html`)
- Multi-file JS architecture using `window.LogicGame` namespace (NOT ES modules — `file://` doesn't support them)
- Files: `index.html`, `style.css`, `js/` folder with 12 JS files

## Color Scheme

- Primary: `#9C27B0` (purple)
- Light: `#BA68C8`
- Very Light: `#F3E5F5`
- Soft: `#E1BEE7`
- Dark: `#7B1FA2`
- Darker: `#6A1B9A`
- Background gradient: `#8E24AA` to `#BA68C8` to `#6A1B9A` to `#CE93D8`
- Text on primary: white
- Accent / Stars: `#FFD700` (gold)
- Correct feedback: `#4CAF50` (green)
- Incorrect feedback: `#F44336` (red)

## UI Conventions

- Base font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Max-width container: `900px`, centered
- Kid-friendly: large text, bright colors, minimal reading required
- Floating animated shapes in background (decorative CSS elements)
- Glossy panel styling with subtle shadows and rounded corners

---

## File Structure

```
logic-game/
  index.html                — HTML structure (all 6 screen divs) + script tags + floating shapes inline script
  style.css                 — Purple theme, all layouts, animations, responsive, interaction types, robot CSS, professor CSS
  js/
    profiles.js             — Profile CRUD, localStorage read/write, ID generation
    sound.js                — SoundManager (Web Audio API synthesized tones: correct, wrong, levelComplete, click)
    robot.js                — CSS robot rendering, customization state, shop logic (buy/equip), robot preview
    professor.js            — Professor Circuit NPC: speech bubbles, expressions, story intros, encouragement
    interactions.js         — 6 interaction type renderers (A-F): render(challenge, container) + checkAnswer()
    levels.js               — Level metadata array (24 levels: id, name, module, topics, interactionType, challengeCount)
    challenges-module1.js   — Challenge bank for Levels 1-6 (Perception Core, K-2 topics)
    challenges-module2.js   — Challenge bank for Levels 7-12 (Analysis Engine, grades 3-5)
    challenges-module3.js   — Challenge bank for Levels 13-18 (Logic Processor, grades 6-8)
    challenges-module4.js   — Challenge bank for Levels 19-24 (Master Brain, grades 6-8)
    engine.js               — Game engine: level runner, lives, stars, coins, scoring, results
    app.js                  — Entry point: init all subsystems, screen navigation, event wiring
```

### Namespace Convention

Every JS file registers its exports on `window.LogicGame`:
```js
window.LogicGame = window.LogicGame || {};
window.LogicGame.ModuleName = { ... };
```

### Script Load Order (in index.html)

```html
<script src="js/profiles.js"></script>
<script src="js/sound.js"></script>
<script src="js/robot.js"></script>
<script src="js/professor.js"></script>
<script src="js/interactions.js"></script>
<script src="js/levels.js"></script>
<script src="js/challenges-module1.js"></script>
<script src="js/challenges-module2.js"></script>
<script src="js/challenges-module3.js"></script>
<script src="js/challenges-module4.js"></script>
<script src="js/engine.js"></script>
<script src="js/app.js"></script>
```

Order matters: `app.js` depends on everything else. `engine.js` depends on `interactions.js`, `levels.js`, and the challenge banks. Challenge banks depend on nothing. `robot.js` and `professor.js` are independent.

---

## Profile System

### Storage
- localStorage key: `logicGame`
- Loaded/saved as a single JSON object

### Full localStorage Schema
```json
{
  "profiles": [ ...profile objects... ],
  "activeProfileId": "abc123",
  "soundEnabled": true
}
```

### Profile Object
```json
{
  "id": "...",
  "name": "Alex",
  "coins": 0,
  "totalStarsEarned": 0,
  "levelProgress": {
    "1":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "2":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "3":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "4":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "5":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "6":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "7":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "8":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "9":  { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "10": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "11": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "12": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "13": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "14": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "15": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "16": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "17": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "18": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "19": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "20": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "21": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "22": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "23": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 },
    "24": { "bestStars": 0, "completed": false, "attempts": 0, "bestScore": 0 }
  },
  "robotCustomization": {
    "antenna": "default",
    "eyes": "default",
    "body": "default",
    "accessory": "none"
  },
  "unlockedCosmetics": ["default_antenna", "default_eyes", "default_body"],
  "achievements": []
}
```

### ID Generation
```js
Date.now().toString(36) + Math.random().toString(36).slice(2)
```
This avoids `crypto.randomUUID()` which requires a secure context and fails on `file://`.

### CRUD Operations
- **Create:** Inline text input (not a modal) + "Add" button. Reject empty names. New profiles start with 0 coins, all levels at default progress, default robot cosmetics.
- **Select:** Click a profile button to set it as active and navigate to Level Select.
- **Delete:** Small delete button on each profile, uses `confirm()` dialog.

---

## Screen Navigation

All screens are `<div>` sections in `index.html`. Only one visible at a time — toggle via `display: none` / `display: block`. No routing, no URL fragments.

### Flow
```
Profile Select → Level Select → Game Screen → Level Complete (success) or Level Failed (failure)
                    ↕
               Robot Shop
```

Level Complete and Level Failed both return to Level Select. Robot Shop is accessible from Level Select and returns to Level Select.

### Screen 1: Profile Select
- Title: "Robot Brain Builder" in large purple text
- Subtitle: "Help Professor Circuit build a robot brain!"
- List of profile buttons, each showing:
  - Profile name
  - Total stars earned (gold star icon + count)
  - Total coins (coin icon + count)
  - Small "X" delete button
- Clicking a profile selects it and navigates to Level Select
- Inline input field + "Create Profile" button at bottom
- "Back to Launcher" link at top right → `../index.html`

### Screen 2: Level Select
- Header showing active profile name, total coins, total stars
- "Robot Shop" button (links to shop screen)
- "Change Profile" button to go back to Profile Select
- CSS robot preview showing current customization (small, in header area)
- 4 collapsible module sections, each containing 6 level buttons:
  - **Module 1: Perception Core** (Levels 1-6)
  - **Module 2: Analysis Engine** (Levels 7-12)
  - **Module 3: Logic Processor** (Levels 13-18)
  - **Module 4: Master Brain** (Levels 19-24)
- Each level button shows:
  - Level number and name
  - Star rating (0-3 stars, filled gold or empty gray)
  - Challenge count (e.g., "8 challenges")
- All 24 levels are always accessible — no locking. Kids should be free to try any level.
- Module sections start expanded (all visible)

### Screen 3: Robot Shop
- Header: "Robot Shop" + current coin balance
- 4 category tabs: Antennas, Eyes, Body Paint, Accessories
- Each tab shows a grid of cosmetic items with:
  - Item name
  - Cost (or "Owned" / "Equipped" badge)
  - Buy button (disabled if not enough coins, hidden if already owned)
  - Equip button (visible only if owned, highlighted if currently equipped)
- Live robot preview on the right side, updates instantly when equipping
- "Back to Levels" button

### Screen 4: Game Screen
- **Header bar:** Level name, hearts display (3 heart icons), coin counter, challenge progress (e.g., "3 / 8")
- **Professor panel:** Professor Circuit character with speech bubble (intro text, feedback)
- **Challenge area:** Renders the current challenge using the appropriate interaction type
- **Hint button:** Reveals the challenge's hint text (one-time use per challenge)
- **Feedback overlay:** Brief green flash (correct) or red flash (wrong) after answering

### Screen 5: Level Complete
- Large star display (1-3 stars with animation, gold-filled)
- Score breakdown:
  - Challenges correct on first try
  - Hearts remaining
  - Coins earned (itemized: challenge coins + completion bonus)
- Professor Circuit celebration message
- Confetti animation on 3-star completion
- "Next Level" button (if not level 24)
- "Back to Levels" button

### Screen 6: Level Failed
- Message: "Robot needs more power!" or similar encouraging text
- Professor Circuit encouragement speech
- Partial score display (challenges completed before failure)
- Hearts display (all empty)
- "Try Again" button (restarts same level)
- "Back to Levels" button

---

## Level System

### 24 Levels in 4 Brain Modules

#### Module 1: "Perception Core" (Levels 1-6) — K-2 Topics

| Level | Name | Topics | Interaction Type | Challenges |
|-------|------|--------|-----------------|------------|
| 1 | Pattern Scanners | Pattern Recognition, Matching | A (Click-to-Select) | 8 |
| 2 | Sort Circuits | Sorting & Classifying, Odd One Out | B (Click-to-Place) | 8 |
| 3 | Sequence Chips | Sequencing, Following Algorithms | C (Click-to-Arrange) | 8 |
| 4 | Cause Detector | Cause & Effect (Basic) | A (Click-to-Select) | 7 |
| 5 | Logic Gate Alpha | Simple If/Then | D (Click-to-Toggle) | 7 |
| 6 | Shape Navigator | Spatial Reasoning, Analogies | A (Click-to-Select) | 8 |

#### Module 2: "Analysis Engine" (Levels 7-12) — Grades 3-5

| Level | Name | Topics | Interaction Type | Challenges |
|-------|------|--------|-----------------|------------|
| 7 | Pattern Turbo | Advanced Patterns, Number Puzzles | A + E (Select + Type) | 8 |
| 8 | Deduction Drive | Deductive Reasoning, Process of Elimination | A (Click-to-Select) | 8 |
| 9 | Circle Sorter | Venn Diagrams, Sets & Categorization | B (Click-to-Place) | 8 |
| 10 | Logic Gate Beta | Complex If/Then, Complex Analogies | A + D (Select + Toggle) | 8 |
| 11 | Chain Reactor | Cause & Effect Chains, Algorithmic Thinking | C (Click-to-Arrange) | 7 |
| 12 | Space Mapper | Spatial Reasoning Intermediate, Decomposition | A (Click-to-Select) | 8 |

#### Module 3: "Logic Processor" (Levels 13-18) — Grades 6-8 (Part 1)

| Level | Name | Topics | Interaction Type | Challenges |
|-------|------|--------|-----------------|------------|
| 13 | Boolean Core | Boolean Logic (AND/OR/NOT) | D (Click-to-Toggle) | 8 |
| 14 | Truth Matrix | Truth Tables | D (Click-to-Toggle Grid) | 7 |
| 15 | Reason Engine | Deductive vs Inductive, Syllogisms | A (Click-to-Select) | 8 |
| 16 | Condition Matrix | Advanced Conditionals, Propositional Logic | A + D (Select + Toggle) | 8 |
| 17 | Fallacy Filter | Logical Fallacies, Proofs & Justification | A (Click-to-Select) | 8 |
| 18 | Dimension Shifter | Advanced Spatial, Abstraction | A (Click-to-Select) | 8 |

#### Module 4: "Master Brain" (Levels 19-24) — Grades 6-8 (Part 2)

| Level | Name | Topics | Interaction Type | Challenges |
|-------|------|--------|-----------------|------------|
| 19 | Variable Vault | Variables as Logic, Probability | A + E (Select + Type) | 8 |
| 20 | Flow Controller | Flowcharts & Pseudocode | C + A (Arrange + Select) | 8 |
| 21 | Cipher Cracker | Code-Breaking / Ciphers | E (Type-Short-Answer) | 7 |
| 22 | Combo Calculator | Combinatorial Reasoning | A + E (Select + Type) | 7 |
| 23 | Grid Master | Grid Logic Puzzles | D (Click-to-Toggle Grid) | 6 |
| 24 | Full Activation | Mixed review from all modules | F (Mixed — all types) | 10 |

### Level Metadata Object (in levels.js)
```js
{
  id: 1,
  name: 'Pattern Scanners',
  module: 1,
  moduleName: 'Perception Core',
  topics: ['Pattern Recognition', 'Matching'],
  interactionType: 'A',
  challengeCount: 8,
  storyIntro: 'Time to install the Pattern Scanners! These circuits help the robot recognize shapes and patterns.'
}
```

---

## 6 Interaction Types

### Type A: Click-to-Select
- **Display:** 3-4 option panels styled as circuit board cards, arranged in a 2x2 grid
- **Content:** Each panel shows text, an image description, a pattern, or a symbol depending on the challenge
- **Interaction:** Click one panel to select it. Selected panel gets a purple highlight border. Click again to deselect. Click a different panel to switch selection.
- **Submit:** "Submit" button below the options. Disabled until a selection is made.
- **Check:** Compare selected option index to `correctAnswer` (integer index)
- **Used for:** Pattern recognition, analogies, odd-one-out, deductive reasoning, fallacies, spatial reasoning

### Type B: Click-to-Place
- **Display:** A set of draggable items at the top, and 2-3 target zones (bins or Venn diagram regions) below
- **Items:** Rendered as labeled chips/cards
- **Zones:** Labeled containers (bins like "Animals" / "Plants", or Venn circles with overlap)
- **Interaction:** Click an item to pick it up (it highlights), then click a zone to place it there. Item moves into that zone visually. Click an item already in a zone to pick it back up (returns to item pool).
- **Submit:** "Submit" button. Disabled until all items are placed.
- **Check:** Compare the mapping `{ itemId: zoneId }` to `correctAnswer` (object mapping each item to its correct zone)
- **Used for:** Sorting, classifying, Venn diagrams, sets & categorization

### Type C: Click-to-Arrange
- **Display:** A set of shuffled items (text cards) and a row of numbered empty slots below
- **Items:** Rendered as labeled cards in random order
- **Slots:** Numbered 1 through N, initially empty
- **Interaction:** Click an item to place it in the next empty slot. Items fill slots left-to-right. An "Undo" button removes the last placed item and returns it to the item pool.
- **Submit:** "Submit" button. Disabled until all slots are filled.
- **Check:** Compare the ordered array of placed item IDs to `correctAnswer` (array of IDs in correct order)
- **Used for:** Sequencing, algorithm steps, cause-effect chains, flowchart ordering

### Type D: Click-to-Toggle
- **Display:** A grid of cells (varies by challenge: truth table rows, logic grid, T/F statements)
- **Layout:** Table-like grid with labeled headers (rows and/or columns). Some cells are pre-filled and non-interactive.
- **Interaction:** Click an interactive cell to toggle its state. States cycle through the options defined by the challenge (typically True/False or Check/X). Visual update is immediate (green check vs red X, or T vs F).
- **Submit:** "Submit" button. Always enabled (cells have default states).
- **Check:** Compare the grid state object `{ "row,col": value }` to `correctAnswer` (object mapping cell coordinates to correct values)
- **Used for:** Truth tables, boolean logic, if/then evaluation, logic grid puzzles

### Type E: Type-Short-Answer
- **Display:** Challenge prompt text, a text input field, and a "Submit" button
- **Input:** Single-line text input, auto-focused. Max length appropriate to expected answer.
- **Hint button:** More prominent for this type since typed answers are harder
- **Submit:** "Submit" button or press Enter. Disabled if input is empty.
- **Check:** Normalize both the typed answer and `correctAnswer` (trim whitespace, lowercase) and compare. For numeric answers, parse both as numbers and compare.
- **Used for:** Ciphers, number puzzles, variable evaluation, combinatorics calculations

### Type F: Mixed
- **Display:** Varies per challenge — randomly selects from types A through E
- **Behavior:** Each challenge in a Level 24 session specifies its own `type` field, and the interaction renderer dispatches to the appropriate type handler
- **Used for:** Level 24 only (final review level mixing all interaction types)

---

## Game Mechanics

### Lives
- 3 hearts per level attempt
- Hearts reset at the start of each level attempt
- Wrong answer on a challenge = lose 1 heart
- A wrong answer does NOT skip the challenge — the player retries the same challenge
- When all 3 hearts are lost, the level ends immediately → Level Failed screen
- Hearts are displayed as heart icons in the game screen header (filled = remaining, empty = lost)

### Stars (1-3 per completed level)
- **3 stars:** Perfect — completed with 0 hearts lost
- **2 stars:** Great — completed with 0-1 hearts lost
- **1 star:** Completed — lost 2 hearts
- Stars are awarded on the Level Complete screen
- Only the best star rating is saved (if the player replays and gets fewer stars, the old rating is kept)
- `totalStarsEarned` on the profile is the sum of `bestStars` across all 24 levels

### Coins
- **Per-challenge coins (based on attempts for that challenge):**
  - Correct on first try: 10 coins
  - Correct on second try: 5 coins
  - Correct on third or later try: 2 coins
- **Level completion bonus (based on star rating):**
  - 1 star: +5 coins
  - 2 stars: +15 coins
  - 3 stars: +30 coins
- Coins accumulate on the profile and persist permanently
- Coins are spent in the Robot Shop
- Coins are awarded only when the level is completed (not on failure)

### Scoring
- `bestScore` per level = total coins earned in that level attempt (challenge coins + completion bonus)
- Only updated if the new score is higher than the existing best

### Level Access
- All 24 levels are always accessible from Level Select — no locking, no prerequisites
- Kids should be free to explore any level at any time

### Challenge Progression Within a Level
- Challenges are presented sequentially (challenge 1 of N, then 2 of N, etc.)
- Each challenge must be answered correctly before moving to the next
- Wrong answers lose a heart and the same challenge is re-presented
- After all challenges are completed, the level is complete

---

## Challenge Data Format

Each challenge is a JavaScript object. The exact fields vary by interaction type, but all challenges include:

```js
{
    type: 'A',                    // interaction type: 'A', 'B', 'C', 'D', 'E', or specific type for 'F'
    prompt: '...',                // question/instruction text shown to the player
    hint: '...',                  // hint text revealed when hint button is clicked
    professorIntro: '...',        // what Professor Circuit says before the challenge
    professorCorrect: '...',      // what Professor Circuit says on correct answer
    professorWrong: '...',        // what Professor Circuit says on wrong answer

    // Type A fields:
    options: [                    // array of 3-4 option objects
        { text: '...', image: null },
        { text: '...', image: null },
        { text: '...', image: null },
        { text: '...', image: null }
    ],
    correctAnswer: 2,             // index of correct option (0-based)

    // Type B fields:
    items: [                      // array of item objects to be sorted
        { id: 'item1', label: 'Dog' },
        { id: 'item2', label: 'Rose' }
    ],
    zones: [                      // array of target zones
        { id: 'zone1', label: 'Animals' },
        { id: 'zone2', label: 'Plants' }
    ],
    correctAnswer: {              // mapping of item IDs to zone IDs
        'item1': 'zone1',
        'item2': 'zone2'
    },

    // Type C fields:
    items: [                      // array of items to arrange (shown shuffled)
        { id: 'step1', label: 'Wake up' },
        { id: 'step2', label: 'Brush teeth' },
        { id: 'step3', label: 'Eat breakfast' }
    ],
    correctAnswer: ['step1', 'step2', 'step3'],  // correct order of item IDs

    // Type D fields:
    headers: {
        columns: ['P', 'Q', 'P AND Q'],
        rows: ['Row 1', 'Row 2', 'Row 3', 'Row 4']
    },
    prefilled: {                  // cells that are pre-filled and non-interactive
        '0,0': 'T', '0,1': 'T',
        '1,0': 'T', '1,1': 'F',
        '2,0': 'F', '2,1': 'T',
        '3,0': 'F', '3,1': 'F'
    },
    toggleOptions: ['T', 'F'],    // what the interactive cells cycle through
    correctAnswer: {              // correct values for interactive cells only
        '0,2': 'T',
        '1,2': 'F',
        '2,2': 'F',
        '3,2': 'F'
    },

    // Type E fields:
    correctAnswer: '42',          // string or number, normalized before comparison
    inputPlaceholder: 'Type your answer...',
    acceptableAnswers: ['42', 'forty-two']  // optional: multiple accepted answers
}
```

### Challenge Bank Organization

Each module file (`challenges-module1.js` through `challenges-module4.js`) exports an object keyed by level ID:

```js
window.LogicGame = window.LogicGame || {};
window.LogicGame.ChallengesModule1 = {
    1: [ /* array of 8 challenge objects for Level 1 */ ],
    2: [ /* array of 8 challenge objects for Level 2 */ ],
    3: [ /* array of 8 challenge objects for Level 3 */ ],
    4: [ /* array of 7 challenge objects for Level 4 */ ],
    5: [ /* array of 7 challenge objects for Level 5 */ ],
    6: [ /* array of 8 challenge objects for Level 6 */ ]
};
```

The engine retrieves challenges by level ID, combining all four module files:
```js
function getChallenges(levelId) {
    const allChallenges = Object.assign({},
        LogicGame.ChallengesModule1,
        LogicGame.ChallengesModule2,
        LogicGame.ChallengesModule3,
        LogicGame.ChallengesModule4
    );
    return allChallenges[levelId] || [];
}
```

---

## Robot Shop

### Overview
The Robot Shop lets players spend coins earned from completing levels to customize their robot companion. The robot is displayed as a CSS-only drawing that updates live as cosmetics are equipped.

### 4 Categories (~20 cosmetics total)

#### Antennas (5 items)
| Item | ID | Cost | Description |
|------|----|------|-------------|
| Default Bolt | `default_antenna` | Free | Simple bolt antenna (starting item) |
| Lightning Rod | `lightning_antenna` | 30 | Zigzag lightning bolt shape |
| Star Tip | `star_antenna` | 50 | Antenna topped with a gold star |
| Rainbow | `rainbow_antenna` | 80 | Multi-colored segmented antenna |
| Crown | `crown_antenna` | 120 | Royal crown replaces antenna |

#### Eyes (5 items)
| Item | ID | Cost | Description |
|------|----|------|-------------|
| Default Green | `default_eyes` | Free | Standard green circular eyes (starting item) |
| Blue Glow | `blue_eyes` | 25 | Blue-tinted glowing eyes |
| Red Scanner | `red_eyes` | 45 | Scanning red visor line |
| Gold | `gold_eyes` | 75 | Golden metallic eyes |
| Rainbow Pulse | `rainbow_eyes` | 100 | Color-cycling animated eyes |

#### Body Paint (5 items)
| Item | ID | Cost | Description |
|------|----|------|-------------|
| Default Silver | `default_body` | Free | Standard silver/gray body (starting item) |
| Purple Plating | `purple_body` | 40 | Deep purple metallic finish |
| Galaxy | `galaxy_body` | 80 | Dark gradient with star dots |
| Gold | `gold_body` | 110 | Shiny gold plating |
| Holographic | `holo_body` | 150 | Animated gradient shimmer |

#### Accessories (5 items)
| Item | ID | Cost | Description |
|------|----|------|-------------|
| None | `none_accessory` | Free | No accessory (default) |
| Bow Tie | `bowtie_accessory` | 20 | Small bow tie below head |
| Cape | `cape_accessory` | 60 | Flowing cape behind robot |
| Jetpack | `jetpack_accessory` | 90 | Jetpack on back with flame |
| Halo | `halo_accessory` | 125 | Floating golden ring above head |

### Robot CSS Drawing

The robot is built entirely with positioned `div` elements and CSS — no images, no SVG, no canvas.

```
        [Antenna]        ← .robot-antenna (varies by cosmetic)
     ┌───────────┐
     │  O     O  │      ← .robot-head > .robot-eye.left, .robot-eye.right
     │    ───    │      ← .robot-mouth
     └───────────┘
     ┌───────────┐
     │           │      ← .robot-body (background varies by cosmetic)
     │  [Accessory]     ← .robot-accessory (positioned absolutely)
     │           │
     └───────────┘
      ┌──┐   ┌──┐
      │  │   │  │      ← .robot-leg.left, .robot-leg.right
      └──┘   └──┘
```

Cosmetics are applied via CSS classes on the robot container:
```html
<div class="robot antenna-star eyes-gold body-galaxy accessory-cape">
  ...
</div>
```

Each cosmetic class modifies the relevant sub-element's appearance (colors, shapes, animations, pseudo-elements).

### Shop Logic
- **Buy:** Deduct cost from profile coins, add cosmetic ID to `unlockedCosmetics` array, save to localStorage
- **Equip:** Update the relevant slot in `robotCustomization`, save to localStorage, update robot preview immediately
- **Validation:** Cannot buy if insufficient coins. Cannot buy already-owned items. Default items are always owned.

---

## Professor Circuit NPC

### Appearance
Professor Circuit is a CSS-only character rendered with positioned `div` elements:
- Round head with glasses (border-radius circles)
- Lab coat body (white rectangle with collar)
- Small arms
- Mortar board / professor hat
- No images — all CSS

### Speech Bubble
- Triangular pointer on the left side pointing to the professor
- Rounded rectangle bubble with white background and purple border
- Text rendered inside with `line-height: 1.4`
- Typewriter animation effect: text appears character by character (CSS animation or JS `setInterval`)
- Maximum 2 lines of text per bubble

### Expressions
Three expression states, toggled via CSS classes on the professor container:

| Expression | Class | Visual Change |
|------------|-------|---------------|
| Neutral | `.professor-neutral` | Default resting face |
| Happy | `.professor-happy` | Smile, slightly raised eyebrows |
| Sad | `.professor-sad` | Frown, lowered eyebrows |
| Excited | `.professor-excited` | Wide smile, raised arms, sparkle effects |

### When Professor Appears
1. **Level start:** Introduces the level topic with `storyIntro` text, excited expression
2. **Before each challenge:** Shows `professorIntro` text, neutral expression
3. **Correct answer:** Shows `professorCorrect` text, happy expression
4. **Wrong answer:** Shows `professorWrong` text, sad expression
5. **Level complete:** Celebration message, excited expression
6. **Level failed:** Encouragement message, sad then neutral expression

---

## Sound System

### Implementation
Web Audio API with synthesized tones (no audio files needed). Wrapped in a `SoundManager` object.

### Sounds
| Sound | When | Description |
|-------|------|-------------|
| `correct` | Correct answer | Rising two-tone chime (C5 → E5) |
| `wrong` | Wrong answer | Low descending buzz (A3 → F3) |
| `click` | Button click, item select | Short click tone |
| `levelComplete` | Level completed | Ascending arpeggio (C4 → E4 → G4 → C5) |
| `starEarned` | Each star awarded | Short sparkle tone |
| `coinEarned` | Coins added | Brief metallic ding |
| `buyItem` | Shop purchase | Cash register-style sound |

### Sound Toggle
- Global `soundEnabled` flag in localStorage
- Toggle button visible on all screens (speaker icon)
- When disabled, `SoundManager.play()` returns immediately without playing

---

## Detailed Level Topics

### Module 1: Perception Core (K-2)

**Level 1 — Pattern Scanners:** Identify what comes next in color/shape/number patterns. Match identical items from a set. Example: "Which shape comes next: circle, square, circle, square, ?"

**Level 2 — Sort Circuits:** Sort items into categories (animals vs. plants, big vs. small). Identify the odd one out in a group. Example: "Which doesn't belong: apple, banana, car, grape?"

**Level 3 — Sequence Chips:** Put story events or steps in order. Follow simple step-by-step instructions. Example: "Put in order: Mix batter → Pour in pan → Bake → Eat cake"

**Level 4 — Cause Detector:** Match causes to effects. Identify what would happen. Example: "If you leave ice cream in the sun, what happens?"

**Level 5 — Logic Gate Alpha:** Evaluate simple if/then rules. True or false statements about pictures/scenarios. Example: "If it's raining, you need an umbrella. It's raining. Do you need an umbrella?"

**Level 6 — Shape Navigator:** Identify rotated/flipped shapes. Complete simple analogies (A is to B as C is to ?). Example: "Triangle is to 3 sides as square is to ? sides"

### Module 2: Analysis Engine (Grades 3-5)

**Level 7 — Pattern Turbo:** Complex number sequences, multi-step patterns. Some challenges require typing the answer. Example: "What is the next number: 2, 4, 8, 16, ?"

**Level 8 — Deduction Drive:** Use given clues to eliminate wrong answers. Logic-based deduction. Example: "Sam is taller than Kim. Kim is taller than Lee. Who is shortest?"

**Level 9 — Circle Sorter:** Place items into Venn diagram regions (A only, B only, A and B, neither). Category overlaps. Example: "Sort these into 'Has Wings' and 'Lives in Water': duck, fish, eagle, dolphin"

**Level 10 — Logic Gate Beta:** Multi-condition if/then/else rules. Complex analogies with relationships. Example: "If it's a weekend AND sunny, go to the park. If it's a weekend AND rainy, stay home. It's Saturday and rainy. What do you do?"

**Level 11 — Chain Reactor:** Multi-step cause-effect chains (A causes B, B causes C). Order algorithm steps for a task. Example: "Alarm rings → Wake up → Get dressed → Eat breakfast → Go to school"

**Level 12 — Space Mapper:** Mental rotation of complex shapes. Decompose shapes into sub-parts. Example: "Which shape would you see if you rotated this shape 90 degrees?"

### Module 3: Logic Processor (Grades 6-8, Part 1)

**Level 13 — Boolean Core:** Evaluate AND, OR, NOT operations. Combine boolean expressions. Example: "True AND False = ?" / "NOT (True OR False) = ?"

**Level 14 — Truth Matrix:** Complete truth tables for boolean expressions. Fill in missing cells. Example: Complete the truth table for "P AND (NOT Q)"

**Level 15 — Reason Engine:** Distinguish deductive from inductive reasoning. Evaluate syllogisms (All A are B, X is A, therefore...). Example: "All dogs are mammals. Rex is a dog. Therefore Rex is a ___"

**Level 16 — Condition Matrix:** Nested conditionals with multiple variables. Introduction to propositional logic notation. Example: "If (A AND B) OR (NOT C), and A=True, B=False, C=False, what is the result?"

**Level 17 — Fallacy Filter:** Identify common logical fallacies in arguments. Determine if a justification is valid. Example: "Everyone is buying this toy, so it must be the best. What kind of reasoning error is this?"

**Level 18 — Dimension Shifter:** 3D shape reasoning (nets, cross-sections). Abstract pattern completion. Example: "Which flat shape folds into this cube?"

### Module 4: Master Brain (Grades 6-8, Part 2)

**Level 19 — Variable Vault:** Substitute values into logical expressions. Basic probability reasoning. Example: "If x = 3, what is (x > 2) AND (x < 5)?"

**Level 20 — Flow Controller:** Trace through flowcharts to find output. Convert instructions to pseudocode steps. Example: "Follow this flowchart: Start → Is x > 10? → Yes → Print 'big' → End"

**Level 21 — Cipher Cracker:** Decode messages using substitution ciphers. Identify letter-shift patterns. Example: "If A=1, B=2, C=3... decode: 8-5-12-12-15"

**Level 22 — Combo Calculator:** Count combinations and arrangements. Systematic listing. Example: "How many ways can you arrange the letters A, B, C?"

**Level 23 — Grid Master:** Solve constraint-based grid puzzles (simplified Sudoku-style or logic grids). Example: "Fill in the grid so each row and column has exactly one star"

**Level 24 — Full Activation:** Mixed review pulling 10 challenges from across all modules and all interaction types. Tests breadth of all previously learned logic skills.

---

## Key Implementation Details

### Screen Transitions
```js
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}
```

### Challenge Flow (in engine.js)
```js
async function runLevel(levelId) {
    const challenges = getChallenges(levelId);
    let hearts = 3;
    let coins = 0;
    let challengeAttempts = {};  // track attempts per challenge

    for (let i = 0; i < challenges.length; i++) {
        challengeAttempts[i] = 0;
        updateProgressDisplay(i + 1, challenges.length);

        let correct = false;
        while (!correct && hearts > 0) {
            challengeAttempts[i]++;
            showProfessor(challenges[i].professorIntro);
            renderChallenge(challenges[i]);

            const answer = await waitForSubmit();
            correct = checkAnswer(challenges[i], answer);

            if (correct) {
                // Award coins based on attempts
                if (challengeAttempts[i] === 1) coins += 10;
                else if (challengeAttempts[i] === 2) coins += 5;
                else coins += 2;

                showProfessor(challenges[i].professorCorrect, 'happy');
                playSound('correct');
                await sleep(1000);
            } else {
                hearts--;
                updateHeartsDisplay(hearts);
                showProfessor(challenges[i].professorWrong, 'sad');
                playSound('wrong');
                await sleep(1500);
            }
        }

        if (hearts <= 0) {
            showLevelFailed(levelId, i, challenges.length);
            return;
        }
    }

    // Level complete — calculate stars and bonus
    const heartsLost = 3 - hearts;
    const stars = heartsLost === 0 ? 3 : heartsLost === 1 ? 2 : 1;
    const bonus = stars === 3 ? 30 : stars === 2 ? 15 : 5;
    coins += bonus;

    updateProfile(levelId, stars, coins);
    showLevelComplete(levelId, stars, coins);
}
```

### waitForSubmit Pattern
```js
function waitForSubmit() {
    return new Promise(resolve => {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.onclick = () => {
            const answer = LogicGame.Interactions.getAnswer();
            resolve(answer);
        };
    });
}
```

### Hint System
- Each challenge has a `hint` string
- Hint button is visible on the game screen, initially enabled
- Clicking it once reveals the hint text in a styled box below the challenge
- Hint button becomes disabled after use (one hint per challenge)
- Hint resets for each new challenge

### Feedback Display
- **Correct:** Green flash overlay (0.5s), challenge area briefly highlights green, professor speaks
- **Wrong:** Red flash overlay (0.5s), shake animation on the challenge area, professor speaks
- Brief pause after feedback before the next challenge or retry

### Confetti Animation (Level Complete, 3 stars)
- CSS-only confetti using multiple `::before`/`::after` pseudo-elements or dynamically created `div` particles
- Small colored squares/circles fall from the top of the screen with random horizontal drift
- Animation lasts ~3 seconds then fades out
- Colors: gold, purple, green, blue, pink

---

## Responsive Design

- Max-width container: `900px`, centered
- Below `768px` width: stack elements vertically, increase touch targets
- Below `480px` width: full-width buttons, reduce font sizes slightly
- Challenge options (Type A): switch from 2x2 grid to single column on small screens
- Robot shop: stack preview and item grid vertically on small screens
- All interactive elements: minimum `44px` touch target size

---

## Verification Checklist

After building, manually test:

### Basic Functionality
- [ ] Opens with no console errors via `file://` protocol
- [ ] All 12 JS files load without errors (check console)
- [ ] `window.LogicGame` namespace exists with all expected modules

### Profile System
- [ ] Create profile → name appears → survives page refresh
- [ ] Create second profile, switch between them, delete one
- [ ] Empty profile name is rejected
- [ ] Profile shows correct coin and star totals
- [ ] Deleting a profile removes all its data from localStorage

### Level Select
- [ ] All 24 levels are displayed in 4 module groups
- [ ] All levels are clickable regardless of completion status
- [ ] Star ratings display correctly (0-3 filled stars)
- [ ] Challenge count is shown per level

### Game Screen
- [ ] Hearts display correctly (3 filled at start)
- [ ] Challenge progress counter updates (e.g., "3 / 8")
- [ ] Professor Circuit appears with speech bubble
- [ ] Professor text matches the challenge's `professorIntro`

### Interaction Type A (Click-to-Select)
- [ ] 3-4 option panels render correctly
- [ ] Clicking an option highlights it with purple border
- [ ] Clicking a different option switches the selection
- [ ] Submit button is disabled until a selection is made
- [ ] Correct answer triggers green feedback + professor happy message
- [ ] Wrong answer triggers red feedback + professor sad message + heart loss

### Interaction Type B (Click-to-Place)
- [ ] Items render as clickable chips
- [ ] Zones render as labeled containers
- [ ] Clicking item then zone places the item
- [ ] Clicking a placed item returns it to the pool
- [ ] Submit disabled until all items are placed

### Interaction Type C (Click-to-Arrange)
- [ ] Items render in shuffled order
- [ ] Numbered slots render below
- [ ] Clicking an item places it in the next empty slot
- [ ] Undo button removes the last placed item
- [ ] Submit disabled until all slots are filled

### Interaction Type D (Click-to-Toggle)
- [ ] Grid renders with headers and pre-filled cells
- [ ] Pre-filled cells are not interactive
- [ ] Clicking interactive cells toggles between states (T/F or check/X)
- [ ] Submit button works at any time

### Interaction Type E (Type-Short-Answer)
- [ ] Text input renders and is auto-focused
- [ ] Submit works via button click or Enter key
- [ ] Answer comparison is case-insensitive and whitespace-trimmed
- [ ] Numeric answers compared as numbers (e.g., "42" matches "42.0")

### Interaction Type F (Mixed)
- [ ] Level 24 correctly uses mixed interaction types
- [ ] Each challenge dispatches to the correct renderer

### Game Mechanics
- [ ] Losing a heart updates the heart display
- [ ] Wrong answer re-presents the same challenge (does not skip)
- [ ] Losing all 3 hearts ends the level → Level Failed screen
- [ ] First-try correct awards 10 coins
- [ ] Second-try correct awards 5 coins
- [ ] Third+ try correct awards 2 coins
- [ ] 3 stars awarded with 0 hearts lost
- [ ] 2 stars awarded with 1 heart lost
- [ ] 1 star awarded with 2 hearts lost
- [ ] Completion bonus coins: 5 (1-star), 15 (2-star), 30 (3-star)
- [ ] Replaying a level updates `bestStars` only if higher
- [ ] Coins persist across sessions

### Hint System
- [ ] Hint button reveals hint text
- [ ] Hint button is disabled after one use per challenge
- [ ] Hint resets for each new challenge

### Robot Shop
- [ ] 4 category tabs work correctly
- [ ] Default items show as "Owned" / "Equipped"
- [ ] Items with insufficient coins show disabled buy button
- [ ] Buying deducts coins and adds to `unlockedCosmetics`
- [ ] Equipping updates `robotCustomization` and live preview
- [ ] Robot preview updates instantly when changing cosmetics
- [ ] Purchased cosmetics persist across sessions

### Professor Circuit
- [ ] Professor renders as CSS-only character (no broken images)
- [ ] Speech bubble appears with text at appropriate times
- [ ] Expression changes (happy/sad/excited) are visible
- [ ] Text does not overflow the speech bubble

### Level Complete Screen
- [ ] Stars animate/display correctly (1-3)
- [ ] Score breakdown shows correct information
- [ ] Confetti animation plays on 3-star completion
- [ ] "Next Level" button navigates to next level (not shown on level 24)
- [ ] "Back to Levels" button returns to Level Select

### Level Failed Screen
- [ ] Encouragement message displays
- [ ] "Try Again" restarts the same level
- [ ] "Back to Levels" returns to Level Select
- [ ] Partial progress is NOT saved on failure

### Sound System
- [ ] Correct answer plays chime
- [ ] Wrong answer plays buzz
- [ ] Level complete plays arpeggio
- [ ] Sound toggle button works (mutes/unmutes)
- [ ] Sound preference persists in localStorage

### Navigation
- [ ] "Back to Launcher" link works (goes to `../index.html`)
- [ ] All screen transitions work correctly
- [ ] No screen is unreachable from any state
- [ ] Refresh mid-game: profile data preserved, returns to profile select (acceptable)

### Content Integrity
- [ ] All 24 levels have the correct number of challenges
- [ ] Every challenge has a valid `correctAnswer` that is actually correct
- [ ] No duplicate challenges within a level
- [ ] Professor messages make sense for each challenge context
- [ ] Hints are helpful without giving away the answer
- [ ] Age-appropriate content throughout (K-2 is simple, 6-8 is advanced)

### Responsive Design
- [ ] Renders correctly at 1024px width
- [ ] Renders correctly at 768px width (tablet)
- [ ] Renders correctly at 375px width (phone)
- [ ] All interactive elements have adequate touch target size (44px+)
