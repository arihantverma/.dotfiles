import { ifApp, map, type RuleBuilder } from 'karabiner.ts'
import {
  APPS,
  BASE_COMBO_THRESHOLD,
  INSENSITIVE_SIMULTANEOUS_OPTIONS,
  SIMLAYER_THRESHOLD,
  STRICT_SIMULTANEOUS_OPTIONS,
  appleCapsRule,
  keyEvent,
  noneEvent,
  passthroughMappings,
  scopedRule,
  simultaneousManipulator,
  type Mapping,
} from './shared.js'

const baseComboRule = scopedRule('Combos: J+K=Space, D+F=Backspace, K+L=Enter, F+G=Esc').manipulators([
  simultaneousManipulator('f', 'g', keyEvent('escape'), BASE_COMBO_THRESHOLD, INSENSITIVE_SIMULTANEOUS_OPTIONS),
])

const ghosttyBaseComboRule = scopedRule('Ghostty-enabled base combos: J+K, D+F, K+L', [], false).manipulators([
  simultaneousManipulator('j', 'k', keyEvent('spacebar'), BASE_COMBO_THRESHOLD, INSENSITIVE_SIMULTANEOUS_OPTIONS),
  simultaneousManipulator('d', 'f', keyEvent('delete_or_backspace'), BASE_COMBO_THRESHOLD, INSENSITIVE_SIMULTANEOUS_OPTIONS),
  simultaneousManipulator('k', 'l', keyEvent('return_or_enter'), BASE_COMBO_THRESHOLD, INSENSITIVE_SIMULTANEOUS_OPTIONS),
])

const appleCapsDualRoleRule = appleCapsRule('Apple keyboards: Caps Lock dual-role: tap Esc, hold Cmd').manipulators([
  map({
    key_code: 'caps_lock',
    modifiers: {
      optional: ['any'],
    },
  })
    .to(keyEvent('left_command', undefined, { lazy: true }))
    .toIfAlone(keyEvent('escape'))
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 200,
      'basic.to_if_held_down_threshold_milliseconds': 130,
    }),
])

const appleLeftCommandToCapsRule = appleCapsRule('Apple keyboards: Left Command -> Caps Lock').manipulators([
  map({
    key_code: 'left_command',
    modifiers: {
      optional: ['any'],
    },
  }).to(keyEvent('caps_lock')),
])

const capsRecoveryRule = scopedRule('Caps Lock recovery: Left/Right Shift + Caps Lock = real Caps Lock toggle').manipulators([
  map({
    key_code: 'caps_lock',
    modifiers: {
      mandatory: ['left_shift'],
      optional: ['caps_lock'],
    },
  }).to(keyEvent('caps_lock')),
  map({
    key_code: 'caps_lock',
    modifiers: {
      mandatory: ['right_shift'],
      optional: ['caps_lock'],
    },
  }).to(keyEvent('caps_lock')),
])

const capsDualRoleRule = scopedRule('Caps Lock dual-role: tap Esc, hold Cmd').manipulators([
  map({
    key_code: 'caps_lock',
    modifiers: {
      optional: ['any'],
    },
  })
    .to(keyEvent('left_command', undefined, { lazy: true }))
    .toIfAlone(keyEvent('escape'))
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 200,
      'basic.to_if_held_down_threshold_milliseconds': 130,
    }),
])

const chatBlockRule = scopedRule('Chat-app block: K+L', [ifApp([...APPS.chatApps])]).manipulators([
  simultaneousManipulator('k', 'l', noneEvent(), BASE_COMBO_THRESHOLD, INSENSITIVE_SIMULTANEOUS_OPTIONS),
])

