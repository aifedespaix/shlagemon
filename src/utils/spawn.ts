import type { BaseShlagemon } from '~/type'

/**
 * Pick a random Shlagemon based on its coefficient while preserving the
 * original item type.
 */
export function pickRandomByCoefficient<T extends BaseShlagemon>(list: T[]): T {
  const total = list.reduce((sum, mon) => sum + 1 / mon.coefficient, 0)
  const r = Math.random() * total
  let acc = 0
  for (const mon of list) {
    acc += 1 / mon.coefficient
    if (r < acc)
      return mon
  }
  // Fallback should never happen but keeps typing consistent
  return list[list.length - 1]
}
