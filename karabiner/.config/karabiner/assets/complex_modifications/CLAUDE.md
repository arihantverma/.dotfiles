# Instructions for Claude

This folder contains two files that must always be kept in sync:

- `keychron-q1-model100-layout.json` — Karabiner-Elements complex modifications config
- `keychron-q1-reference.md` — human-readable reference card for practicing the layout

## Rule: Always update both files together

Whenever you make ANY change to `keychron-q1-model100-layout.json`, you MUST also update `keychron-q1-reference.md` in the same edit session — no exceptions.

After any config change, also remind the user to reload Karabiner:
Complex Modifications → Remove All → Add Rule → Enable All.

## Rule: Always include examples

`keychron-q1-reference.md` contains an **Examples** section with tables showing real keystroke sequences for common tasks. Whenever you add a new mapping to the JSON config, you MUST also add a corresponding example row to the relevant Examples table in the reference doc. The example should show:
- What the user wants (plain English)
- The exact keystrokes to achieve it (e.g. "Hold Tab → tap J → release Tab → T")
