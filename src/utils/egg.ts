/**
 * Utility helpers related to egg incubation.
 */

/** Minimum incubation duration in milliseconds for rarity 1. */
export const MIN_HATCH_DURATION_MS = 60_000

/** Maximum incubation duration in milliseconds for rarity 100. */
export const MAX_HATCH_DURATION_MS = 3_600_000

/**
 * Compute the incubation duration for a given rarity.
 * The mapping is linear between `MIN_HATCH_DURATION_MS` at rarity 1
 * and `MAX_HATCH_DURATION_MS` at rarity 100.
 *
 * @param rarity - Egg rarity between 1 and 100.
 * @returns Duration in milliseconds until the egg hatches.
 */
export function hatchDurationForRarity(rarity: number): number {
  const clamped = Math.min(100, Math.max(1, Math.round(rarity)))
  const ratio = (clamped - 1) / 99
  return Math.round(
    MIN_HATCH_DURATION_MS
    + ratio * (MAX_HATCH_DURATION_MS - MIN_HATCH_DURATION_MS),
  )
}
