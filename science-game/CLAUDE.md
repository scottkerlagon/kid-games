# Science Game — Science Town Builder

A science education game where players walk around a 2D tile map, visit science buildings to answer grade-scaled questions (K-8), earn domain-specific resources, and use those resources to construct town buildings on the map. 5 science domains covered across 3 grade bands with 150 total questions. Part of the `kid-games` suite but fully self-contained — no shared dependencies.

## Tech Stack

- Vanilla HTML + CSS + JS — no frameworks, no build tools, no npm
- Must work when opened via `file://` protocol (double-click `index.html`)
- Multi-file JS architecture using `window.ScienceGame` namespace (NOT ES modules — `file://` doesn't support them)
- CSS Grid for map rendering (not canvas)
- Files: `index.html`, `style.css`, `js/` folder with 11 JS files

## Color Scheme

- Primary: `#009688` (teal)
- Light: `#4DB6AC`
- Very Light: `#E0F2F1`
- Soft: `#B2DFDB`
- Dark: `#00796B`
- Darker: `#004D40`
- Background gradient: `#00897B` to `#26A69A` to `#00695C` to `#80CBC4`
- Text on primary: white
- Correct feedback: `#4CAF50` (green)
- Incorrect feedback: `#F44336` (red)
- Resource colors:
  - Stone: `#9E9E9E` (gray)
  - Wood: `#8D6E63` (brown)
  - Glass: `#42A5F5` (light blue)
  - Energy: `#FFEE58` (yellow)
  - Metal: `#78909C` (blue-gray)

## UI Conventions

- Base font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Max-width container: `900px`, centered
- Kid-friendly: large text, bright colors, minimal reading required
- Floating animated shapes in background (decorative CSS elements — clouds, leaves, gears)
- Glossy panel styling with subtle shadows and rounded corners

---

## File Structure

```
science-game/
  index.html                — HTML structure (all screen/overlay divs) + script tags
  style.css                 — Teal theme, map grid, buildings, player, HUD, overlays, responsive, D-pad, animations
  CLAUDE.md                 — This specification file
  js/
    profiles.js             — Profile CRUD, localStorage read/write, ID generation
    sound.js                — SoundManager (Web Audio API synthesized tones: correct, wrong, build, collect, click)
    map-data.js             — 16x16 tile map layout, tile types, building positions, default map constant
    map-renderer.js         — CSS Grid rendering, player movement, collision detection, tile interaction
    buildings.js            — Town building catalog, costs, unlock thresholds, build mode logic
    questions-k2.js         — K-2 science questions (10 per domain, 50 total)
    questions-35.js         — 3-5 science questions (10 per domain, 50 total)
    questions-68.js         — 6-8 science questions (10 per domain, 50 total)
    quiz-engine.js          — Quiz session runner, answer checking, resource awarding, feedback
    progression.js          — Town level calculation, unlock logic, level-up detection
    app.js                  — Entry point: init all subsystems, screen navigation, event wiring
```

### Namespace Convention

Every JS file registers its exports on `window.ScienceGame`:
```js
window.ScienceGame = window.ScienceGame || {};
window.ScienceGame.ModuleName = { ... };
```

### Script Load Order (in index.html)

```html
<script src="js/profiles.js"></script>
<script src="js/sound.js"></script>
<script src="js/map-data.js"></script>
<script src="js/map-renderer.js"></script>
<script src="js/buildings.js"></script>
<script src="js/questions-k2.js"></script>
<script src="js/questions-35.js"></script>
<script src="js/questions-68.js"></script>
<script src="js/quiz-engine.js"></script>
<script src="js/progression.js"></script>
<script src="js/app.js"></script>
```

Order matters: `app.js` depends on everything else. `quiz-engine.js` depends on the question bank files. `map-renderer.js` depends on `map-data.js`. `buildings.js` depends on nothing. Question bank files depend on nothing. `progression.js` depends on `buildings.js`.

---

## Profile System

### Storage
- localStorage key: `scienceGame`
- Loaded/saved as a single JSON object

### Full localStorage Schema
```json
{
  "profiles": [ "...profile objects..." ],
  "activeProfileId": "abc123",
  "soundEnabled": true
}
```

### Profile Object
```json
{
  "id": "...",
  "name": "Alex",
  "grade": "K-2",
  "resources": {
    "stone": 0,
    "wood": 0,
    "glass": 0,
    "energy": 0,
    "metal": 0
  },
  "placedBuildings": [],
  "questionsAnswered": {
    "total": 0,
    "correct": 0,
    "byDomain": {
      "earth": { "total": 0, "correct": 0 },
      "biology": { "total": 0, "correct": 0 },
      "chemistry": { "total": 0, "correct": 0 },
      "physics": { "total": 0, "correct": 0 },
      "engineering": { "total": 0, "correct": 0 }
    }
  },
  "townLevel": 0,
  "playerPosition": { "x": 8, "y": 8 }
}
```

### Placed Building Object
```json
{
  "type": "house",
  "x": 5,
  "y": 7
}
```

### ID Generation
```js
Date.now().toString(36) + Math.random().toString(36).slice(2)
```
This avoids `crypto.randomUUID()` which requires a secure context and fails on `file://`.

### CRUD Operations
- **Create:** Inline text input (not a modal) + grade selector dropdown (K-2, 3-5, 6-8) + "Create Profile" button. Reject empty names. New profiles start with 0 resources, no placed buildings, all question stats at 0, townLevel 0, player at center (8,8).
- **Select:** Click a profile button to set it as active and navigate to the Map Screen.
- **Delete:** Small delete button on each profile, uses `confirm()` dialog.

---

## Screen Navigation

All screens are `<div>` sections in `index.html`. Only one visible at a time — toggle via `display: none` / `display: block`. No routing, no URL fragments. Overlays (quiz, build) display on top of the map screen.

### Flow
```
Profile Select → Map Screen
                    ↕
         Quiz Overlay (modal, over map)
                    ↕
         Build Overlay (modal, over map)
```

Quiz Overlay opens when the player interacts with a science building. Build Overlay opens when the player clicks the Build button. Both close and return to the Map Screen.

### Screen 1: Profile Select (`#profile-screen`)
- Title: "Science Town Builder" in large teal text
- Subtitle: "Build your town by exploring science!"
- List of profile buttons, each showing:
  - Profile name
  - Grade band (K-2, 3-5, or 6-8)
  - Town level (Village / Town / City)
  - Total buildings placed count
  - Small "X" delete button
- Clicking a profile selects it and navigates to Map Screen
- Inline input field + grade dropdown + "Create Profile" button at bottom
- "Back to Launcher" link at top right → `../index.html`
- Sound toggle button (speaker icon) in top left

### Screen 2: Map Screen (`#map-screen`)
- **HUD bar** (`#hud-bar`) at top:
  - Profile name and grade badge
  - Resource counters: Stone, Wood, Glass, Energy, Metal (each with icon + count)
  - Town level display (Village / Town / City)
  - Build button (`#build-btn`)
  - Sound toggle button
  - "Change Profile" button → returns to Profile Select
- **Map area** (`#map-container`):
  - 16x16 CSS Grid (`#map-grid`)
  - Player character (`#player`) rendered as a CSS div on the grid
  - Tiles rendered as colored grid cells with building sprites (CSS-only)
  - Science buildings rendered with unique visual styles per domain
  - Placed town buildings rendered on the grid
- **Interaction prompt** (`#interact-prompt`):
  - Hidden by default
  - Appears when player is adjacent to a science building: "Press Space to enter [building name]"
  - On mobile: interact button in the D-pad shows this instead
- **Mobile D-pad** (`#d-pad`):
  - Visible only on touch devices (or below 768px width)
  - 4 directional arrow buttons (`#d-pad-up`, `#d-pad-down`, `#d-pad-left`, `#d-pad-right`)
  - Center interact button (`#d-pad-interact`)
  - 48px minimum touch targets
  - Positioned at bottom center of screen

### Overlay 1: Quiz Overlay (`#quiz-overlay`)
- Semi-transparent dark backdrop over the map
- Centered modal panel (max-width `600px`)
- **Header:** Building name + domain icon + "Question X of 4" progress
- **Question area** (`#quiz-question`): question text in large readable font
- **Options area** (`#quiz-options`): 4 option buttons arranged vertically, each full-width
- **Feedback area** (`#quiz-feedback`): hidden by default, shows after answering:
  - Correct: green background, checkmark icon, "+1 [resource name]!" text
  - Wrong: red background, X icon, explanation text from the question
- **Next/Close button** (`#quiz-next-btn`): "Next Question" during quiz, "Done!" after final question
- **Resource earned display** (`#quiz-resources-earned`): running tally of resources earned this visit

### Overlay 2: Build Overlay (`#build-overlay`)
- Semi-transparent dark backdrop over the map
- Side panel sliding in from the right (width `320px`, full height)
- **Header:** "Build" + current town level
- **Resource summary** (`#build-resources`): current resource counts
- **Building list** (`#build-list`): scrollable list of all town buildings, each showing:
  - Building name and emoji/icon
  - Resource cost (each resource with icon + count)
  - "Build" button (enabled only if player has sufficient resources AND building is unlocked)
  - "Locked" badge if unlock threshold not met (with tooltip showing requirement)
- **Instructions** at bottom: "Close this panel, then click a green tile to place your building"
- **Close button** (`#build-close-btn`): closes the overlay
- **Active build state**: after selecting a building to build:
  - Build overlay closes
  - Valid placement tiles highlight green on the map
  - Click a highlighted tile to place the building
  - Press Escape or click a non-valid tile to cancel
  - CSS scale-in animation on placement (0 → 1 scale over 0.3s)
  - Resources are deducted upon successful placement

---

## Map System

### Grid Specifications
- 16x16 CSS Grid
- Each tile: `40px` x `40px` on desktop, `28px` x `28px` below 768px, `22px` x `22px` below 480px
- Grid container: centered in the map area, with a 2px border around each tile
- Grid uses `grid-template-columns: repeat(16, 1fr)` within a fixed-width container

### Tile Types
```js
const TILE = {
    GRASS: 0,       // Green, walkable, buildable
    PATH: 1,        // Light brown/tan, walkable, not buildable
    WATER: 2,       // Blue, blocks movement
    TREE: 3,        // Dark green with tree icon, blocks movement
    SCIENCE_BLDG: 4, // Domain-colored, blocks movement, interactable
    TOWN_BLDG: 5,   // Player-placed, blocks movement
    BLOCKED: 6      // Gray, blocks movement (decorative rocks, fences)
};
```

### Tile Appearance (CSS Classes)
| Tile Type | CSS Class | Background Color | Visual |
|-----------|-----------|-----------------|--------|
| GRASS | `.tile-grass` | `#81C784` (green) | Solid with subtle noise texture via CSS |
| PATH | `.tile-path` | `#D7CCC8` (tan) | Lighter border for path edges |
| WATER | `.tile-water` | `#42A5F5` (blue) | CSS animation for subtle shimmer |
| TREE | `.tile-tree` | `#388E3C` (dark green) | Circular pseudo-element as canopy |
| SCIENCE_BLDG | `.tile-science` | Varies by domain | Building icon via CSS shapes |
| TOWN_BLDG | `.tile-town` | `#FFCC80` (light orange) | Building icon based on type |
| BLOCKED | `.tile-blocked` | `#BDBDBD` (gray) | Rocky texture via border styling |

### Default Map Layout (16x16)

The map is stored as a 16x16 2D array in `map-data.js`. `0` = GRASS, `1` = PATH, `2` = WATER, `3` = TREE, `4` = SCIENCE_BLDG, `6` = BLOCKED. Town buildings (type `5`) are placed dynamically by the player and stored in the profile.

```js
window.ScienceGame.MapData = {
    DEFAULT_MAP: [
        // Row 0 (top)
        [3, 3, 6, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 6, 3, 3],
        // Row 1
        [3, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 3],
        // Row 2 — Quarry at (3,2), Workshop at (7,2), Greenhouse at (12,2)
        [0, 0, 0, 4, 0, 0, 0, 4, 1, 0, 0, 0, 4, 0, 0, 0],
        // Row 3
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        // Row 4
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        // Row 5
        [2, 2, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 2, 2],
        // Row 6
        [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        // Row 7
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        // Row 8 — Player starts at (8,8)
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        // Row 9
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        // Row 10
        [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        // Row 11
        [2, 2, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 2, 2],
        // Row 12
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        // Row 13 — Laboratory at (3,13), Power Station at (12,13)
        [0, 0, 0, 4, 0, 0, 0, 1, 1, 0, 0, 0, 4, 0, 0, 0],
        // Row 14
        [3, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 3],
        // Row 15 (bottom)
        [3, 3, 6, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 6, 3, 3]
    ],

    // Science building positions and metadata
    SCIENCE_BUILDINGS: [
        { x: 3,  y: 2,  domain: 'earth',       name: 'The Quarry',      resource: 'stone' },
        { x: 7,  y: 2,  domain: 'engineering',  name: 'The Workshop',    resource: 'metal' },
        { x: 12, y: 2,  domain: 'biology',      name: 'The Greenhouse',  resource: 'wood'  },
        { x: 3,  y: 13, domain: 'chemistry',    name: 'The Laboratory',  resource: 'glass' },
        { x: 12, y: 13, domain: 'physics',      name: 'Power Station',   resource: 'energy'}
    ],

    PLAYER_START: { x: 8, y: 8 }
};
```

### Science Building Visual Styles
Each science building gets a domain-specific color and icon rendered via CSS:

| Building | Domain Color | CSS Icon |
|----------|-------------|----------|
| The Quarry | `#9E9E9E` (gray) | Layered rectangles (rock layers) |
| The Workshop | `#78909C` (blue-gray) | Gear shape via border-radius + pseudo-elements |
| The Greenhouse | `#66BB6A` (green) | Triangle roof + rectangular base (greenhouse shape) |
| The Laboratory | `#42A5F5` (light blue) | Flask shape via pseudo-elements |
| Power Station | `#FFEE58` (yellow) | Lightning bolt via CSS borders |

### Player Character
- Rendered as a `div` with CSS-only character design:
  - Circular head (teal border, white fill)
  - Rectangular body (teal fill)
  - Small dot eyes
- Positioned absolutely within the grid using `grid-column` and `grid-row`
- CSS transition: `0.15s ease` on position changes for smooth movement
- Z-index above tiles but below overlays

### Movement System
- **Keyboard:** Arrow keys or WASD for movement
- **Mobile:** D-pad buttons
- **Tile-snapped:** Player moves one tile per keypress, no sub-tile movement
- **Collision detection:** Before moving, check the destination tile type:
  - GRASS (0): allowed
  - PATH (1): allowed
  - WATER (2): blocked
  - TREE (3): blocked
  - SCIENCE_BLDG (4): blocked (interact from adjacent tile)
  - TOWN_BLDG (5): blocked
  - BLOCKED (6): blocked
- **Boundary check:** Cannot move outside the 16x16 grid (x: 0-15, y: 0-15)
- **Save position:** Player position is saved to the profile on every move

### Interaction System
- When the player is adjacent (one tile away in any cardinal direction) to a SCIENCE_BLDG tile:
  - The interaction prompt appears: "Press Space to enter [building name]"
  - On mobile: the D-pad interact button becomes active
- Pressing Space (or tapping interact) opens the Quiz Overlay for that building's domain
- "Adjacent" means exactly 1 tile away horizontally or vertically (not diagonal)

---

## 5 Science Buildings

| Building | Domain | Resource Awarded | Map Position (x,y) | Description |
|----------|--------|-----------------|---------------------|-------------|
| The Quarry | Earth Science | Stone | (3, 2) | A rocky excavation site where earth science questions reveal stone resources |
| The Workshop | Engineering | Metal | (7, 2) | A mechanical workshop where engineering challenges yield metal |
| The Greenhouse | Biology | Wood | (12, 2) | A lush greenhouse where biology knowledge grows wood resources |
| The Laboratory | Chemistry | Glass | (3, 13) | A bubbling chemistry lab where experiments produce glass |
| Power Station | Physics | Energy | (12, 13) | A humming power plant where physics mastery generates energy |

### Visiting a Science Building
1. Player walks adjacent to the building
2. Interaction prompt appears
3. Player presses Space (or taps interact)
4. Quiz Overlay opens with 4 questions from the building's domain, at the player's grade band
5. Each correct answer awards 1 unit of the building's resource
6. After all 4 questions, overlay shows summary and closes
7. Player can revisit buildings unlimited times for more resources

---

## Question System

### Structure
- **3 grade bands:** K-2, 3-5, 6-8
- **5 domains:** Earth Science, Biology, Chemistry, Physics, Engineering
- **10 questions per domain per grade band** = 50 questions per file, 150 total
- **4 questions per visit** — randomly selected from the appropriate domain + grade band pool (no repeats within a visit)
- **1 resource per correct answer** — maximum 4 resources per visit

### Question Object Format
```js
{
    domain: 'earth',           // 'earth', 'biology', 'chemistry', 'physics', 'engineering'
    question: 'What kind of rock is formed from cooled lava?',
    options: [
        'Sedimentary',
        'Igneous',
        'Metamorphic',
        'Mineral'
    ],
    correctIndex: 1,           // 0-based index into options array
    explanation: 'Igneous rocks form when hot melted rock (magma or lava) cools down and hardens.'
}
```

### Answer Flow
1. Question text and 4 option buttons are displayed
2. Player clicks one option
3. **Correct answer:**
   - Selected option turns green (`#4CAF50`)
   - "+1 [Resource]!" feedback appears with resource icon
   - Resource counter in HUD increments
   - Correct sound plays
   - 1-second pause, then next question (or summary if last question)
4. **Wrong answer:**
   - Selected option turns red (`#F44336`)
   - Correct option highlights green
   - Explanation text appears below the options
   - Wrong sound plays
   - No resource awarded
   - 2-second pause (longer so the player can read the explanation), then next question
5. **No lives/hearts** — this is low-pressure exploration. Getting a question wrong just means no resource for that question. The quiz continues regardless.

### Question Selection Logic
```js
function selectQuestions(domain, grade, count) {
    const pool = getQuestionPool(domain, grade);  // all 10 questions for this domain+grade
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);  // return 4 random questions
}
```

### Question Statistics Tracking
After each question (correct or wrong), update the profile's `questionsAnswered`:
- Increment `total` and `byDomain[domain].total`
- If correct, also increment `correct` and `byDomain[domain].correct`
- Save profile to localStorage after each question

### Question Bank Organization

Each question file exports an object keyed by domain:

```js
// questions-k2.js
window.ScienceGame = window.ScienceGame || {};
window.ScienceGame.QuestionsK2 = {
    earth: [ /* 10 question objects */ ],
    biology: [ /* 10 question objects */ ],
    chemistry: [ /* 10 question objects */ ],
    physics: [ /* 10 question objects */ ],
    engineering: [ /* 10 question objects */ ]
};
```

The quiz engine retrieves questions by combining all three files based on grade:
```js
function getQuestionPool(domain, grade) {
    const banks = {
        'K-2': ScienceGame.QuestionsK2,
        '3-5': ScienceGame.Questions35,
        '6-8': ScienceGame.Questions68
    };
    return banks[grade][domain] || [];
}
```

---

## Grade-Specific Content Topics

### K-2 (Ages 5-8) — Simple, Concrete, Observable

| Domain | Topics | Example Questions |
|--------|--------|-------------------|
| Earth Science | Rocks vs. soil, weather (sunny/rainy/snowy), seasons, day and night, the Sun and Moon | "Which one is a rock? (show options)" / "What season has snow?" |
| Biology | Plant parts (roots, stem, leaves, flower), animal habitats, living vs. nonliving, senses, basic needs of animals | "Which part of the plant takes in water from the ground?" / "Is a rock living or nonliving?" |
| Chemistry | Solids, liquids, and gases, hot vs. cold, mixing colors, dissolving (sugar in water), everyday materials | "Which one is a liquid: ice, water, or steam?" / "What happens when you mix red and blue paint?" |
| Physics | Push and pull forces, magnets attract/repel, light and shadows, sound (loud vs. quiet), fast vs. slow | "What makes a shadow?" / "Does a magnet attract wood?" |
| Engineering | Simple tools (hammer, scissors, ruler), building with blocks, design a solution to a problem, bridges, measuring | "Which tool would you use to cut paper?" / "What shape makes a strong bridge?" |

### 3-5 (Ages 8-11) — Systems, Processes, Cause and Effect

| Domain | Topics | Example Questions |
|--------|--------|-------------------|
| Earth Science | Rock cycle (igneous/sedimentary/metamorphic), erosion and weathering, water cycle, layers of Earth, fossils | "What type of rock is formed from cooled magma?" / "What process breaks down rocks into smaller pieces?" |
| Biology | Food chains (producer/consumer/decomposer), ecosystems, adaptations, plant life cycle, inherited vs. learned traits | "In a food chain, what is the role of a decomposer?" / "Which animal adaptation helps survive cold winters?" |
| Chemistry | States of matter and changes, mixtures vs. solutions, reversible and irreversible changes, properties of materials, atoms (basic) | "What happens to water when it reaches 100 degrees Celsius?" / "Is mixing sand and water reversible?" |
| Physics | Simple machines (lever, pulley, inclined plane, wheel and axle, wedge, screw), gravity, friction, energy types, circuits (basic) | "Which simple machine is a ramp?" / "What force pulls objects toward Earth?" |
| Engineering | Design process (ask, imagine, plan, create, improve), testing and improving, constraints and criteria, structures, teamwork in engineering | "What is the first step of the engineering design process?" / "Why do engineers test their designs?" |

### 6-8 (Ages 11-14) — Models, Mechanisms, Quantitative Reasoning

| Domain | Topics | Example Questions |
|--------|--------|-------------------|
| Earth Science | Plate tectonics (convergent/divergent/transform boundaries), earthquakes and volcanoes, atmosphere layers, climate vs. weather, Earth's resources | "What type of plate boundary causes earthquakes when plates slide past each other?" / "Which layer of the atmosphere contains the ozone layer?" |
| Biology | Cells (plant vs. animal, organelles), photosynthesis, body systems (digestive, circulatory, respiratory), genetics basics, classification of organisms | "Which organelle is responsible for photosynthesis?" / "What does DNA stand for?" |
| Chemistry | Chemical reactions (reactants/products), periodic table basics, atoms and molecules, acids and bases (pH), conservation of mass | "In a chemical reaction, what do we call the starting substances?" / "Is lemon juice an acid or a base?" |
| Physics | Newton's three laws of motion, speed/velocity/acceleration, potential and kinetic energy, waves (transverse/longitudinal), electromagnetic spectrum | "Which of Newton's laws says that every action has an equal and opposite reaction?" / "What type of energy does a ball have when held above the ground?" |
| Engineering | Materials science (conductors/insulators/semiconductors), structural engineering (tension/compression), systems thinking, trade-offs in design, optimization | "What is a material that does NOT conduct electricity well called?" / "In a bridge, what force tries to squeeze materials together?" |

---

## Town Buildings

### 6 Building Types

| Building | Emoji | Cost | Unlock Requirement | Description |
|----------|-------|------|--------------------|-------------|
| House | `(house icon)` | 3 Wood + 2 Stone | Start (always available) | A cozy home for your town's residents |
| Garden | `(garden icon)` | 2 Wood + 1 Stone | Start (always available) | A beautiful garden with flowers and plants |
| School | `(school icon)` | 5 Wood + 3 Stone + 2 Glass | Start (always available) | A place where young scientists learn |
| Hospital | `(hospital icon)` | 4 Stone + 3 Glass + 2 Metal | 3 buildings placed | A medical center for the town |
| Library | `(library icon)` | 4 Wood + 2 Glass + 1 Energy | 3 buildings placed | A library full of science books |
| Park | `(park icon)` | 3 Wood + 2 Stone + 1 Energy | 5 buildings placed | A recreational park with trees and a fountain |

### Building Cost Data Structure (in buildings.js)
```js
window.ScienceGame.Buildings = {
    CATALOG: [
        {
            type: 'house',
            name: 'House',
            description: 'A cozy home for your town\'s residents',
            cost: { wood: 3, stone: 2 },
            unlockAt: 0  // number of buildings that must be placed before this unlocks
        },
        {
            type: 'garden',
            name: 'Garden',
            description: 'A beautiful garden with flowers and plants',
            cost: { wood: 2, stone: 1 },
            unlockAt: 0
        },
        {
            type: 'school',
            name: 'School',
            description: 'A place where young scientists learn',
            cost: { wood: 5, stone: 3, glass: 2 },
            unlockAt: 0
        },
        {
            type: 'hospital',
            name: 'Hospital',
            description: 'A medical center for the town',
            cost: { stone: 4, glass: 3, metal: 2 },
            unlockAt: 3
        },
        {
            type: 'library',
            name: 'Library',
            description: 'A library full of science books',
            cost: { wood: 4, glass: 2, energy: 1 },
            unlockAt: 3
        },
        {
            type: 'park',
            name: 'Park',
            description: 'A recreational park with trees and a fountain',
            cost: { wood: 3, stone: 2, energy: 1 },
            unlockAt: 5
        }
    ],

    canAfford: function(buildingType, resources) { /* ... */ },
    isUnlocked: function(buildingType, placedCount) { /* ... */ },
    deductCost: function(buildingType, resources) { /* ... */ }
};
```

### Town Building Appearance (CSS)
Each town building type renders as a distinct CSS shape on its tile:

| Building | CSS Visual |
|----------|-----------|
| House | Small rectangle with triangular roof (pseudo-element), warm orange/brown |
| Garden | Green circle with small colored dots (flowers), surrounded by green |
| School | Taller rectangle with flag on top, red/brown |
| Hospital | White rectangle with red cross symbol (pseudo-element) |
| Library | Rectangle with horizontal lines (book shelves), brown |
| Park | Green base with small tree shapes, pathway |

### Build Mode Flow
1. Player clicks the "Build" button (`#build-btn`) on the HUD
2. Build Overlay slides in from the right showing available buildings
3. Player clicks "Build" on a building they can afford and have unlocked
4. Build Overlay closes
5. Map enters **placement mode**:
   - All GRASS tiles that are walkable and not adjacent to another town building highlight with green overlay
   - Player clicks a highlighted tile to place the building
   - CSS scale-in animation: building appears with `transform: scale(0)` → `scale(1)` over 0.3s
   - Build sound plays
   - Resources are deducted from the profile
   - The placed building is added to `profile.placedBuildings` array
   - Map tile at that position changes to TOWN_BLDG (5)
   - Profile is saved to localStorage
6. Pressing Escape or clicking a non-highlighted tile cancels placement mode

### Placement Validation
- Can only place on GRASS (0) tiles
- Cannot place on tiles occupied by science buildings, water, trees, paths, blocked tiles, or other town buildings
- Cannot place on the player's current position
- Multiple buildings of the same type are allowed (e.g., multiple houses)

---

## Town Progression

### Town Levels

| Buildings Placed | Town Level | Level Name | Unlocks |
|-----------------|------------|------------|---------|
| 0 | 0 | Village | House, Garden, School |
| 3 | 1 | Town | Hospital, Library |
| 5 | 2 | City | Park |

### Level Calculation (in progression.js)
```js
window.ScienceGame.Progression = {
    calculateLevel: function(placedCount) {
        if (placedCount >= 5) return { level: 2, name: 'City' };
        if (placedCount >= 3) return { level: 1, name: 'Town' };
        return { level: 0, name: 'Village' };
    },

    checkLevelUp: function(oldLevel, newLevel) {
        if (newLevel > oldLevel) {
            return true;  // trigger level-up notification
        }
        return false;
    },

    getUnlockedBuildings: function(placedCount) {
        return ScienceGame.Buildings.CATALOG.filter(b => b.unlockAt <= placedCount);
    }
};
```

### Level-Up Notification
When the player places a building that triggers a level-up:
- Brief celebratory overlay: "Your village grew into a Town!" or "Your town grew into a City!"
- Town level display in HUD updates
- Celebration sound plays
- Overlay auto-dismisses after 3 seconds (or click to dismiss)

---

## Sound System

### Implementation
Web Audio API with synthesized tones (no audio files needed). Wrapped in a `SoundManager` object.

### Sounds
| Sound | When | Description |
|-------|------|-------------|
| `correct` | Correct quiz answer | Rising two-tone chime (C5 → E5) |
| `wrong` | Wrong quiz answer | Low descending buzz (A3 → F3) |
| `click` | Button click, menu selection | Short click tone |
| `build` | Building placed on map | Constructive thud + rising tone (like placing a block) |
| `collect` | Resource earned | Brief sparkly ding |
| `levelUp` | Town level increases | Ascending arpeggio (C4 → E4 → G4 → C5) |
| `interact` | Entering a science building | Door-opening chime |

### Sound Toggle
- Global `soundEnabled` flag in localStorage
- Toggle button visible on Profile Select and Map Screen (speaker icon)
- When disabled, `SoundManager.play()` returns immediately without playing

---

## HTML Element IDs

### Screens
| ID | Element | Purpose |
|----|---------|---------|
| `profile-screen` | `div` | Profile selection screen |
| `map-screen` | `div` | Main map/gameplay screen |
| `quiz-overlay` | `div` | Quiz modal overlay |
| `build-overlay` | `div` | Build mode side panel overlay |

### Profile Screen Elements
| ID | Element | Purpose |
|----|---------|---------|
| `profile-list` | `div` | Container for profile buttons |
| `profile-name-input` | `input` | Text input for new profile name |
| `profile-grade-select` | `select` | Dropdown for grade band selection |
| `create-profile-btn` | `button` | Create new profile button |
| `back-to-launcher` | `a` | Link back to `../index.html` |
| `sound-toggle` | `button` | Sound on/off toggle |

### Map Screen Elements
| ID | Element | Purpose |
|----|---------|---------|
| `hud-bar` | `div` | Top HUD bar container |
| `hud-profile-name` | `span` | Displays active profile name |
| `hud-grade-badge` | `span` | Displays grade band (K-2, 3-5, 6-8) |
| `resource-stone` | `span` | Stone resource counter |
| `resource-wood` | `span` | Wood resource counter |
| `resource-glass` | `span` | Glass resource counter |
| `resource-energy` | `span` | Energy resource counter |
| `resource-metal` | `span` | Metal resource counter |
| `town-level-display` | `span` | Current town level name |
| `build-btn` | `button` | Opens build overlay |
| `change-profile-btn` | `button` | Returns to profile select |
| `map-container` | `div` | Wrapper for the grid area |
| `map-grid` | `div` | The 16x16 CSS Grid |
| `player` | `div` | The player character element |
| `interact-prompt` | `div` | "Press Space to enter..." prompt |

### D-Pad Elements
| ID | Element | Purpose |
|----|---------|---------|
| `d-pad` | `div` | D-pad container |
| `d-pad-up` | `button` | Move up |
| `d-pad-down` | `button` | Move down |
| `d-pad-left` | `button` | Move left |
| `d-pad-right` | `button` | Move right |
| `d-pad-interact` | `button` | Interact with adjacent building |

### Quiz Overlay Elements
| ID | Element | Purpose |
|----|---------|---------|
| `quiz-building-name` | `h2` | Name of the science building being visited |
| `quiz-progress` | `span` | "Question X of 4" counter |
| `quiz-question` | `p` | The question text |
| `quiz-options` | `div` | Container for 4 option buttons |
| `quiz-option-0` | `button` | Option A |
| `quiz-option-1` | `button` | Option B |
| `quiz-option-2` | `button` | Option C |
| `quiz-option-3` | `button` | Option D |
| `quiz-feedback` | `div` | Feedback area (correct/wrong + explanation) |
| `quiz-next-btn` | `button` | "Next Question" / "Done!" button |
| `quiz-resources-earned` | `div` | Running tally of resources earned this visit |

### Build Overlay Elements
| ID | Element | Purpose |
|----|---------|---------|
| `build-close-btn` | `button` | Close the build panel |
| `build-resources` | `div` | Current resource counts display |
| `build-list` | `div` | Scrollable list of buildable structures |
| `build-town-level` | `span` | Current town level in build panel header |

---

## Key Implementation Details

### Screen Transitions
```js
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}
```

Overlays are separate — they don't hide the map screen. They use `display: none` / `display: flex` independently:
```js
function showOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
}
function hideOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'none';
}
```

### Quiz Session Flow (in quiz-engine.js)
```js
window.ScienceGame.QuizEngine = {
    startQuiz: function(building, profile) {
        const questions = selectQuestions(building.domain, profile.grade, 4);
        let currentIndex = 0;
        let resourcesEarned = 0;

        showOverlay('quiz-overlay');
        this.showQuestion(questions, currentIndex, building, profile, resourcesEarned);
    },

    showQuestion: function(questions, index, building, profile, resourcesEarned) {
        if (index >= questions.length) {
            this.showSummary(building, resourcesEarned);
            return;
        }

        const q = questions[index];
        document.getElementById('quiz-progress').textContent = 'Question ' + (index + 1) + ' of ' + questions.length;
        document.getElementById('quiz-question').textContent = q.question;

        // Render 4 option buttons
        for (let i = 0; i < 4; i++) {
            const btn = document.getElementById('quiz-option-' + i);
            btn.textContent = q.options[i];
            btn.className = 'quiz-option';  // reset styling
            btn.disabled = false;
            btn.onclick = () => this.handleAnswer(i, q, questions, index, building, profile, resourcesEarned);
        }

        document.getElementById('quiz-feedback').style.display = 'none';
        document.getElementById('quiz-next-btn').style.display = 'none';
    },

    handleAnswer: function(selectedIndex, question, questions, questionIndex, building, profile, resourcesEarned) {
        // Disable all option buttons
        for (let i = 0; i < 4; i++) {
            document.getElementById('quiz-option-' + i).disabled = true;
        }

        const correct = selectedIndex === question.correctIndex;

        // Highlight selected answer
        const selectedBtn = document.getElementById('quiz-option-' + selectedIndex);
        const correctBtn = document.getElementById('quiz-option-' + question.correctIndex);

        if (correct) {
            selectedBtn.classList.add('quiz-option-correct');
            resourcesEarned++;
            profile.resources[building.resource]++;
            ScienceGame.Sound.play('correct');
            ScienceGame.Sound.play('collect');

            document.getElementById('quiz-feedback').style.display = 'block';
            document.getElementById('quiz-feedback').textContent = '+1 ' + building.resource + '!';
            document.getElementById('quiz-feedback').className = 'quiz-feedback-correct';
        } else {
            selectedBtn.classList.add('quiz-option-wrong');
            correctBtn.classList.add('quiz-option-correct');
            ScienceGame.Sound.play('wrong');

            document.getElementById('quiz-feedback').style.display = 'block';
            document.getElementById('quiz-feedback').textContent = question.explanation;
            document.getElementById('quiz-feedback').className = 'quiz-feedback-wrong';
        }

        // Update stats
        profile.questionsAnswered.total++;
        profile.questionsAnswered.byDomain[question.domain].total++;
        if (correct) {
            profile.questionsAnswered.correct++;
            profile.questionsAnswered.byDomain[question.domain].correct++;
        }
        ScienceGame.Profiles.save();

        // Update HUD resource display
        ScienceGame.App.updateHUD();

        // Show next button
        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.style.display = 'block';
        nextBtn.textContent = (questionIndex < questions.length - 1) ? 'Next Question' : 'Done!';
        nextBtn.onclick = () => {
            this.showQuestion(questions, questionIndex + 1, building, profile, resourcesEarned);
        };
    },

    showSummary: function(building, resourcesEarned) {
        document.getElementById('quiz-question').textContent =
            'You earned ' + resourcesEarned + ' ' + building.resource + '!';
        document.getElementById('quiz-options').style.display = 'none';
        document.getElementById('quiz-feedback').style.display = 'none';

        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.textContent = 'Back to Map';
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
            hideOverlay('quiz-overlay');
            document.getElementById('quiz-options').style.display = 'grid';
        };
    }
};
```

### Movement Handler (in map-renderer.js)
```js
document.addEventListener('keydown', function(e) {
    if (ScienceGame.App.isOverlayOpen()) return;  // don't move during overlays

    const moves = {
        'ArrowUp': { dx: 0, dy: -1 }, 'w': { dx: 0, dy: -1 }, 'W': { dx: 0, dy: -1 },
        'ArrowDown': { dx: 0, dy: 1 }, 's': { dx: 0, dy: 1 }, 'S': { dx: 0, dy: 1 },
        'ArrowLeft': { dx: -1, dy: 0 }, 'a': { dx: -1, dy: 0 }, 'A': { dx: -1, dy: 0 },
        'ArrowRight': { dx: 1, dy: 0 }, 'd': { dx: 1, dy: 0 }, 'D': { dx: 1, dy: 0 }
    };

    if (moves[e.key]) {
        e.preventDefault();
        const move = moves[e.key];
        ScienceGame.MapRenderer.movePlayer(move.dx, move.dy);
    }

    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        ScienceGame.MapRenderer.interact();
    }
});
```

### Map Rendering (in map-renderer.js)
```js
window.ScienceGame.MapRenderer = {
    render: function(profile) {
        const grid = document.getElementById('map-grid');
        grid.innerHTML = '';

        const mapData = ScienceGame.MapData.DEFAULT_MAP;

        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                const tile = document.createElement('div');
                let tileType = mapData[y][x];

                // Check if a town building is placed here
                const placedBuilding = profile.placedBuildings.find(b => b.x === x && b.y === y);
                if (placedBuilding) {
                    tileType = 5; // TOWN_BLDG
                    tile.classList.add('tile-town', 'town-' + placedBuilding.type);
                }

                tile.classList.add('tile', 'tile-' + tileType);
                tile.dataset.x = x;
                tile.dataset.y = y;

                // Add science building styling
                if (tileType === 4) {
                    const sciBuilding = ScienceGame.MapData.SCIENCE_BUILDINGS.find(b => b.x === x && b.y === y);
                    if (sciBuilding) {
                        tile.classList.add('science-' + sciBuilding.domain);
                        tile.title = sciBuilding.name;
                    }
                }

                grid.appendChild(tile);
            }
        }

        // Render player
        this.updatePlayerPosition(profile.playerPosition);
    },

    movePlayer: function(dx, dy) {
        const profile = ScienceGame.Profiles.getActive();
        const newX = profile.playerPosition.x + dx;
        const newY = profile.playerPosition.y + dy;

        // Boundary check
        if (newX < 0 || newX > 15 || newY < 0 || newY > 15) return;

        // Collision check
        if (!this.isWalkable(newX, newY, profile)) return;

        profile.playerPosition.x = newX;
        profile.playerPosition.y = newY;
        ScienceGame.Profiles.save();
        this.updatePlayerPosition(profile.playerPosition);
        this.checkAdjacentBuildings(profile);
    },

    isWalkable: function(x, y, profile) {
        const tileType = ScienceGame.MapData.DEFAULT_MAP[y][x];
        // GRASS (0) and PATH (1) are walkable
        if (tileType === 0 || tileType === 1) {
            // Also check for player-placed town buildings
            const hasBuilding = profile.placedBuildings.some(b => b.x === x && b.y === y);
            return !hasBuilding;
        }
        return false;
    },

    updatePlayerPosition: function(pos) {
        const player = document.getElementById('player');
        player.style.gridColumn = (pos.x + 1);
        player.style.gridRow = (pos.y + 1);
    },

    checkAdjacentBuildings: function(profile) {
        const pos = profile.playerPosition;
        const adjacent = [
            { x: pos.x, y: pos.y - 1 },
            { x: pos.x, y: pos.y + 1 },
            { x: pos.x - 1, y: pos.y },
            { x: pos.x + 1, y: pos.y }
        ];

        let nearBuilding = null;
        for (const adj of adjacent) {
            if (adj.x < 0 || adj.x > 15 || adj.y < 0 || adj.y > 15) continue;
            const building = ScienceGame.MapData.SCIENCE_BUILDINGS.find(b => b.x === adj.x && b.y === adj.y);
            if (building) {
                nearBuilding = building;
                break;
            }
        }

        const prompt = document.getElementById('interact-prompt');
        if (nearBuilding) {
            prompt.textContent = 'Press Space to enter ' + nearBuilding.name;
            prompt.style.display = 'block';
            this.adjacentBuilding = nearBuilding;
        } else {
            prompt.style.display = 'none';
            this.adjacentBuilding = null;
        }
    },

    interact: function() {
        if (this.adjacentBuilding) {
            const profile = ScienceGame.Profiles.getActive();
            ScienceGame.Sound.play('interact');
            ScienceGame.QuizEngine.startQuiz(this.adjacentBuilding, profile);
        }
    }
};
```

### Build Mode Logic (in app.js / buildings.js)
```js
// When player selects a building to build from the overlay
function enterPlacementMode(buildingType) {
    hideOverlay('build-overlay');
    ScienceGame.App.placementMode = buildingType;

    // Highlight valid tiles
    const profile = ScienceGame.Profiles.getActive();
    document.querySelectorAll('.tile').forEach(tile => {
        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        if (ScienceGame.MapRenderer.isWalkable(x, y, profile) &&
            !(x === profile.playerPosition.x && y === profile.playerPosition.y)) {
            tile.classList.add('tile-placeable');
            tile.onclick = () => placeBuilding(buildingType, x, y);
        }
    });

    // Escape to cancel
    document.addEventListener('keydown', cancelPlacement);
}

function placeBuilding(type, x, y) {
    const profile = ScienceGame.Profiles.getActive();
    const building = ScienceGame.Buildings.CATALOG.find(b => b.type === type);

    // Deduct resources
    ScienceGame.Buildings.deductCost(type, profile.resources);

    // Add placed building
    profile.placedBuildings.push({ type: type, x: x, y: y });

    // Check for level up
    const oldLevel = profile.townLevel;
    const newLevelInfo = ScienceGame.Progression.calculateLevel(profile.placedBuildings.length);
    profile.townLevel = newLevelInfo.level;

    ScienceGame.Profiles.save();
    ScienceGame.MapRenderer.render(profile);
    ScienceGame.App.updateHUD();
    ScienceGame.Sound.play('build');
    exitPlacementMode();

    // Trigger level-up if applicable
    if (ScienceGame.Progression.checkLevelUp(oldLevel, newLevelInfo.level)) {
        showLevelUpNotification(newLevelInfo.name);
    }
}

function exitPlacementMode() {
    ScienceGame.App.placementMode = null;
    document.querySelectorAll('.tile-placeable').forEach(tile => {
        tile.classList.remove('tile-placeable');
        tile.onclick = null;
    });
    document.removeEventListener('keydown', cancelPlacement);
}

function cancelPlacement(e) {
    if (e.key === 'Escape') {
        exitPlacementMode();
    }
}
```

### HUD Update (in app.js)
```js
function updateHUD() {
    const profile = ScienceGame.Profiles.getActive();
    if (!profile) return;

    document.getElementById('hud-profile-name').textContent = profile.name;
    document.getElementById('hud-grade-badge').textContent = profile.grade;
    document.getElementById('resource-stone').textContent = profile.resources.stone;
    document.getElementById('resource-wood').textContent = profile.resources.wood;
    document.getElementById('resource-glass').textContent = profile.resources.glass;
    document.getElementById('resource-energy').textContent = profile.resources.energy;
    document.getElementById('resource-metal').textContent = profile.resources.metal;

    const levelInfo = ScienceGame.Progression.calculateLevel(profile.placedBuildings.length);
    document.getElementById('town-level-display').textContent = levelInfo.name;
}
```

---

## Responsive Design

- Max-width container: `900px`, centered
- **Map scaling:**
  - Desktop (900px+): tiles `40px`, grid `640px` total
  - Tablet (768px): tiles `28px`, grid `448px` total
  - Phone (480px): tiles `22px`, grid `352px` total
- Below `768px` width: D-pad becomes visible, HUD stacks into two rows
- Below `480px` width: HUD resources show abbreviated labels (icons only, no text), font sizes reduce slightly
- Build overlay: below 768px, becomes full-width bottom sheet instead of side panel
- Quiz overlay: always centered modal, min-width `300px`, max-width `600px`
- All interactive elements: minimum `44px` touch target size
- D-pad buttons: `48px` touch targets with clear spacing

---

## CSS Animation Details

### Player Movement
```css
#player {
    transition: grid-column 0.15s ease, grid-row 0.15s ease;
}
```

### Building Placement
```css
.tile-town {
    animation: buildingPlace 0.3s ease-out;
}

@keyframes buildingPlace {
    from { transform: scale(0); }
    to { transform: scale(1); }
}
```

### Placeable Tile Highlight
```css
.tile-placeable {
    animation: placeablePulse 1s ease-in-out infinite;
    cursor: pointer;
}

@keyframes placeablePulse {
    0%, 100% { box-shadow: inset 0 0 0 2px rgba(76, 175, 80, 0.4); }
    50% { box-shadow: inset 0 0 0 3px rgba(76, 175, 80, 0.8); }
}
```

### Water Tile Shimmer
```css
.tile-water {
    animation: waterShimmer 3s ease-in-out infinite;
}

@keyframes waterShimmer {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 1; }
}
```

### Quiz Feedback Flash
```css
.quiz-option-correct {
    background-color: #4CAF50 !important;
    color: white !important;
    animation: correctPulse 0.5s ease;
}

.quiz-option-wrong {
    background-color: #F44336 !important;
    color: white !important;
    animation: wrongShake 0.5s ease;
}

@keyframes correctPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes wrongShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
```

### Level-Up Notification
```css
.level-up-notification {
    animation: levelUpAppear 0.5s ease-out, levelUpFade 0.5s ease-in 2.5s;
}

@keyframes levelUpAppear {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

@keyframes levelUpFade {
    from { opacity: 1; }
    to { opacity: 0; }
}
```

---

## Verification Checklist

After building, manually test:

### Basic Functionality
- [ ] Opens with no console errors via `file://` protocol
- [ ] All 11 JS files load without errors (check console)
- [ ] `window.ScienceGame` namespace exists with all expected modules
- [ ] CSS renders correctly — teal theme, no broken layouts

### Profile System
- [ ] Create profile with name + grade → appears in list → survives page refresh
- [ ] Grade dropdown offers K-2, 3-5, 6-8 options
- [ ] Create second profile, switch between them, delete one
- [ ] Empty profile name is rejected
- [ ] Profile shows correct town level and building count
- [ ] Deleting a profile removes all its data from localStorage
- [ ] Profile resources persist across page refreshes

### Map Rendering
- [ ] 16x16 grid renders correctly with all tile types visible
- [ ] GRASS tiles are green, PATH tiles are tan, WATER tiles are blue
- [ ] TREE tiles show tree visual, BLOCKED tiles show rocky visual
- [ ] 5 science buildings render at correct positions with domain-specific styling
- [ ] Player character renders at center (8,8) on new profile
- [ ] Map scales correctly at 1024px, 768px, and 375px widths

### Player Movement
- [ ] Arrow keys move player one tile at a time
- [ ] WASD keys move player one tile at a time
- [ ] Player cannot walk through WATER tiles
- [ ] Player cannot walk through TREE tiles
- [ ] Player cannot walk through SCIENCE_BLDG tiles
- [ ] Player cannot walk through BLOCKED tiles
- [ ] Player cannot walk through placed TOWN_BLDG tiles
- [ ] Player cannot move outside the 16x16 grid boundaries
- [ ] Movement has smooth 0.15s CSS transition
- [ ] Player position saves to localStorage on every move
- [ ] Player position is restored from localStorage on page reload

### Mobile D-Pad
- [ ] D-pad appears on screens below 768px width
- [ ] D-pad hidden on screens above 768px width
- [ ] All 4 directional buttons work correctly
- [ ] Interact button works when adjacent to a science building
- [ ] D-pad buttons have 48px minimum touch targets
- [ ] D-pad does not overlap with map or HUD

### Science Building Interaction
- [ ] Interaction prompt appears when player is adjacent to a science building
- [ ] Prompt shows correct building name
- [ ] Pressing Space opens Quiz Overlay
- [ ] Mobile interact button opens Quiz Overlay
- [ ] Prompt disappears when player moves away from building
- [ ] Prompt does not appear for diagonal adjacency (only cardinal directions)

### Quiz System
- [ ] Quiz Overlay renders correctly over the map
- [ ] Building name and progress counter display correctly
- [ ] 4 questions are presented per visit
- [ ] Questions come from the correct domain for the building visited
- [ ] Questions match the profile's grade band
- [ ] Questions are randomized (different order on different visits)
- [ ] No duplicate questions within a single visit

### Quiz Answers — Correct
- [ ] Clicking the correct answer turns it green
- [ ] "+1 [resource]!" feedback appears
- [ ] Resource counter in HUD increments by 1
- [ ] Correct sound plays
- [ ] Question progresses after brief pause

### Quiz Answers — Wrong
- [ ] Clicking the wrong answer turns it red
- [ ] Correct answer highlights green
- [ ] Explanation text from the question appears
- [ ] Wrong sound plays
- [ ] No resource awarded
- [ ] Question progresses after longer pause (time to read explanation)
- [ ] Quiz continues (no life/heart penalty)

### Quiz Completion
- [ ] After 4 questions, summary shows total resources earned
- [ ] "Back to Map" button closes the overlay and returns to map
- [ ] Player can immediately revisit the same building for more questions
- [ ] Question statistics are saved to profile (total, correct, byDomain)

### Question Content Integrity
- [ ] K-2 questions have 10 per domain (50 total in questions-k2.js)
- [ ] 3-5 questions have 10 per domain (50 total in questions-35.js)
- [ ] 6-8 questions have 10 per domain (50 total in questions-68.js)
- [ ] Every question has a valid `correctIndex` pointing to the actual correct answer
- [ ] Every question has a meaningful `explanation` for wrong answers
- [ ] K-2 questions are age-appropriate (simple, concrete, observable)
- [ ] 3-5 questions are age-appropriate (systems, processes, cause/effect)
- [ ] 6-8 questions are age-appropriate (models, mechanisms, quantitative)
- [ ] No duplicate questions within a domain + grade combination

### Town Buildings
- [ ] Build button opens Build Overlay
- [ ] Build Overlay shows all 6 building types
- [ ] Unlocked buildings show "Build" button when affordable
- [ ] Locked buildings show "Locked" badge with requirement tooltip
- [ ] Unaffordable buildings have disabled "Build" button
- [ ] House, Garden, School available from start (unlockAt: 0)
- [ ] Hospital, Library unlock after 3 buildings placed
- [ ] Park unlocks after 5 buildings placed
- [ ] Resource costs are displayed correctly for each building

### Build Mode — Placement
- [ ] Selecting a building from the overlay closes overlay and enters placement mode
- [ ] Valid GRASS tiles highlight green with pulsing animation
- [ ] Clicking a highlighted tile places the building
- [ ] Building appears with scale-in animation (0 → 1 over 0.3s)
- [ ] Build sound plays on placement
- [ ] Resources are deducted from profile
- [ ] Placed building appears on the map
- [ ] Placed building blocks player movement
- [ ] Cannot place on player's current tile
- [ ] Cannot place on non-GRASS tiles
- [ ] Cannot place on tiles occupied by existing buildings
- [ ] Pressing Escape cancels placement mode
- [ ] Multiple buildings of same type can be placed
- [ ] Placed buildings persist across page refreshes

### Town Progression
- [ ] Town level starts at "Village" with 0 buildings
- [ ] Placing 3rd building triggers level-up to "Town"
- [ ] Placing 5th building triggers level-up to "City"
- [ ] Level-up notification appears with celebration message
- [ ] Level-up notification auto-dismisses after 3 seconds
- [ ] Town level display in HUD updates correctly
- [ ] Newly unlocked buildings become available in Build Overlay

### HUD
- [ ] Profile name displays correctly
- [ ] Grade badge displays correctly
- [ ] All 5 resource counters display correct values
- [ ] Town level name displays correctly
- [ ] Resource counters update in real-time when resources are earned
- [ ] Resource counters update when resources are spent on buildings
- [ ] "Change Profile" button returns to Profile Select

### Sound System
- [ ] Correct answer plays chime
- [ ] Wrong answer plays buzz
- [ ] Building placement plays build sound
- [ ] Resource earned plays collect sound
- [ ] Level up plays ascending arpeggio
- [ ] Sound toggle button works (mutes/unmutes)
- [ ] Sound preference persists in localStorage
- [ ] No audio errors in console

### Navigation
- [ ] "Back to Launcher" link works (goes to `../index.html`)
- [ ] "Change Profile" returns to Profile Select
- [ ] Quiz Overlay can be completed and dismissed
- [ ] Build Overlay can be opened and closed
- [ ] Escape closes overlays / cancels placement mode
- [ ] No screen is unreachable from any state
- [ ] Refresh mid-game: profile data preserved, returns to profile select (acceptable)
- [ ] Keyboard input is disabled during overlays (player doesn't move)

### Responsive Design
- [ ] Renders correctly at 1024px width (desktop)
- [ ] Renders correctly at 768px width (tablet)
- [ ] Renders correctly at 375px width (phone)
- [ ] Map tiles scale appropriately at each breakpoint
- [ ] D-pad appears/disappears at correct breakpoint
- [ ] Build overlay becomes bottom sheet on mobile
- [ ] Quiz overlay remains centered and readable at all sizes
- [ ] All interactive elements have adequate touch target size (44px+)
- [ ] HUD does not overflow or overlap map at any width
