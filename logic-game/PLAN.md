# Logic Game: "Robot Brain Builder" — Implementation Plan

## Context
4th game in the kid-games suite. Teaches logic and reasoning for K-8th graders. Player helps Professor Circuit build a robot's brain by completing logic challenges that install brain modules. All 38 logic topics covered across 24 levels in 4 modules.

**Theme:** Purple (`#9C27B0` → `#BA68C8`), light backgrounds `#F3E5F5`

---

## File Structure

```
logic-game/
  index.html                — HTML structure (all screen divs) + script tags
  style.css                 — Purple theme, all layouts, animations, responsive
  js/
    app.js                  — Entry point: init, screen navigation, event wiring
    profiles.js             — Profile CRUD, localStorage read/write
    sound.js                — SoundManager (Web Audio API synthesized tones)
    engine.js               — Game engine: level runner, lives, stars, coins, scoring
    interactions.js          — 6 interaction type renderers (A-F)
    robot.js                — CSS robot rendering, customization, shop logic
    professor.js            — Professor Circuit NPC, speech bubbles, expressions
    challenges-module1.js   — Challenge bank: Levels 1-6 (Perception Core)
    challenges-module2.js   — Challenge bank: Levels 7-12 (Analysis Engine)
    challenges-module3.js   — Challenge bank: Levels 13-18 (Logic Processor)
    challenges-module4.js   — Challenge bank: Levels 19-24 (Master Brain)
    levels.js               — Level metadata (names, module groupings, topic mappings)
  CLAUDE.md                 — Implementation specification
```

