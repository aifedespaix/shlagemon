import type { DurationPart } from './useFormatDuration'
import { describe, expect, it } from 'vitest'
import { durationParts } from './useFormatDuration'

describe('durationParts', () => {
  it('splits seconds into appropriate units', () => {
    const seconds = 62
    const parts = durationParts(seconds)
    const expected: DurationPart[] = [
      { unit: 'minute', value: 1 },
      { unit: 'second', value: 2 },
    ]
    expect(parts).toEqual(expected)
  })

  it('handles complex durations', () => {
    const seconds
      = 31_536_000 // 1 year
        + 2 * 2_592_000 // 2 months
        + 3 * 86_400 // 3 days
        + 4 * 3_600 // 4 hours
        + 5 * 60 // 5 minutes
        + 6 // 6 seconds
    const parts = durationParts(seconds)
    const expected: DurationPart[] = [
      { unit: 'year', value: 1 },
      { unit: 'month', value: 2 },
      { unit: 'day', value: 3 },
      { unit: 'hour', value: 4 },
      { unit: 'minute', value: 5 },
      { unit: 'second', value: 6 },
    ]
    expect(parts).toEqual(expected)
  })
})
