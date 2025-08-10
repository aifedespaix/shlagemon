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
}

/**
 * Eggs are stored as a JSON array of plain objects containing only
 * `id`, `type`, `baseId`, `rarity`, `startedAt`, and `hatchesAt`.
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
    }))
    return JSON.stringify(list)
  },
  deserialize(raw: string): StateTree {
    if (!raw)
      return { incubator: [] } as StateTree
    const list = JSON.parse(raw) as StoredEgg[]
    const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
    const incubator = list.map(e => ({
      id: e.id,
      type: e.type,
      base: baseMap[e.baseId],
      rarity: e.rarity,
      startedAt: e.startedAt,
      hatchesAt: e.hatchesAt,
    })).filter(e => e.base)
    return { incubator } as StateTree
  },
} as const
