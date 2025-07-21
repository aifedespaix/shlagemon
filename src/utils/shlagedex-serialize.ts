import type { Serializer } from 'pinia-plugin-persistedstate'
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'
import { allShlagemons } from '~/data/shlagemons'
import { baseStats, statWithRarityAndCoefficient } from './dexFactory'
import { deduplicateDex } from './saveFix'

export interface SerializedDex {
  shlagemons: DexShlagemon[]
  activeShlagemon: DexShlagemon | null
  highestLevel: number
  effects: ActiveEffect[]
}

function getBaseMap() {
  return Object.fromEntries(
    (allShlagemons || []).filter(Boolean).map(b => [b.id, b]),
  )
}

interface StoredDexMon extends Omit<DexShlagemon, 'base' | 'heldItemId'> {
  baseId: string
  heldItemId: string | null
  base?: undefined
}

interface StoredDex extends Omit<SerializedDex, 'shlagemons' | 'activeShlagemon'> {
  shlagemons: StoredDexMon[]
  activeShlagemon: StoredDexMon | null
}

export const shlagedexSerializer: Serializer = {
  serialize(data: any): string {
    const typed = data as SerializedDex
    return JSON.stringify({
      ...typed,
      effects: typed.effects.map(({ timeout, ...e }) => e),
      shlagemons: typed.shlagemons.map((mon) => {
        const { base, heldItemId, ...rest } = mon
        const stored: StoredDexMon = {
          ...rest,
          baseId: (mon as StoredDexMon).baseId ?? base.id,
          heldItemId: heldItemId ?? null,
          base: undefined, // remove circular reference
        }
        return stored
      }),
      activeShlagemon: typed.activeShlagemon
        ? (() => {
            const { base, heldItemId, ...rest } = typed.activeShlagemon
            const stored: StoredDexMon = {
              ...rest,
              baseId:
                (typed.activeShlagemon as StoredDexMon).baseId
                ?? base.id,
              heldItemId: heldItemId ?? null,
              base: undefined,
            }
            return stored
          })()
        : null,
    })
  },

  deserialize(raw: string): any {
    const parsed = JSON.parse(raw) as StoredDex

    const baseMap = getBaseMap()

    let shlagemons: DexShlagemon[] = (parsed.shlagemons || [])
      .map((mon: StoredDexMon): DexShlagemon | null => {
        const base = mon.base ?? baseMap[mon.baseId]
        if (!base)
          return null
        return {
          ...mon,
          base,
          baseId: mon.baseId ?? base.id,
          coefficient: mon.coefficient ?? base.coefficient,
          baseStats: mon.baseStats ?? {
            hp: statWithRarityAndCoefficient(baseStats.hp, base.coefficient, mon.rarity ?? 1),
            attack: statWithRarityAndCoefficient(baseStats.attack, base.coefficient, mon.rarity ?? 1),
            defense: statWithRarityAndCoefficient(baseStats.defense, base.coefficient, mon.rarity ?? 1),
            smelling: statWithRarityAndCoefficient(baseStats.smelling, base.coefficient, mon.rarity ?? 1),
          },
          allowEvolution: mon.allowEvolution ?? true,
          captureDate: mon.captureDate ?? new Date().toISOString(),
          captureCount: mon.captureCount ?? 1,
          heldItemId: mon.heldItemId ?? null,
        }
      })
      .filter((m): m is DexShlagemon => Boolean(m))

    // build active before deduplication so that deduplication can keep its id
    const activeData = parsed.activeShlagemon
    let active: DexShlagemon | null = null
    if (activeData) {
      const base = activeData.base ?? baseMap[activeData.baseId]
      if (base) {
        active = {
          ...activeData,
          base,
          baseId: activeData.baseId ?? base.id,
          coefficient: activeData.coefficient ?? base.coefficient,
          baseStats: activeData.baseStats ?? {
            hp: statWithRarityAndCoefficient(baseStats.hp, base.coefficient, activeData.rarity ?? 1),
            attack: statWithRarityAndCoefficient(baseStats.attack, base.coefficient, activeData.rarity ?? 1),
            defense: statWithRarityAndCoefficient(baseStats.defense, base.coefficient, activeData.rarity ?? 1),
            smelling: statWithRarityAndCoefficient(baseStats.smelling, base.coefficient, activeData.rarity ?? 1),
          },
          allowEvolution: activeData.allowEvolution ?? true,
          captureDate: activeData.captureDate ?? new Date().toISOString(),
          captureCount: activeData.captureCount ?? 1,
          heldItemId: activeData.heldItemId ?? null,
        }
      }
      else {
        active = null
      }
    }

    shlagemons = deduplicateDex(shlagemons, active?.id)

    if (active) {
      const found = shlagemons.find(m => m.id === active!.id)
        || shlagemons.find(m => m.base.id === active!.base.id)
      if (found)
        active = found
    }

    const effects = (parsed.effects || []).map(e => ({
      ...e,
      timeout: undefined,
    }))

    return {
      ...parsed,
      shlagemons,
      activeShlagemon: active ?? null,
      effects,
    } as any
  },
}
