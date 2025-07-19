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

export const shlagedexSerializer = {
  serialize(data: SerializedDex): string {
    return JSON.stringify({
      ...data,
      effects: data.effects.map(({ timeout, ...e }) => e),
      shlagemons: data.shlagemons.map(mon => ({
        ...mon,
        baseId: (mon as StoredDexMon).baseId ?? mon.base.id,
        base: undefined, // on supprime la boucle
        heldItemId: mon.heldItemId ?? null,
      })),
      activeShlagemon: data.activeShlagemon
        ? {
            ...data.activeShlagemon,
            baseId:
              (data.activeShlagemon as StoredDexMon).baseId
              ?? data.activeShlagemon.base.id,
            base: undefined,
            heldItemId: data.activeShlagemon.heldItemId ?? null,
          }
        : null,
    })
  },

  deserialize(raw: string): SerializedDex {
    const parsed = JSON.parse(raw) as StoredDex

    const baseMap = getBaseMap()

    let shlagemons = (parsed.shlagemons || [])
      .map((mon: StoredDexMon) => {
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
    let active: StoredDexMon | null = parsed.activeShlagemon
    if (active) {
      const base = active.base ?? baseMap[active.baseId]
      if (base) {
        active = {
          ...active,
          base,
          baseId: active.baseId ?? base.id,
          coefficient: active.coefficient ?? base.coefficient,
          baseStats: active.baseStats ?? {
            hp: statWithRarityAndCoefficient(baseStats.hp, base.coefficient, active.rarity ?? 1),
            attack: statWithRarityAndCoefficient(baseStats.attack, base.coefficient, active.rarity ?? 1),
            defense: statWithRarityAndCoefficient(baseStats.defense, base.coefficient, active.rarity ?? 1),
            smelling: statWithRarityAndCoefficient(baseStats.smelling, base.coefficient, active.rarity ?? 1),
          },
          allowEvolution: active.allowEvolution ?? true,
          captureDate: active.captureDate ?? new Date().toISOString(),
          captureCount: active.captureCount ?? 1,
          heldItemId: active.heldItemId ?? null,
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
    }
  },
}
