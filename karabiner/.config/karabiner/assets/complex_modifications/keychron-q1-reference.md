# Keychron Q1 — Model 100 Hacker Layout Reference (Simlayer Edition)

All layer triggers are **letter keys** — fully portable to the Keyboardio Model 100.

---

## How simlayers work

Press the **trigger letter first**, then the target key within **80 ms** while
the trigger is still held down. If you tap the trigger alone (or release it
before pressing a second key), it types the normal letter.

> **Example:** E → C (press E, hold it, press C) → Cmd+C (Copy)
> **Typing normally:** press and release E → types "e"

---

## Combos (home row, order-insensitive, 70 ms)

Press both keys simultaneously within 70 ms.

```
Left hand:                    Right hand:
  D + F  = Backspace            H + J  = Tab
  F + G  = Escape               J + K  = Space
                                K + L  = Enter
```

Right-hand chain: **H+J=Tab → J+K=Space → K+L=Enter**

---

## Caps Lock key

| Action | Result |
|--------|--------|
| Tap alone | Escape |
| Left Shift + Caps Lock | Toggle real Caps Lock |
| Right Shift + Caps Lock | Toggle real Caps Lock |

---

## Simlayer: S = Navigation

Hold **S** first, then press the target key.

### Arrows (Vimium-style)

| S + | Output |
|-----|--------|
| D | ← Left arrow |
| F | ↑ Up arrow |
| J | ↓ Down arrow |
| K | → Right arrow |
| A | Cmd+← (line start) |
| Q | Cmd+→ (line end) |

### Brackets & Symbols

