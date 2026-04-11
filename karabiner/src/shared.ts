import { ifApp, ifDevice, map, rule, toNone, type ConditionBuilder, type RuleBuilder, type ToEvent } from 'karabiner.ts'

export const TITLE = 'Model 100 Hacker Layout for Keychron (Simlayer Edition)'
export const DRY_RUN_PROFILE_NAME = 'model100-ts-dry-run'
export const ASSET_PATH = '/Users/arihantverma/Code/po/.dotfiles/karabiner/.config/karabiner/assets/complex_modifications/keychron-q1-model100-layout.json'

export const DEVICES = [
  { vendor_id: 13364, product_id: 263 },
  { vendor_id: 13462, product_id: 6 },
] as const

export const APPS = {
  ghostty: '^com\\.mitchellh\\.ghostty$',
  browsers: [
    '^com\\.apple\\.Safari$',
    '^com\\.google\\.Chrome$',
    '^company\\.thebrowser\\.Browser$',
    '^com\\.brave\\.Browser$',
    '^org\\.mozilla\\.firefox$',
  ],
  browsersAndScrivener: [
    '^com\\.apple\\.Safari$',
    '^com\\.google\\.Chrome$',
    '^company\\.thebrowser\\.Browser$',
    '^com\\.brave\\.Browser$',
    '^org\\.mozilla\\.firefox$',
    '^com\\.literatureandlatte\\.scrivener3$',
  ],
  notesApps: [
    '^org\\.standardnotes\\.standardnotes$',
    '^com\\.literatureandlatte\\.scrivener3$',
  ],
  chatApps: [
    '^com\\.automattic\\.beeper\\.desktop$',
    '^net\\.whatsapp\\.WhatsApp$',
    '^org\\.whispersystems\\.signal-desktop$',
    '^com\\.openai\\.codex$',
  ],
} as const

export const SIMLAYER_THRESHOLD = 50
export const BASE_COMBO_THRESHOLD = 70

export const STRICT_SIMULTANEOUS_OPTIONS = {
  key_down_order: 'strict',
  key_up_order: 'strict_inverse',
  detect_key_down_uninterruptedly: true,
  key_up_when: 'any',
} as const

export const INSENSITIVE_SIMULTANEOUS_OPTIONS = {
  key_down_order: 'insensitive',
  key_up_order: 'insensitive',
  detect_key_down_uninterruptedly: true,
  key_up_when: 'any',
} as const

export type KeyCode = string
export type KeyModifiers = string[]
export type Mapping = readonly [KeyCode, ToEvent[]]

export function keyEvent(key_code: string, modifiers?: string[], extra?: Record<string, unknown>): ToEvent {
  return {
    key_code,
    ...(modifiers ? { modifiers } : {}),
    ...(extra ?? {}),
  } as ToEvent
}

export function noneEvent(): ToEvent {
  return toNone()
}

export function sharedConditions(extra: Array<ConditionBuilder> = [], excludeGhostty = true): ConditionBuilder[] {
  return excludeGhostty
    ? [ifDevice([...DEVICES]), ...extra, ifApp(APPS.ghostty).unless()]
    : [ifDevice([...DEVICES]), ...extra]
}

export function scopedRule(description: string, extra: Array<ConditionBuilder> = [], excludeGhostty = true): RuleBuilder {
  return rule(description, ...sharedConditions(extra, excludeGhostty))
}

export function simultaneousManipulator(
  trigger: string,
  key: string,
  to: ToEvent | ToEvent[],
  threshold = SIMLAYER_THRESHOLD,
  options = STRICT_SIMULTANEOUS_OPTIONS,
) {
  return map({
    simultaneous: [{ key_code: trigger }, { key_code: key }],
    simultaneous_options: options,
  })
    .to(to)
    .parameters({ 'basic.simultaneous_threshold_milliseconds': threshold })
}

export function passthroughMappings(
  keys: string[],
  modifiers: string[],
  overrides: Record<string, ToEvent | ToEvent[]> = {},
): Mapping[] {
  return keys.map((key) => {
    const override = overrides[key]
    const to = override === undefined ? [keyEvent(key, modifiers)] : Array.isArray(override) ? override : [override]
    return [key, to] as const
  })
}
