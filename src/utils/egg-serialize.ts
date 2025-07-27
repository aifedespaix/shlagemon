import type { Serializer } from 'pinia-plugin-persistedstate'
import type { Egg } from '~/stores/egg'
import { allShlagemons } from '~/data/shlagemons'

interface StoredEgg {
  id: number
  type: Egg['type']
  baseId: string
  startedAt: number
  hatchesAt: number
}

export const eggSerializer = {
  serialize(data: { incubator: Egg[] }): string {
    const eggs = data.incubator || []
    const list: StoredEgg[] = eggs.map(e => ({
      id: e.id,
      type: e.type,
      baseId: e.base.id,
      startedAt: e.startedAt,
      hatchesAt: e.hatchesAt,
    }))
    return JSON.stringify(list)
  },
  deserialize(raw: string): { incubator: Egg[] } {
    if (!raw)
      return { incubator: [] }
    const list = JSON.parse(raw) as StoredEgg[]
    const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
    const incubator = list.map(e => ({
      id: e.id,
      type: e.type,
      base: baseMap[e.baseId],
      startedAt: e.startedAt,
      hatchesAt: e.hatchesAt,
    })).filter(e => e.base)
    return { incubator }
  },
} as unknown as Serializer
