import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { buildAsset } from '../src/config.js'
import { ASSET_PATH } from '../src/shared.js'

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue }
type JsonObject = { [key: string]: JsonValue }

function orderFrom(from: JsonObject): JsonObject {
  const ordered: JsonObject = {}

  if ('key_code' in from) ordered.key_code = from.key_code
  if ('simultaneous' in from) ordered.simultaneous = from.simultaneous
  if ('simultaneous_options' in from) ordered.simultaneous_options = from.simultaneous_options
  if ('modifiers' in from) ordered.modifiers = from.modifiers

  return ordered
}

function orderManipulator(manipulator: JsonObject): JsonObject {
  const ordered: JsonObject = {
    type: manipulator.type,
    from: orderFrom(manipulator.from as JsonObject),
  }

  if ('to' in manipulator) ordered.to = manipulator.to
  if ('to_if_alone' in manipulator) ordered.to_if_alone = manipulator.to_if_alone
  if ('to_if_held_down' in manipulator) ordered.to_if_held_down = manipulator.to_if_held_down
  if ('to_after_key_up' in manipulator) ordered.to_after_key_up = manipulator.to_after_key_up
  if ('to_delayed_action' in manipulator) ordered.to_delayed_action = manipulator.to_delayed_action

  const simultaneous = Boolean((manipulator.from as JsonObject).simultaneous)
  if (simultaneous) {
    if ('conditions' in manipulator) ordered.conditions = manipulator.conditions
    if ('parameters' in manipulator) ordered.parameters = manipulator.parameters
  } else {
    if ('parameters' in manipulator) ordered.parameters = manipulator.parameters
    if ('conditions' in manipulator) ordered.conditions = manipulator.conditions
  }

  if ('description' in manipulator) ordered.description = manipulator.description

  return ordered
}

function orderRule(rule: JsonObject): JsonObject {
  return {
    description: rule.description,
    manipulators: (rule.manipulators as JsonObject[]).map(orderManipulator),
  }
}

const asset = buildAsset() as { title: string; rules: JsonObject[] }
const orderedAsset = {
  title: asset.title,
  rules: asset.rules.map(orderRule),
}
const ruleCount = orderedAsset.rules.length
const manipulatorCount = orderedAsset.rules.reduce((count, rule) => count + (rule.manipulators as JsonObject[]).length, 0)
const json = `${JSON.stringify(orderedAsset, null, 2)}\n`.replace(/→/g, '\\u2192')

mkdirSync(dirname(ASSET_PATH), { recursive: true })
writeFileSync(ASSET_PATH, json)

console.log(`Wrote ${ASSET_PATH}`)
console.log(`Rules: ${ruleCount}`)
console.log(`Manipulators: ${manipulatorCount}`)
