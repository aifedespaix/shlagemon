import type { BaseShlagemon } from '~/type'

/**
 * Pick a random Shlagemon from the list preserving the
 * original item type.
 */
export function pickRandomByCoefficient<T extends BaseShlagemon>(list: T[]): T {
  const r = Math.floor(Math.random() * list.length)
  return list[r]
}
