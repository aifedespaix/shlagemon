/**
 * Composable to format a duration given in seconds using localized units.
 *
 * Units with a zero value are omitted from the resulting string.
 */
export function useFormatDuration() {
  const { t } = useI18n()

  return { formatDuration }

  /**
   * Formats the provided duration into a human readable string.
   *
   * @param totalSeconds - Duration to format in seconds.
   */
  function formatDuration(totalSeconds: number): string {
    const parts = durationParts(totalSeconds).map(part =>
      t(`composables.useFormatDuration.${part.unit}`, part.value),
    )

    if (parts.length <= 1)
      return parts.join('')

    const last = parts.pop()!
    return `${parts.join(' ')} ${t('composables.useFormatDuration.and')} ${last}`
  }
}

export type DurationUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

export interface DurationPart {
  unit: DurationUnit
  value: number
}

const UNIT_SECONDS: Record<DurationUnit, number> = {
  year: 31_536_000, // 365 days
  month: 2_592_000, // 30 days
  day: 86_400,
  hour: 3_600,
  minute: 60,
  second: 1,
}

/**
 * Breaks down a duration in seconds into an ordered list of parts.
 *
 * @param totalSeconds - Total seconds to convert.
 */
export function durationParts(totalSeconds: number): DurationPart[] {
  const parts: DurationPart[] = []
  let remaining = totalSeconds

  for (const [unit, unitSeconds] of Object.entries(UNIT_SECONDS) as [DurationUnit, number][]) {
    const value = Math.floor(remaining / unitSeconds)
    if (value > 0) {
      parts.push({ unit, value })
      remaining -= value * unitSeconds
    }
  }

  return parts
}