const sMappings: Mapping[] = [
  ['d', [keyEvent('left_arrow')]],
  ['f', [keyEvent('up_arrow')]],
  ['j', [keyEvent('down_arrow')]],
  ['k', [keyEvent('right_arrow')]],
  ['r', [keyEvent('tab', ['left_shift'])]],
  ['u', [keyEvent('z', ['left_command'])]],
  ['i', [keyEvent('z', ['left_command', 'left_shift'])]],
  ['a', [keyEvent('left_arrow', ['left_command'])]],
  ['q', [keyEvent('right_arrow', ['left_command'])]],
  ['h', [keyEvent('left_arrow', ['left_option'])]],
  ['l', [keyEvent('right_arrow', ['left_option'])]],
  ['comma', [keyEvent('left_arrow', ['left_option', 'left_shift'])]],
  ['period', [keyEvent('right_arrow', ['left_option', 'left_shift'])]],
  ['slash', [keyEvent('left_arrow', ['left_command', 'left_shift'])]],
  ['return_or_enter', [keyEvent('right_arrow', ['left_command', 'left_shift'])]],
  ['y', [keyEvent('home')]],
  ['t', [keyEvent('page_up')]],
  ['o', [keyEvent('page_down')]],
  ['p', [keyEvent('end')]],
  ['spacebar', [keyEvent('spacebar', ['left_command'])]],
  ['c', [keyEvent('c', ['left_command'])]],
  ['v', [keyEvent('v', ['left_command'])]],
  ['b', [keyEvent('x', ['left_command'])]],
  ['n', [keyEvent('left_arrow', ['left_option']), keyEvent('right_arrow', ['left_option', 'left_shift'])]],
  ['m', [keyEvent('left_arrow', ['left_command']), keyEvent('right_arrow', ['left_command', 'left_shift'])]],
  ['semicolon', [keyEvent('delete_or_backspace', ['left_command'])]],
  ['quote', [keyEvent('delete_forward')]],
  ['g', [keyEvent('return_or_enter', ['left_shift'])]],
]

const rMappings: Mapping[] = [
  ['1', [keyEvent('f1')]],
  ['2', [keyEvent('f2')]],
  ['3', [keyEvent('f3')]],
  ['4', [keyEvent('f4')]],
  ['5', [keyEvent('f5')]],
  ['6', [keyEvent('f6')]],
  ['7', [keyEvent('f7')]],
  ['8', [keyEvent('f8')]],
  ['9', [keyEvent('f9')]],
  ['0', [keyEvent('f10')]],
  ['hyphen_minus', [keyEvent('f11')]],
  ['equal_sign', [keyEvent('f12')]],
  ['j', [keyEvent('9', ['left_shift'])]],
  ['k', [keyEvent('0', ['left_shift'])]],
  ['u', [keyEvent('open_bracket')]],
  ['i', [keyEvent('close_bracket')]],
  ['o', [keyEvent('open_bracket', ['left_shift'])]],
  ['p', [keyEvent('close_bracket', ['left_shift'])]],
  ['n', [keyEvent('comma', ['left_shift'])]],
  ['m', [keyEvent('period', ['left_shift'])]],
  ['h', [keyEvent('grave_accent_and_tilde')]],
  ['comma', [keyEvent('backslash')]],
  ['period', [keyEvent('backslash', ['left_shift'])]],
  ['l', [keyEvent('hyphen')]],
  ['semicolon', [keyEvent('hyphen', ['left_option'])]],
  ['quote', [keyEvent('hyphen', ['left_option', 'left_shift'])]],
]

const eKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'backslash', 'c', 'close_bracket', 'comma', 'd', 'delete_or_backspace', 'equal_sign', 'escape', 'f', 'g', 'grave_accent_and_tilde', 'h', 'hyphen_minus', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'open_bracket', 'p', 'period', 'q', 'quote', 'r', 'return_or_enter', 's', 'semicolon', 'slash', 'spacebar', 't', 'tab', 'u', 'v', 'w', 'x', 'y', 'z']
const qKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'backslash', 'c', 'close_bracket', 'comma', 'd', 'delete_or_backspace', 'e', 'equal_sign', 'escape', 'f', 'g', 'grave_accent_and_tilde', 'h', 'hyphen_minus', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'open_bracket', 'p', 'period', 'quote', 'r', 'return_or_enter', 's', 'semicolon', 'slash', 'spacebar', 't', 'tab', 'u', 'v', 'w', 'x', 'y', 'z']
const zKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'b', 'backslash', 'c', 'close_bracket', 'comma', 'd', 'delete_or_backspace', 'e', 'equal_sign', 'escape', 'f', 'g', 'grave_accent_and_tilde', 'h', 'hyphen_minus', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'open_bracket', 'p', 'period', 'q', 'quote', 'r', 'return_or_enter', 's', 'semicolon', 'slash', 'spacebar', 't', 'tab', 'u', 'v', 'w', 'x', 'y']

const eMappings = passthroughMappings(eKeys, ['left_command'], {
  a: noneEvent(),
  m: noneEvent(),
  r: noneEvent(),
  u: keyEvent('a', ['left_command']),
  w: noneEvent(),
})

const qMappings = passthroughMappings(qKeys, ['left_command', 'left_shift'], {
  u: keyEvent('u', ['left_command']),
})

const zMappings = passthroughMappings(zKeys, ['left_control'])

