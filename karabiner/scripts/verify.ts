import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildAsset } from '../src/config.js'
import { APPS, ASSET_PATH, DEVICES, TITLE } from '../src/shared.js'

const expected = buildAsset() as {
  title: string
  rules: Array<{ description: string; manipulators: Array<{ conditions?: Array<Record<string, unknown>> }> }>
}
const actual = JSON.parse(readFileSync(ASSET_PATH, 'utf8')) as typeof expected

assert.equal(expected.title, TITLE)
assert.deepEqual(actual, expected)
assert.equal(actual.rules.length, 18)

const manipulators = actual.rules.flatMap((rule) => rule.manipulators)
assert.equal(manipulators.length, 228)

const deviceCondition = {
  type: 'device_if',
  identifiers: [...DEVICES],
}
const ghosttyCondition = {
  type: 'frontmost_application_unless',
  bundle_identifiers: [APPS.ghostty],
}

let appScopedConditions = 0
let ghosttyExceptions = 0
for (const manipulator of manipulators) {
  const conditions = manipulator.conditions ?? []
  assert(conditions.some((condition) => JSON.stringify(condition) === JSON.stringify(deviceCondition)))
  const hasGhostty = conditions.some((condition) => JSON.stringify(condition) === JSON.stringify(ghosttyCondition))
  if (!hasGhostty) ghosttyExceptions += 1
  appScopedConditions += conditions.filter((condition) => condition.type === 'frontmost_application_if').length
}

assert.equal(appScopedConditions, 6)
assert.equal(ghosttyExceptions, 3)
assert(actual.rules.some((rule) => rule.description === 'Caps Lock dual-role: tap Esc, hold Cmd'))
assert(actual.rules.some((rule) => rule.description === 'Combos: J+K=Space, D+F=Backspace, K+L=Enter, F+G=Esc'))
assert(actual.rules.some((rule) => rule.description === 'Ghostty-enabled base combos: J+K, D+F, K+L'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: S = Navigation'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: R = Symbols/F-keys'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: E = Cmd'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: Q = Cmd+Shift'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: Z = Ctrl'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: W = Cmd+Option (D/F/J/K → Cmd+Opt+Arrows for tab switching)'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: C = Focused Option'))
assert(actual.rules.some((rule) => rule.description === 'Simlayer: X = Ctrl+Cmd'))

console.log('Asset matches generated TypeScript source.')
console.log(`Title: ${actual.title}`)
console.log(`Rules: ${actual.rules.length}`)
console.log(`Manipulators: ${manipulators.length}`)
console.log(`App-scoped conditions: ${appScopedConditions}`)
console.log(`Ghostty exceptions: ${ghosttyExceptions}`)
