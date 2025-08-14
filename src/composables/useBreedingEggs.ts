import type { BreedingEggItem } from '~/stores/eggBox'
import { baseShlagemons } from '~/data/shlagemons'

/**
 * Enriched breeding egg entry combining the raw egg data with its shlagémon.
 */
export interface BreedingEntry extends BreedingEggItem {
  readonly mon: typeof baseShlagemons[number]
}

/**
 * Provides breeding eggs that reference a known shlagémon.
 *
 * Eggs with an unknown `monId` are filtered out to avoid runtime errors.
 */
export function useBreedingEggs() {
  const box = useEggBoxStore()

  return computed<BreedingEntry[]>(() =>
    box.breeding
      .map((egg) => {
        const mon = baseShlagemons.find(b => b.id === egg.monId)
        return mon
          ? {
              ...egg,
              mon,
            }
          : null
      })
      .filter((entry): entry is BreedingEntry => entry !== null),
  )
}
