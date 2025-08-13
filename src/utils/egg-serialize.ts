import type { StateTree } from 'pinia'
import type { Serializer } from 'pinia-plugin-persistedstate'
import type { Egg } from '~/stores/egg'
import { allShlagemons } from '~/data/shlagemons'

interface StoredEgg {
  id: number
  type: Egg['type']
  baseId: string
  rarity: number
  startedAt: number
  hatchesAt: number
  isBreeding?: boolean
  forcedMonId?: string
  forcedRarity?: number
}

/**
 * Eggs are stored as a JSON array of plain objects containing only
 * `id`, `type`, `baseId`, `rarity`, `startedAt`, `hatchesAt`, and
 * optional breeding metadata.
 */
export const eggSerializer: Serializer = {
  serialize(data: StateTree): string {
    const { incubator } = data as { incubator: Egg[] }
    const eggs = incubator || []
    const list: StoredEgg[] = eggs.map(e => ({
      id: e.id,
      type: e.type,
      baseId: e.base.id,
      rarity: e.rarity,
      startedAt: e.startedAt,
      hatchesAt: e.hatchesAt,
      ...(e.isBreeding && { isBreeding: true }),
      ...(e.forcedMonId && { forcedMonId: e.forcedMonId }),
      ...(e.forcedRarity !== undefined && { forcedRarity: e.forcedRarity }),
    }))
    return JSON.stringify(list)
  },
  deserialize(raw: string): StateTree {
    if (!raw)
      return { incubator: [] } as StateTree
    const list = JSON.parse(raw) as StoredEgg[]
    const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
    const incubator = list.map((e) => {
      const egg: Egg = {
        id: e.id,
        type: e.type,
        base: baseMap[e.baseId],
        rarity: e.rarity,
        startedAt: e.startedAt,
        hatchesAt: e.hatchesAt,
      }
      if (e.isBreeding)
        egg.isBreeding = true
      if (e.forcedMonId)
        egg.forcedMonId = e.forcedMonId
      if (typeof e.forcedRarity === 'number')
        egg.forcedRarity = Math.min(100, Math.max(1, e.forcedRarity))
      return egg
    }).filter(e => e.base)
    return { incubator } as StateTree
  },
} as const
