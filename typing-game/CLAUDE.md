# Typing Game

A word-typing game for kids with character-by-character feedback and WPM tracking. Part of the `kid-games` suite but fully self-contained — no shared dependencies.

## Tech Stack

- Vanilla HTML + CSS + JS — no frameworks, no build tools, no npm
- Must work when opened via `file://` protocol (double-click `index.html`)
- Three files only: `index.html`, `style.css`, `app.js`

## Color Scheme

- Primary: `#2196F3` (blue)
- Background: `#E3F2FD`
- Text on primary: white
- Correct character: `#4CAF50` green
- Incorrect character: `#F44336` red
- Pending character: `#9E9E9E` gray

## UI Conventions

- Base font: `24px`, `'Segoe UI', system-ui, sans-serif`
- Buttons: min `60px` height, `16px` padding, `12px` border-radius, bold
- Max-width container: `800px`, centered
- Word display: large monospace font (`'Courier New', monospace`), ~48px
- Kid-friendly: large text, bright colors, minimal reading required

---

## Profile System

### Storage
- localStorage key: `typingGame`
- Loaded/saved as a single JSON object

### Profile Object
```json
{
  "id": "...",
  "name": "Alice",
  "stats": {
    "homeRow":      { "bestWpm": 0, "bestAccuracy": 0, "sessions": 0 },
    "fullKeyboard": { "bestWpm": 0, "bestAccuracy": 0, "sessions": 0 }
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
Profile Select → Level Select → Typing Screen (includes inline results after 5 words)
```

### Screen 1: Profile Select
- List of profile buttons (name on each)
- Clicking a profile selects it and navigates to Level Select
- Inline input field + "Create Profile" button at bottom
- Each profile has a small "X" / delete button
- "Back to Launcher" link at top → `../index.html`

### Screen 2: Level Select
- Header showing active profile name
- Two large buttons:
  - **Home Row** — shows best WPM and best accuracy if any sessions played
  - **Full Keyboard** — shows best WPM and best accuracy if any sessions played
- "Change Profile" button to go back to Profile Select

### Screen 3: Typing Screen
- Current word displayed in large monospace text
- Each character is a separate `<span>` element with a class: `pending`, `correct`, or `incorrect`
- Word counter: "Word 2 of 5"
- The cursor position is indicated by underlining or highlighting the current pending character
- After typing all characters of a word correctly (or incorrectly), brief pause (~500ms) then auto-advance to next word
- **After all 5 words:** show inline results on the same screen:
  - WPM
  - Accuracy percentage
  - "New personal best!" if applicable
  - "Play Again" button (same level)
  - "Back to Levels" button

---

## Game Mechanic: Word Typing

### Session Structure
- 5 words per session
- Words are randomly selected from the level's word list (no repeats within a session)
- Timer starts when the first keypress of the first word is detected
- Timer stops when the last character of the last word is typed

### Input Handling
- Listen to `keydown` events on `document` (NOT on an input field — avoids autocomplete, IME, and mobile keyboard issues)
- Only process single printable characters (letters, and only if they match expected)
- Ignore modifier keys (Shift, Ctrl, Alt, etc.)
- All target text is **lowercase** — avoids Shift key complexity
- Backspace: allow it to go back one character (undo the last typed character, reverting its span to `pending`)

### Character-by-Character Feedback
- Each character of the current word is rendered as a `<span>`
- Initial state: all spans have class `pending` (gray text)
- When the kid types the correct character: span gets class `correct` (green text)
- When the kid types the wrong character: span gets class `incorrect` (red text/red background)
- Move to next character regardless of whether it was correct or incorrect
- After the last character of a word is typed, that word is done

### WPM Calculation
```
WPM = (totalCharactersTyped / 5) / elapsedMinutes
```
- `totalCharactersTyped` = sum of all characters across all 5 words (including spaces between words if you count them — for simplicity, just count the word characters)
- `elapsedMinutes` = (endTime - startTime) / 60000
- Round to nearest integer

### Accuracy Calculation
```
Accuracy = (correctCharacters / totalCharactersTyped) * 100
```
- Round to nearest integer
- A character is "correct" if the kid typed the right key on the first attempt at that position

### Personal Best
- Update `bestWpm` only if the new WPM is higher
- Update `bestAccuracy` only if the new accuracy is higher
- Increment `sessions` count every time a session completes

---

## Word Lists

### Home Row Level
Only uses letters from the home row: A, S, D, F, G, H, J, K, L.

Words (all lowercase):
```
dad, sad, lad, ash, dash, gash, lash, hash, flask, shall, salad, glass, falls, flash, glad, flag, half, add, lass, fall
```

### Full Keyboard Level
Common short-to-medium words:
```
the, cat, dog, run, jump, play, book, tree, fish, bird, happy, water, green, house, table, chair, light, music, river, cloud, pencil, orange, purple, window, garden
```

### Word Selection
- For each session, randomly pick 5 unique words from the level's word list
- Use Fisher-Yates shuffle or equivalent to avoid bias

---

## Key Implementation Details

### Keydown Listener
```js
document.addEventListener('keydown', (e) => {
  // Ignore modifier-only keys
  if (e.key.length !== 1) {
    if (e.key === 'Backspace') { /* handle backspace */ }
    return;
  }
  // Ignore if Ctrl/Alt held (browser shortcuts)
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  // Prevent default to stop the page from scrolling, etc.
  e.preventDefault();

  const typed = e.key.toLowerCase();
  // ... compare to expected character, update span class
});
```

### Preventing Page Interactions
During active typing, `e.preventDefault()` on keydown to prevent spacebar from scrolling, etc.

### Timing
- Don't start the timer until the kid presses the first key
- This avoids penalizing kids who take time to read the word before typing

---

## Verification Checklist

After building, manually test:

- [ ] Opens with no console errors via `file://` protocol
- [ ] Create profile → name appears → survives page refresh
- [ ] Create second profile, switch between them, delete one
- [ ] Empty profile name is rejected
- [ ] Select Home Row level → 5 random words from home row list appear one at a time
- [ ] Characters turn green when typed correctly
- [ ] Characters turn red when typed incorrectly
- [ ] Backspace undoes the last character (reverts to pending)
- [ ] After 5 words, results show WPM and accuracy
- [ ] WPM is reasonable (~10-40 range for normal typing)
- [ ] Accuracy is calculated correctly (test by deliberately mistyping some)
- [ ] Personal best updates only when actually beaten
- [ ] Sessions counter increments each time
- [ ] Full Keyboard level uses the correct word list
- [ ] No words repeat within a single 5-word session
- [ ] Timer doesn't start until first keypress
- [ ] Modifier keys (Shift, Ctrl, etc.) don't register as typed characters
- [ ] "Back to Launcher" link works (goes to `../index.html`)
- [ ] Refresh mid-game: profile data preserved, game resets to profile select (acceptable for MVP)
