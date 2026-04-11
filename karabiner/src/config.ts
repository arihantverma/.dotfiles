import { writeToProfile } from 'karabiner.ts'
import { rules } from './rules.js'
import { DRY_RUN_PROFILE_NAME, TITLE } from './shared.js'

export function buildDryRunProfile() {
  let captured = ''
  const originalWrite = process.stdout.write.bind(process.stdout)

  ;(process.stdout.write as unknown as (chunk: unknown, encoding?: BufferEncoding, cb?: (error?: Error | null) => void) => boolean) = (
    chunk: unknown,
    encoding?: BufferEncoding,
    callback?: (error?: Error | null) => void,
  ) => {
    captured += String(chunk)
    callback?.(null)
    return true
  }

  try {
    writeToProfile({ name: DRY_RUN_PROFILE_NAME, dryRun: true }, rules)
  } finally {
    process.stdout.write = originalWrite
  }

  return JSON.parse(captured.trim()) as {
    profiles: Array<{
      name: string
      complex_modifications: {
        parameters: Record<string, unknown>
        rules: unknown[]
      }
    }>
  }
}

export function buildAsset() {
  const profile = buildDryRunProfile()
  const [{ complex_modifications }] = profile.profiles

  return {
    title: TITLE,
    rules: complex_modifications.rules,
  }
}
