/**
 * Utilities for Shlagémon breeding mechanics.
 */

/**
 * Fixed duration for a breeding attempt in milliseconds.
 */
export const BREEDING_DURATION_MS = 300_000
// export const BREEDING_DURATION_MS = 300_000

/**
 * Base cost applied to a rarity 1 breeding attempt.
 */
export const COST_BASE_A = 1_000

/**
 * Exponential growth factor used in the breeding cost formula.
 */
export const COST_GROWTH_C = 1.1

/**
 * Compute the currency cost for breeding based on rarity.
 *
 * Cost follows an exponential curve: \(A \times C^{r-1}\) where `A`
 * is {@link COST_BASE_A}, `C` is {@link COST_GROWTH_C} and `r` is the
 * rarity clamped to the [1, 100] range.
 *
 * @param rarity - Rarity value of the resulting egg.
 * @returns Rounded cost for the breeding attempt.
 */
export function breedingCost(rarity: number): number {
  const r = Math.min(100, Math.max(1, Math.round(rarity)))
  return Math.round(COST_BASE_A * COST_GROWTH_C ** (r - 1))
}