const wMappings: Mapping[] = [
  ['d', [keyEvent('left_arrow', ['left_command', 'left_option'])]],
  ['f', [keyEvent('up_arrow', ['left_command', 'left_option'])]],
  ['j', [keyEvent('down_arrow', ['left_command', 'left_option'])]],
  ['k', [keyEvent('right_arrow', ['left_command', 'left_option'])]],
]

const cMappings: Mapping[] = [['d', [keyEvent('d', ['left_option'])]]]


const ghosttyNavMappings: Mapping[] = [
  ['d', [keyEvent('left_arrow')]],
  ['f', [keyEvent('up_arrow')]],
  ['j', [keyEvent('down_arrow')]],
  ['k', [keyEvent('right_arrow')]],
]

const ghosttySymbolMappings: Mapping[] = [
  ['j', [keyEvent('9', ['left_shift'])]],
  ['k', [keyEvent('0', ['left_shift'])]],
  ['u', [keyEvent('open_bracket')]],
  ['i', [keyEvent('close_bracket')]],
  ['o', [keyEvent('open_bracket', ['left_shift'])]],
  ['p', [keyEvent('close_bracket', ['left_shift'])]],
  ['n', [keyEvent('comma', ['left_shift'])]],
  ['m', [keyEvent('period', ['left_shift'])]],
  ['comma', [keyEvent('backslash')]],
  ['period', [keyEvent('backslash', ['left_shift'])]],
  ['l', [keyEvent('hyphen')]],
  ['semicolon', [keyEvent('hyphen', ['left_option'])]],
  ['quote', [keyEvent('hyphen', ['left_option', 'left_shift'])]],
]

const xMappings: Mapping[] = [
  ['f', [keyEvent('f', ['left_control', 'left_command'])]],
  ['spacebar', [keyEvent('spacebar', ['left_control', 'left_command'])]],
  ['j', [keyEvent('left_arrow', ['left_control'])]],
  ['k', [keyEvent('right_arrow', ['left_control'])]],
]

function layerRule(description: string, trigger: string, mappings: Mapping[]): RuleBuilder {
  return scopedRule(description).manipulators(
    mappings.map(([key, to]) => simultaneousManipulator(trigger, key, to, SIMLAYER_THRESHOLD, STRICT_SIMULTANEOUS_OPTIONS)),
  )
}

function blockRule(description: string, trigger: string, key: string, apps: string[]): RuleBuilder {
  return scopedRule(description, [ifApp(apps)]).manipulators([
    simultaneousManipulator(trigger, key, noneEvent(), SIMLAYER_THRESHOLD, STRICT_SIMULTANEOUS_OPTIONS),
  ])
}

function ghosttyLayerRule(description: string, trigger: string, mappings: Mapping[]): RuleBuilder {
  return scopedRule(description, [ifApp(APPS.ghostty)], false).manipulators(
    mappings.map(([key, to]) => simultaneousManipulator(trigger, key, to, SIMLAYER_THRESHOLD, STRICT_SIMULTANEOUS_OPTIONS)),
  )
}

export const rules: RuleBuilder[] = [
  appleCapsDualRoleRule,
  appleLeftCommandToCapsRule,
  capsRecoveryRule,
  capsDualRoleRule,
  chatBlockRule,
  baseComboRule,
  ghosttyBaseComboRule,
  ghosttyLayerRule('Ghostty-enabled navigation: S+D/F/J/K', 's', ghosttyNavMappings),
  ghosttyLayerRule('Ghostty-enabled symbols: R brackets/operators', 'r', ghosttySymbolMappings),
  layerRule('Simlayer: S = Navigation', 's', sMappings),
  layerRule('Simlayer: R = Symbols/F-keys', 'r', rMappings),
  blockRule('Browser-only block: E+D', 'e', 'd', [...APPS.browsers]),
  blockRule('Browser-only block: E+N', 'e', 'n', [...APPS.browsersAndScrivener]),
  blockRule('Browser-only block: E+R', 'e', 'r', [...APPS.browsers]),
  blockRule('App-only block: E+W', 'e', 'w', [...APPS.notesApps]),
  blockRule('App-only block: E+R', 'e', 'r', [...APPS.notesApps]),
  layerRule('Simlayer: E = Cmd', 'e', eMappings),
  layerRule('Simlayer: Q = Cmd+Shift', 'q', qMappings),
  layerRule('Simlayer: Z = Ctrl', 'z', zMappings),
  layerRule('Simlayer: W = Cmd+Option (D/F/J/K → Cmd+Opt+Arrows for tab switching)', 'w', wMappings),
  layerRule('Simlayer: C = Focused Option', 'c', cMappings),
  layerRule('Simlayer: X = Ctrl+Cmd', 'x', xMappings),
]