| S + | Output | S + | Output |
|-----|--------|-----|--------|
| E | ( | R | ) |
| U | { | I | } |
| C | ] | W | \| |
| G | < | H | > |
| B | ` | V | \\ |

### Page Navigation

| S + | Output |
|-----|--------|
| Y | Home |
| T | Page Up |
| O | Page Down |
| P | End |

### Desktop Switching

| S + | Output |
|-----|--------|
| Z | Ctrl+← (desktop left) |
| X | Ctrl+→ (desktop right) |

### F-Keys (number row)

| S + | Output | S + | Output |
|-----|--------|-----|--------|
| 1 | F1 | 6 | F6 |
| 2 | F2 | 7 | F7 |
| 3 | F3 | 8 | F8 |
| 4 | F4 | 9 | F9 |
| 5 | F5 | 0 | F10 |
| - | F11 | = | F12 |

### Dashes

| S + | Output |
|-----|--------|
| L | - (hyphen) |
| ; | – (en dash) |
| ' | — (em dash) |

### Selection Macros

| S + | Output |
|-----|--------|
| , | Select to line start (Cmd+Shift+←) |
| . | Select word left (Opt+Shift+←) |
| / | Select word right (Opt+Shift+→) |
| Return | Select to line end (Cmd+Shift+→) |

### Media

| S + | Output |
|-----|--------|
| N | Mute |
| M | Volume down |

---

## Simlayer: E = Cmd

Hold **E** first, then press any key → **Cmd + that key**.

> **Cannot produce:** Cmd+E (self-reference). Remap Raycast emoji picker to
> a different shortcut (e.g. Cmd+Y or Cmd+;).

### Key examples

| E + | Output | Use |
|-----|--------|-----|
| A | Cmd+A | Select all |
| C | Cmd+C | Copy |
| V | Cmd+V | Paste |
| X | Cmd+X | Cut |
| S | Cmd+S | Save |
| Z | Cmd+Z | Undo |
| F | Cmd+F | Find |
| T | Cmd+T | New tab |
| W | Cmd+W | Close tab |
| Q | Cmd+Q | Quit |
| R | Cmd+R | Reload |
| N | Cmd+N | New window |
| [ | Cmd+[ | Back (browser) |
| ] | Cmd+] | Forward (browser) |
| Tab | Cmd+Tab | App switcher |
| Space | Cmd+Space | Spotlight |
| Return | Cmd+Return | (app-specific) |

---

## Simlayer: Q = Cmd+Shift

Hold **Q** first, then press any key → **Cmd+Shift + that key**.

> Q is the rarest letter (0.1% frequency) — near-zero misfire risk.

### Key examples

| Q + | Output | Use |
|-----|--------|-----|
| P | Cmd+Shift+P | VS Code command palette |
| F | Cmd+Shift+F | Global find |
| K | Cmd+Shift+K | Delete line (VS Code) |
| Z | Cmd+Shift+Z | Redo |
| T | Cmd+Shift+T | Reopen closed tab |
| N | Cmd+Shift+N | New window (incognito) |
| R | Cmd+Shift+R | Hard reload |

---

## Simlayer: A = Ctrl

Hold **A** first, then press any key → **Ctrl + that key**.

> **Cannot produce:** Ctrl+A (self-reference). Use S+A (Cmd+←) as a substitute
> for "go to line start" in most editors.

### Key examples

| A + | Output | Use |
|-----|--------|-----|
| C | Ctrl+C | Kill process (terminal) |
| D | Ctrl+D | EOF / logout (terminal) |
| L | Ctrl+L | Clear terminal |
| K | Ctrl+K | Kill to end of line (readline) |
| Z | Ctrl+Z | Suspend process |
| Tab | Ctrl+Tab | VS Code: next open file |

---

## Simlayer: W = Cmd+Option

Hold **W** first, then press any key → **Cmd+Option + that key**.

> **D/F/J/K** are overridden to output **Cmd+Option+Arrows** for tab/file switching.

### Arrow overrides (tab & file navigation)

| W + | Output | Use |
|-----|--------|-----|
| D | Cmd+Option+← | Browser: previous tab; VS Code: previous open file |
| K | Cmd+Option+→ | Browser: next tab; VS Code: next open file |
| F | Cmd+Option+↑ | (app-specific) |
| J | Cmd+Option+↓ | (app-specific) |

### Other key examples

| W + | Output | Use |
|-----|--------|-----|
| I | Cmd+Option+I | DevTools (browser) |
| H | Cmd+Option+H | Hide other windows |
| Esc | Cmd+Option+Esc | Force Quit dialog |

---

## Simlayer: X = Ctrl+Cmd

Hold **X** first, then press any key → **Ctrl+Cmd + that key**.

> X is 0.15% frequency — very low misfire risk.

### Key examples

| X + | Output | Use |
|-----|--------|-----|
| F | Ctrl+Cmd+F | Toggle fullscreen |
| Space | Ctrl+Cmd+Space | Emoji picker (macOS) |

---

## Examples

### Common editing operations

| Task | Keys |
|------|------|
| Copy | E → C |
| Paste | E → V |
| Cut | E → X |
| Undo | E → Z |
| Redo | Q → Z |
| Save | E → S |
| Select all | E → A |
| Find | E → F |

### Navigation

| Task | Keys |
|------|------|
| Move left/right | S → D / S → K |
| Move up/down | S → F / S → J |
| Line start/end | S → A / S → Q |
| Select word left | S → . |
| Select word right | S → / |
| Select to line start | S → , |
| Select to line end | S → Return |
| Page up/down | S → T / S → O |
| Home/End | S → Y / S → P |

### App & Tab operations

| Task | Keys |
|------|------|
| New tab | E → T |
| Close tab | E → W |
| Reopen closed tab | Q → T |
| Previous tab (browser) | W → D |
| Next tab (browser) | W → K |
| App switcher | E → Tab |
| Quit app | E → Q |
| Spotlight | E → Space |

### VS Code

| Task | Keys |
|------|------|
| Command palette | Q → P |
| Global find | Q → F |
| Delete line | Q → K |
| Next open file | W → K |
| Previous open file | W → D |
| Switch file (history) | A → Tab |

### Terminal

| Task | Keys |
|------|------|
| Kill process | A → C |
| Clear screen | A → L |
| EOF / logout | A → D |
| Suspend | A → Z |

### Brackets (in S simlayer)

| Task | Keys |
|------|------|
| ( ) | S → E / S → R |
| { } | S → U / S → I |
| [ ] | [ = physical key; ] = S → C |
| < > | S → G / S → H |
| ` | S → B |
| \| | S → W |
