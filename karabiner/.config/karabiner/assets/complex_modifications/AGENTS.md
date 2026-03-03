# Instructions for Claude

This folder contains three files that must always be kept in sync:

- `keychron-q1-model100-layout.json` — Karabiner-Elements complex modifications config
- `keychron-q1-reference.md` — human-readable reference card for practicing the layout
- `generate_config.py` — Python script that generates the JSON (source of truth)

The JSON is **generated** by `generate_config.py`. Always edit the Python script
and re-run it to update the JSON — never edit the JSON by hand.

## Architecture: Full simlayer system

The config uses letter-key simlayers for all layers. All triggers are letter keys,
making muscle memory fully portable between the Keychron Q1 and Keyboardio Model 100.

| Trigger | Role | Note |
|---------|------|------|
| S | Navigation | Arrows, brackets, F-keys, dashes, selection, media |
| E | Cmd | All Cmd+key shortcuts. Cannot produce Cmd+E (self-reference). |
| Q | Cmd+Shift | All Cmd+Shift+key combos |
| A | Ctrl | All Ctrl+key shortcuts. Cannot produce Ctrl+A (self-reference). |
| W | Cmd+Option | D/F/J/K → Cmd+Opt+Arrows for tab/file switching |
| X | Ctrl+Cmd | Fullscreen, emoji picker, etc. |

**Self-reference limitation:** Any simlayer trigger T with modifier M cannot produce M+T.
- E=Cmd → Cmd+E is impossible → remap Raycast emoji picker to another shortcut.
- A=Ctrl → Ctrl+A is impossible → use S+A (Cmd+←) for line start instead.

Simlayer parameters: 80 ms threshold, `key_down_order: "strict"` (trigger first).

## Combos

All home-row, 70 ms, order-insensitive:
- Right hand chain: H+J=Tab, J+K=Space, K+L=Enter
- Left hand: D+F=Backspace, F+G=Esc

## Caps Lock

- Tap = Esc
- Left Shift + Caps Lock = real Caps Lock toggle
- Right Shift + Caps Lock = real Caps Lock toggle

## Rules: always apply together

### Rule 1: Always update both files together
Whenever you change `generate_config.py`, you MUST:
1. Re-run the script: `python3 generate_config.py`
2. Update `keychron-q1-reference.md` to reflect any new mappings
3. Remind the user to reload Karabiner:
   Complex Modifications → Remove All → Add Rule → Enable All.

### Rule 2: Always include examples
`keychron-q1-reference.md` contains an **Examples** section. Whenever you add
a new mapping, add a corresponding example row showing:
- What the user wants (plain English)
- The exact keystrokes (e.g. "E → C")

### Rule 3: Never hand-edit the JSON
The JSON is generated. Edit `generate_config.py` and regenerate.
If a one-off fix is urgent, note it prominently so it gets migrated to the script.

### Rule 4: Self-reference check
Before adding a new simlayer trigger, verify that the lost M+Trigger shortcut
is either unimportant or has a viable workaround. Document the loss in this file.