**Loading strategy:** All JS files via `<script>` tags (no ES modules — `file://` doesn't support them). Each file registers on `window.LogicGame` namespace:
```js
window.LogicGame = window.LogicGame || {};
window.LogicGame.Profiles = { ... };
```

Script load order:
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

---

## Level Map: 24 Levels in 4 Brain Modules

### Module 1: "Perception Core" (Levels 1-6) — K-2 Topics

| Lv | Name | Topics | Interaction | Challenges |
|----|------|--------|-------------|------------|
| 1 | Pattern Scanners | Pattern Recognition + Matching | Click-to-select | 8 |
| 2 | Sort Circuits | Sorting & Classifying + Odd One Out | Click-to-place (bins) | 8 |
| 3 | Sequence Chips | Sequencing + Following Algorithms | Click-to-arrange | 8 |
| 4 | Cause Detector | Cause & Effect (Basic) | Click-to-select (match) | 7 |
| 5 | Logic Gate Alpha | Simple If/Then | Click-to-toggle (T/F) | 7 |
| 6 | Shape Navigator | Spatial Reasoning + Analogies | Click-to-select | 8 |

### Module 2: "Analysis Engine" (Levels 7-12) — Grades 3-5

| Lv | Name | Topics | Interaction | Challenges |
|----|------|--------|-------------|------------|
| 7 | Pattern Turbo | Advanced Patterns + Number Puzzles | Click-to-select + type | 8 |
| 8 | Deduction Drive | Deductive Reasoning + Process of Elimination | Click-to-select (eliminate) | 8 |
| 9 | Circle Sorter | Venn Diagrams + Sets & Categorization | Click-to-place (Venn) | 8 |
| 10 | Logic Gate Beta | Complex If/Then + Complex Analogies | Click-to-select + toggle | 8 |
| 11 | Chain Reactor | Cause & Effect Chains + Algorithmic Thinking | Click-to-arrange | 7 |
| 12 | Space Mapper | Spatial Reasoning Intermediate + Decomposition | Click-to-select | 8 |

### Module 3: "Logic Processor" (Levels 13-18) — Grades 6-8 (Part 1)

| Lv | Name | Topics | Interaction | Challenges |
|----|------|--------|-------------|------------|
| 13 | Boolean Core | Boolean Logic (AND/OR/NOT) | Click-to-toggle | 8 |
| 14 | Truth Matrix | Truth Tables | Click-to-toggle (grid) | 7 |
| 15 | Reason Engine | Deductive vs Inductive + Syllogisms | Click-to-select | 8 |
| 16 | Condition Matrix | Advanced Conditionals + Propositional Logic | Click-to-toggle + select | 8 |
| 17 | Fallacy Filter | Logical Fallacies + Proofs & Justification | Click-to-select | 8 |
| 18 | Dimension Shifter | Advanced Spatial + Abstraction | Click-to-select | 8 |

### Module 4: "Master Brain" (Levels 19-24) — Grades 6-8 (Part 2)

| Lv | Name | Topics | Interaction | Challenges |
|----|------|--------|-------------|------------|
| 19 | Variable Vault | Variables as Logic + Probability | Click-to-select + type | 8 |
| 20 | Flow Controller | Flowcharts & Pseudocode | Click-to-arrange + select | 8 |
| 21 | Cipher Cracker | Code-Breaking / Ciphers | Type-short-answer | 7 |
| 22 | Combo Calculator | Combinatorial Reasoning | Click-to-select + type | 7 |
| 23 | Grid Master | Grid Logic Puzzles | Click-to-toggle (grid) | 6 |
| 24 | Full Activation | Mixed review from all modules | Mixed (all types) | 10 |

---

## 6 Interaction Types (All Click-Based)

| Type | Name | How It Works | Used For |
|------|------|-------------|----------|
| A | Click-to-Select | 3-4 option panels styled as circuit boards; click to choose | Patterns, analogies, odd-one-out, fallacies, spatial |
| B | Click-to-Place | Click item then click target zone (bins or Venn regions) | Sorting, classifying, Venn diagrams, sets |
| C | Click-to-Arrange | Click items in order to fill numbered slots; undo button | Sequencing, algorithm steps, cause-effect chains |
| D | Click-to-Toggle | Grid cells toggle between states (T/F, check/X) on click | Truth tables, boolean logic, if/then, logic grids |
| E | Type-Short-Answer | Text input + submit; hint button available | Ciphers, number puzzles, variables, combinatorics |
| F | Mixed | Random selection from A-E per challenge | Level 24 only |

---

## Game Mechanics

### Lives: 3 hearts per level attempt, reset each attempt. Wrong answer = lose 1 heart. Can retry same challenge. All hearts lost = level ends.

### Stars (1-3 per level)
- 1 star: Completed (lost 2 hearts)
- 2 stars: Completed (lost 0-1 hearts)
- 3 stars: Perfect (0 hearts lost)

### Coins
- First-try correct: 10 coins | Second-try: 5 | Third+: 2
- Completion bonus: 1★ +5, 2★ +15, 3★ +30

### All 24 levels always accessible (no locking)

---

## Robot Shop (~20 cosmetics)

| Category | Items (5 each) | Cost Range |
|----------|----------------|------------|
| Antennas | Default Bolt, Lightning Rod, Star Tip, Rainbow, Crown | Free – 120 |
| Eyes | Default Green, Blue Glow, Red Scanner, Gold, Rainbow Pulse | Free – 100 |
| Body Paint | Default Silver, Purple Plating, Galaxy, Gold, Holographic | Free – 150 |
| Accessories | None, Bow Tie, Cape, Jetpack, Halo | Free – 125 |

CSS-only robot (positioned divs). Cosmetics swap via CSS classes.

---

## Professor Circuit NPC
- CSS-only character, slides in via speech bubble
- Appears at: level intro, after correct/wrong, level complete
- Expressions: `.professor-happy`, `.professor-sad`, `.professor-excited`

---

## Screens (6 total)
1. **Profile Select** — CRUD, shows coins + stars per profile
2. **Level Select** — Brain diagram + 4 collapsible module sections with 6 level buttons each
3. **Robot Shop** — 4 tabs, live robot preview, buy/equip
4. **Game Screen** — Header (hearts/coins/progress), story panel, challenge area, feedback overlay
5. **Level Complete** — Stars, score breakdown, coins earned, confetti on 3★
6. **Level Failed** — Partial score, encouragement, retry

---

## localStorage (key: `logicGame`)

```js
{
  profiles: [{
    id: "...", name: "Alex", coins: 0, totalStarsEarned: 0,
    levelProgress: {
      "1": { bestStars: 0, completed: false, attempts: 0, bestScore: 0 },
      // ... through "24"
    },
    robotCustomization: { antenna: "default", eyes: "default", body: "default", accessory: "none" },
    unlockedCosmetics: ["default_antenna", "default_eyes", "default_body"],
    achievements: []
  }],
  activeProfileId: "...",
  soundEnabled: true
}
```

---

## Subagent Task Breakdown

### Wave 1: Foundation (3 agents in parallel)

**Agent 1A: HTML + CSS**
- Create `logic-game/index.html` with all 6 screen divs, script tags, floating shapes inline script
- Create `logic-game/style.css` — purple theme, all screen layouts, button styles, animations, responsive breakpoints, interaction type layouts, robot CSS drawing, Venn diagram regions, truth table grid, professor speech bubble
- Reference: `coding-game/index.html`, `coding-game/style.css`

**Agent 1B: Core JS (profiles + sound + levels)**
- Create `js/profiles.js` — Profile CRUD, localStorage read/write, ID generation
- Create `js/sound.js` — SoundManager with Web Audio API (correct, wrong, levelComplete, click tones)
- Create `js/levels.js` — Level metadata array (24 levels: id, name, module, topics, interactionType, challengeCount)
- Reference: `coding-game/app.js` for patterns

**Agent 1C: CLAUDE.md**
- Create `logic-game/CLAUDE.md` — Full implementation spec matching the format of existing game CLAUDE.md files
- Include: project structure, design specs, all level details, interaction types, game mechanics, localStorage schema

### Wave 2: Systems (3 agents in parallel, depends on Wave 1)

**Agent 2A: Game Engine**
- Create `js/engine.js` — Level runner (start level, run challenges, track lives/stars/coins, handle level complete/fail), scoring logic, results screen population

**Agent 2B: Interaction Engines**
- Create `js/interactions.js` — All 6 interaction type renderers (A-F). Each has `render(challenge, container)` and `checkAnswer()` methods. Handles DOM creation, event binding, feedback display.

**Agent 2C: Robot + Professor + Shop**
- Create `js/robot.js` — CSS robot rendering, customization state, shop screen (buy/equip), robot preview updates
- Create `js/professor.js` — Speech bubble rendering, expression changes, story intros, encouragement messages

### Wave 3: Challenge Content (4 agents in parallel, depends on Wave 2)

**Agent 3A: Module 1 Challenges**
- Create `js/challenges-module1.js` — ~72 challenges for Levels 1-6 (Perception Core, K-2 topics)
- Each challenge: `{ type, prompt, options/items/zones/cells, correctAnswer, hint, professorMessage }`

**Agent 3B: Module 2 Challenges**
- Create `js/challenges-module2.js` — ~72 challenges for Levels 7-12 (Analysis Engine, grades 3-5)

**Agent 3C: Module 3 Challenges**
- Create `js/challenges-module3.js` — ~72 challenges for Levels 13-18 (Logic Processor, grades 6-8)

**Agent 3D: Module 4 Challenges**
- Create `js/challenges-module4.js` — ~72 challenges for Levels 19-24 (Master Brain, grades 6-8)

### Wave 4: Integration (1 agent)

**Agent 4A: App Entry Point + Integration**
- Create `js/app.js` — Wire everything together: init all subsystems, bind screen navigation, bind events, start the app
- Integration testing: verify all files work together

### Wave 5: Testing + Polish (1 agent)

**Agent 5A: End-to-End Testing + Fixes**
- Open in browser, test all 24 levels
- Verify all interaction types
- Verify profile system, shop, coins, stars
- Fix any integration issues
- Responsive testing

### Wave 6: Launcher Update (LAST STEP)

**Agent 6A: Add to Launcher**
- Update `kid-games/index.html` — Add 4th purple card (🧠 Logic Game) linking to `logic-game/index.html`

---

## Agent Dependency Graph

```
Wave 1: [1A: HTML+CSS] [1B: Core JS] [1C: CLAUDE.md]     ← all parallel
            ↓               ↓
Wave 2: [2A: Engine] [2B: Interactions] [2C: Robot+Prof]   ← all parallel
            ↓               ↓                ↓
Wave 3: [3A: Mod1] [3B: Mod2] [3C: Mod3] [3D: Mod4]      ← all parallel
            ↓           ↓           ↓           ↓
Wave 4: [4A: App.js + Integration]                         ← sequential
            ↓
Wave 5: [5A: E2E Testing + Polish]                         ← sequential
            ↓
Wave 6: [6A: Add to Launcher Menu]                         ← LAST
```

**Total: 14 agent tasks across 6 waves**

---

## Key Reference Files
- `coding-game/app.js` — IIFE, profile CRUD, SoundManager, achievements, screen nav
- `coding-game/style.css` — CSS patterns: gradients, floating shapes, glossy panels, buttons
- `coding-game/index.html` — HTML structure: screen divs, floating shapes script
- `typing-game/app.js` — Word bank data pattern (similar to challenge bank)
- `kid-games/index.html` — Launcher: add 4th card (LAST STEP)

---

## Verification
- Open `logic-game/index.html` via `file://` in browser
- Create profile, verify localStorage persistence
- Play 1+ level from each module, verify all interaction types
- Verify lives/stars/coins system
- Test Robot Shop: buy + equip, verify robot preview
- Test level failed state
- Verify launcher links to all 4 games
- Test on mobile viewport
