# Keychron Q1 / Keyboardio Model 100 — Layout Reference (Simlayer Edition)

Enabled on the Keychron Q1, the Keyboardio Model 100, and the Apple Magic Keyboard. In Ghostty, `D + F`, `J + K`, `K + L`, `S + D/F/J/K`, and the approved `R` coding symbols remain enabled.

All triggers are letter-first simlayers unless noted otherwise.

## How simlayers work

Press the trigger key first, keep it held, then press the target key.

- Standard simlayer threshold: `50ms`
- Base home-row combos use `70ms`

If you tap the trigger key alone, it types the normal letter.

## Base combos (order-insensitive, 70ms)

- `J + K` -> `Space`
- `D + F` -> `Backspace`
- `K + L` -> `Enter`
- `F + G` -> `Escape`

Chat-app exception:

- `K + L` is blocked in Beeper, WhatsApp, Signal, and Codex.

## Caps Lock

- Tap `Caps Lock` -> `Escape`
- Hold `Caps Lock` -> `Command`
- `Left Shift + Caps Lock` -> real Caps Lock toggle
- `Right Shift + Caps Lock` -> real Caps Lock toggle

## Simlayer: S = Navigation Kernel

Navigation and editing live here.

| Key | Output |
|---|---|
| `S + D` | Left arrow |
| `S + F` | Up arrow |
| `S + J` | Down arrow |
| `S + K` | Right arrow |
| `S + R` | Shift + Tab |
| `S + U` | Cmd + Z (Undo) |
| `S + I` | Cmd + Shift + Z (Redo) |
| `S + C` | Cmd + C (Copy) |
| `S + V` | Cmd + V (Paste) |
| `S + B` | Cmd + X (Cut) |
| `S + A` | Cmd + Left (line start) |
| `S + Q` | Cmd + Right (line end) |
| `S + H` | Option + Left (move one word left) |
| `S + L` | Option + Right (move one word right) |
| `S + ,` | Option + Shift + Left (select word left) |
| `S + .` | Option + Shift + Right (select word right) |
| `S + /` | Cmd + Shift + Left (select to line start) |
| `S + Return` | Cmd + Shift + Right (select to line end) |
| `S + N` | Select current word (Opt+Left, then Opt+Shift+Right) |
| `S + M` | Select current line (Cmd+Left, then Cmd+Shift+Right) |
| `S + ;` | Cmd + Backspace (delete to line start) |
| `S + '` | Forward Delete |
| `S + G` | Shift + Enter |
| `S + Y` | Home |
| `S + T` | Page Up |
| `S + O` | Page Down |
| `S + P` | End |
| `S + Space` | Cmd + Space (launcher) |

## Simlayer: R = Symbols + F-keys

Symbols moved out of `S` to keep navigation clean.

### Symbols

| Key | Output |
|---|---|
| `R + J` | `(` |
| `R + K` | `)` |
| `R + U` | `[` |
| `R + I` | `]` |
| `R + O` | `{` |
| `R + P` | `}` |
| `R + N` | `<` |
| `R + M` | `>` |
| `R + H` | `` ` `` |
| `R + ,` | `\` |
| `R + .` | `|` |
| `R + L` | `-` |
| `R + ;` | `–` (en dash) |
| `R + '` | `—` (em dash) |

### F-keys

| Key | Output | Key | Output |
|---|---|---|---|
| `R + 1` | F1 | `R + 7` | F7 |
| `R + 2` | F2 | `R + 8` | F8 |
| `R + 3` | F3 | `R + 9` | F9 |
| `R + 4` | F4 | `R + 0` | F10 |
| `R + 5` | F5 | `R + -` | F11 |
| `R + 6` | F6 | `R + =` | F12 |

## Simlayer: E = Cmd

`E + key` is mostly a `Cmd + key` layer, with a few custom remaps and blocked chords to reduce collisions during normal typing.

Browser exception:

- `E + D` is blocked in Safari, Chrome, Arc, Brave, and Firefox.
- `E + N` is blocked in Safari, Chrome, Arc, Brave, Firefox, and Scrivener.

Common examples:

- `E + U` -> Select all
- `E + A` -> blocked
- `E + M` -> blocked
- `E + R` -> blocked
- `E + W` -> blocked
- `E + C` -> Copy
- `E + V` -> Paste
- `E + X` -> Cut
- `E + S` -> Save
- `E + F` -> Find
- `E + L` -> Focus URL bar
- `E + W` -> Close tab
- `E + Tab` -> App switcher (one-shot)

## Simlayer: Q = Cmd+Shift

`Q + key` -> `Cmd + Shift + key` passthrough layer.

Common examples:

- `Q + P` -> Command palette
- `Q + F` -> Global find
- `Q + U` -> Underline / `Cmd + U`
- `Q + Z` -> Redo

## Simlayer: Z = Ctrl

`Z + key` -> `Ctrl + key` passthrough layer.

Common examples:

- `Z + C` -> interrupt process
- `Z + D` -> EOF
- `Z + L` -> clear terminal

## Simlayer: W = Focused Cmd+Option Arrows

This layer is intentionally trimmed.

- `W + D` -> `Cmd + Option + Left`
- `W + F` -> `Cmd + Option + Up`
- `W + J` -> `Cmd + Option + Down`
- `W + K` -> `Cmd + Option + Right`

## Simlayer: C = Focused Option

This layer is additive, not a general passthrough.

- `C + D` -> `Option + D`

## Simlayer: X = Focused Ctrl+Cmd

This layer is intentionally trimmed.

- `X + F` -> `Ctrl + Cmd + F` (fullscreen)
- `X + Space` -> `Ctrl + Cmd + Space` (emoji picker)
- `X + J` -> `Ctrl + Left` (desktop left)
- `X + K` -> `Ctrl + Right` (desktop right)

## Future Option

If needed later, we can add sticky one-shot behavior for `Shift` or `Cmd` using Karabiner `to.sticky_modifier`.

## Quick reminders

- If a shortcut is command-like, check `E` first.
- `S` is for navigation and editing.
- `R` is symbols and F-keys.
- Desktop switching moved to `X + J/K`.
- For real app-switcher hold behavior, use Hold `Caps` + `Tab`.
