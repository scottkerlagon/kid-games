# Math Game

A multiple-choice math game for kids covering grades K through 8. Part of the `kid-games` suite but fully self-contained — no shared dependencies.

## Tech Stack

- Vanilla HTML + CSS + JS — no frameworks, no build tools, no npm
- Must work when opened via `file://` protocol (double-click `index.html`)
- Three files only: `index.html`, `style.css`, `app.js`

## Color Scheme

- Primary: `#4CAF50` (green)
- Background: `#E8F5E9`
- Text on primary: white
- Correct feedback: `#4CAF50` green
- Incorrect feedback: `#F44336` red

## UI Conventions

- Base font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Max-width container: `800px`, centered
- Kid-friendly: large text, bright colors, minimal reading required

---

## Profile System

### Storage
- localStorage key: `mathGame`
- Loaded/saved as a single JSON object

### Profile Object
```json
{
  "id": "...",
  "name": "Bob",
  "stats": {
    "K":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "1":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "2":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "3":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "4":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "5":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "6":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "7":  { "attempted": 0, "correct": 0, "tier": "easy" },
    "8":  { "attempted": 0, "correct": 0, "tier": "easy" }
  }
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
Profile Select → Grade Select → Game Screen → Results → (Grade Select or Play Again)
```

### Screen 1: Profile Select
- List of profile buttons (name on each)
- Clicking a profile selects it and navigates to Grade Select
- Inline input field + "Create Profile" button at bottom
- Each profile has a small "X" / delete button
- "Back to Launcher" link at top → `../index.html`

### Screen 2: Grade Select
- Header showing active profile name
- 3×3 grid of buttons: K, 1, 2, 3, 4, 5, 6, 7, 8
- Each button shows the grade number and the stats: `attempted / correct`
- Also show current tier (easy/hard) as a small badge
- "Change Profile" button to go back to Profile Select

### Screen 3: Game Screen
- Header: grade label + question counter ("Question 3 of 10")
- Large question text (e.g., "5 + 3 = ?")
- 2×2 grid of answer buttons
- Score counter in corner
- Clicking an answer: immediately color it green (correct) or red (wrong), disable all buttons, auto-advance after 1 second
- "Quit" button to return to Grade Select (mid-session progress is NOT saved)

### Screen 4: Results
- "X out of 10 correct!" in large text
- "Play Again" button (same grade, same tier)
- "Back to Grades" button
- Stats are saved to the profile when this screen is shown

---

## Game Mechanic: Multiple Choice

- 10 questions per session
- 4 answer choices per question (one correct, three distractors)
- Immediate feedback: correct answer turns green, wrong answer turns red (and correct answer also highlights green)
- 1-second delay, then auto-advance to next question
- After question 10, navigate to Results screen

---

## Grades K-8: Question Generation

Each grade has a single core skill. Questions are generated randomly based on the grade and current difficulty tier.

| Grade | Skill | Operation | Easy Range | Hard Range |
|-------|-------|-----------|------------|------------|
| K | Addition | `a + b` | a,b: 0-5 | a,b: 0-10 |
| 1 | Addition | `a + b` | a,b: 0-10 | a,b: 0-20 |
| 2 | Subtraction | `a - b` (a ≥ b) | a,b: 0-10 | a,b: 0-20 |
| 3 | Multiplication | `a × b` | a,b: 0-5 | a,b: 0-10 |
| 4 | Division | `a ÷ b` (exact, b≠0) | a: product of 0-5, b: 1-5 | a: product of 0-10, b: 1-10 |
| 5 | Fractions (add, like denom) | `a/d + b/d` | d: 2-6, a,b: 1-d | d: 2-12, a,b: 1-d |
| 6 | Decimals (add) | `a.x + b.y` | 1 decimal place | 2 decimal places |
| 7 | Integers (add/sub negatives) | `a + b` or `a - b` with negatives | a,b: -10 to 10 | a,b: -50 to 50 |
| 8 | Linear equations | `x + a = b` (easy) / `ax + b = c` (hard) | 1-step, small numbers | 2-step, larger numbers |

### Division (Grade 4) Detail
Generate `b` first (1-5 easy, 1-10 hard), then generate a multiplier `m` in the same range, then `a = b * m`. The answer is `m`. This ensures clean division.

### Fractions (Grade 5) Detail
Display as `a/d + b/d = ?` and the answer is `(a+b)/d`. Display answer as a fraction string. If the result simplifies, accept both forms or just show the unsimplified form for MVP.

### Decimals (Grade 6) Detail
- Easy: generate two numbers with 1 decimal place (e.g., `3.4 + 2.1`)
- Hard: generate two numbers with 2 decimal places (e.g., `3.45 + 2.17`)
- Use `toFixed()` to avoid floating-point display issues. Round the answer.

### Linear Equations (Grade 8) Detail
- Easy (1-step): generate `a` and answer `x`, compute `b = x + a`. Display `x + ${a} = ${b}`.
- Hard (2-step): generate `a`, `b`, and answer `x`, compute `c = a*x + b`. Display `${a}x + ${b} = ${c}`.

---

## Distractor Generation

For each question, generate 3 wrong answers:

1. Start with the correct answer
2. Generate offsets: `correct ± random(1, 5)` — try different random offsets until you have 3 unique distractors that are:
   - Not equal to the correct answer
   - Not equal to each other
   - Not negative (for grades K-4)
3. For fraction questions (grade 5): distractors are other fraction strings with same denominator but wrong numerator
4. Shuffle all 4 options randomly before displaying

---

## Difficulty Tiers

- Two tiers: `easy` and `hard`
- A profile starts at `easy` for every grade
- **Promote to `hard`:** when the profile accumulates 10 correct answers at the `easy` tier for that grade
- Tier is stored per-grade in the profile stats
- Tier never demotes back to easy (MVP simplicity)
- Track a running `correctAtCurrentTier` count, or simply: if `tier === "easy"` and `correct >= 10`, set tier to `"hard"`

Actually, simpler approach: just use the overall `correct` count. If `tier === "easy"` and `correct >= 10`, promote. Since tier never demotes, this works.

---

## Verification Checklist

After building, manually test:

- [ ] Opens with no console errors via `file://` protocol
- [ ] Create profile → name appears → survives page refresh
- [ ] Create second profile, switch between them, delete one
- [ ] Empty profile name is rejected
- [ ] Play a full 10-question session at grade K easy
- [ ] Correct answer turns green, wrong turns red + correct also highlights
- [ ] 1-second delay between questions works
- [ ] Results screen shows correct count
- [ ] Stats update in localStorage (check DevTools > Application > Local Storage)
- [ ] Play 10+ correct at easy → tier promotes to hard
- [ ] Hard questions use the larger number ranges
- [ ] Distractors are never equal to correct answer
- [ ] Distractors are never negative for grades K-4
- [ ] Grade 4 division always produces whole number answers
- [ ] Grade 5 fractions display properly as `a/d`
- [ ] Grade 6 decimals don't show floating-point artifacts
- [ ] Grade 8 equations display properly
- [ ] "Back to Launcher" link works (goes to `../index.html`)
- [ ] Refresh mid-game: profile data preserved, game resets to profile select (acceptable for MVP)
