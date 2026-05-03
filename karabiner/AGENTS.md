# Karabiner Project Instructions

This directory is the source-of-truth for the Model 100 Karabiner layout.

## Canonical files
- `src/rules.ts` — layout rules in TypeScript
- `src/shared.ts` — shared devices, app matchers, thresholds, and helper builders
- `src/config.ts` — dry-run profile extraction into the standalone asset
- `.config/karabiner/assets/complex_modifications/keychron-q1-model100-layout.json` — generated Karabiner complex-modifications asset
- `.config/karabiner/assets/complex_modifications/keychron-q1-reference.md` — human-readable layout reference
- `.config/karabiner/assets/complex_modifications/keychron-q1-practice-cheatsheet.md` — practice sheet

## Source-of-truth rule
- Do not hand-edit `keychron-q1-model100-layout.json`.
- Edit the TypeScript source under `src/`.
- Regenerate with `npm run build`.
- Verify with `npm run verify` or `npm test`.

## Build behavior
- `npm run build` uses `karabiner.ts` dry-run output.
- It extracts the generated `complex_modifications.rules` and writes the standalone asset JSON.
- It does not write to the live `~/.config/karabiner/karabiner.json`.

## Current architecture
- Base combos: `JK=Space`, `DF=Backspace`, `KL=Enter`, `FG=Esc`
- Caps Lock: tap `Esc`, hold `Cmd`
- Simlayers:
  - `S` = navigation/editing
  - `R` = symbols/F-keys
  - `E` = Cmd passthrough with a few remaps/blocks, including universal blocks on `E+M` and `E+W`
  - `Q` = Cmd+Shift passthrough with `Q+U -> Cmd+U`
  - `Z` = Ctrl passthrough
  - `W` = focused Cmd+Option arrows
  - `C` = focused Option (`C+D -> Opt+D`)
  - `X` = focused Ctrl+Cmd
- Full layout devices: Keychron Q1 and Keyboardio Model 100
- Apple-only Caps/Command devices: built-in keyboard and Apple Magic Keyboard (vendor 76, product 800)
- Apple-only behavior: `Caps` tap = `Esc`, hold = `Cmd`, `left_command -> caps_lock`, no Apple `Shift+Caps` recovery toggle
- Ghostty: all custom rules stay excluded except base combos `DF`, `JK`, `KL`, `S+D/F/J/K` arrows, and the approved `R` coding symbols/operators

## Required workflow after layout changes
1. Edit `src/` files.
2. Run `npm run build`.
3. Run `npm run verify`.
4. Update `keychron-q1-reference.md` and `keychron-q1-practice-cheatsheet.md` if behavior changed.
5. Manually test live behavior in Karabiner, because build/verify only prove generated JSON consistency.

## Maintenance notes
- Keep rule descriptions stable when possible so diffs stay readable.
- Keep shared conditions in `src/shared.ts`; do not duplicate device/app exclusions ad hoc.
- If behavior changes, docs must change in the same commit.
