# Karabiner TypeScript Source

This directory is the TypeScript source-of-truth for the Model 100 layout.

## Files
- `src/config.ts`: builds a dry-run Karabiner profile and extracts the complex-modification rules
- `src/shared.ts`: shared devices, app conditions, thresholds, and helper builders
- `src/rules.ts`: the actual layout rules in TypeScript
- `.config/karabiner/assets/complex_modifications/keychron-q1-model100-layout.json`: generated output committed to the repo

## Commands
- `npm run build`: regenerate the committed JSON asset
- `npm run verify`: compare the committed JSON asset against the TypeScript source and assert rule counts/conditions

## Workflow
- Edit the TypeScript source, not the generated JSON
- Run `npm run build`
- Run `npm run verify`
- Commit both the source changes and the regenerated JSON

The build uses `karabiner.ts` dry-run output and never writes to the live `~/.config/karabiner/karabiner.json`.
