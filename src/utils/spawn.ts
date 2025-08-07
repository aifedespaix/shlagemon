import type { BaseShlagemon } from '~/type'
import { i18n } from '~/modules/i18n'

/**
 * Pick a random Shlagemon from the list preserving the
 * original item type.
 */
export function pickRandom<T extends BaseShlagemon>(list: T[]): T {
  const r = Math.floor(Math.random() * list.length)
  return list[r]
}

/**
 * Deterministically pick a Shlagemon from the list using a counter.
 * The list is sorted alphabetically and weights are applied so the
 * first monster appears rarely, the second appears occasionally and
 * the rest appear normally.
 */
export function pickByAlphabet<T extends BaseShlagemon>(
  list: T[],
  counter: number,
): T {
  const sorted = [...list].sort((a, b) => i18n.global.t(a.name).localeCompare(i18n.global.t(b.name)))
  if (sorted.length <= 1)
    return sorted[0]

  const weights = sorted.map((_, idx) => {
    if (idx === 0)
      return 1
    if (idx === 1)
      return 2
    return 3
  })
  const total = weights.reduce((a, w) => a + w, 0)
  const idx = counter % total
  let acc = 0
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i]
    if (idx < acc)
      return sorted[i]
  }
  return sorted[sorted.length - 1]
}
