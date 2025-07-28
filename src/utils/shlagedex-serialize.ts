import type { Serializer } from 'pinia-plugin-persistedstate'
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'
import { allShlagemons } from '~/data/shlagemons'
import { baseStats, statWithRarity } from './dexFactory'
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
  /**
   * Legacy identifier used to rebuild the base when loading a save.
   * This property isn't part of {@link DexShlagemon} and gets discarded on
   * deserialization.
   */
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
      effects: (data.effects || []).map(({ timeout, ...e }) => e),
      shlagemons: data.shlagemons.map((mon) => {
        const { base, heldItemId, ...rest } = mon
        const stored: StoredDexMon = {
          ...rest,
          // Persist baseId to support older saves that rely on this field
          baseId: base.id,
          heldItemId: heldItemId ?? null,
          base: undefined, // remove circular reference
        }
        return stored
      }),
      activeShlagemon: data.activeShlagemon
        ? (() => {
            const { base, heldItemId, ...rest } = data.activeShlagemon
            const stored: StoredDexMon = {
              ...rest,
              // Persist baseId for backward compatibility
              baseId: base.id,
              heldItemId: heldItemId ?? null,
              base: undefined,
            }
            return stored
          })()
        : null,
    })
  },

  deserialize(raw: string): SerializedDex {
    const parsed = JSON.parse(raw) as StoredDex

    const baseMap = getBaseMap()

    let shlagemons: DexShlagemon[] = (parsed.shlagemons || [])
      .map((mon: StoredDexMon): DexShlagemon | null => {
        const base = mon.base ?? baseMap[mon.baseId]
        if (!base)
          return null
        const { baseId: _baseId, ...rest } = mon
        return {
          ...rest,
          base,
          baseStats: mon.baseStats ?? {
            hp: statWithRarity(baseStats.hp, mon.rarity ?? 1),
            attack: statWithRarity(baseStats.attack, mon.rarity ?? 1),
            defense: statWithRarity(baseStats.defense, mon.rarity ?? 1),
            smelling: statWithRarity(baseStats.smelling, mon.rarity ?? 1),
          },
          allowEvolution: mon.allowEvolution ?? true,
          captureDate: mon.captureDate ?? new Date().toISOString(),
          captureCount: mon.captureCount ?? 1,
          heldItemId: mon.heldItemId ?? null,
          rarityFollowsLevel: mon.rarityFollowsLevel ?? false,
        }
      })
      .filter((m): m is DexShlagemon => Boolean(m))

    // build active before deduplication so that deduplication can keep its id
    const activeData = parsed.activeShlagemon
    let active: DexShlagemon | null = null
    if (activeData) {
      const base = activeData.base ?? baseMap[activeData.baseId]
      if (base) {
        const { baseId: _baseId, ...rest } = activeData
        active = {
          ...rest,
          base,
          baseStats: activeData.baseStats ?? {
            hp: statWithRarity(baseStats.hp, activeData.rarity ?? 1),
            attack: statWithRarity(baseStats.attack, activeData.rarity ?? 1),
            defense: statWithRarity(baseStats.defense, activeData.rarity ?? 1),
            smelling: statWithRarity(baseStats.smelling, activeData.rarity ?? 1),
          },
          allowEvolution: activeData.allowEvolution ?? true,
          captureDate: activeData.captureDate ?? new Date().toISOString(),
          captureCount: activeData.captureCount ?? 1,
          heldItemId: activeData.heldItemId ?? null,
          rarityFollowsLevel: activeData.rarityFollowsLevel ?? false,
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
} as unknown as Serializer
