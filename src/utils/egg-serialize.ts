import type { Serializer } from 'pinia-plugin-persistedstate'
import type { Egg } from '~/stores/egg'
import { allShlagemons } from '~/data/shlagemons'

interface StoredEgg {
  id: number
  type: Egg['type']
  baseId: string
  hatchesAt: number
}

export const eggSerializer: Serializer<Egg[]> = {
  serialize(eggs) {
    const data: StoredEgg[] = eggs.map(e => ({
      id: e.id,
      type: e.type,
      baseId: e.base.id,
      hatchesAt: e.hatchesAt,
    }))
    return JSON.stringify(data)
  },
  deserialize(raw) {
    if (!raw)
      return []
    const list = JSON.parse(raw) as StoredEgg[]
    const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
    return list.map(e => ({
      id: e.id,
      type: e.type,
      base: baseMap[e.baseId],
      hatchesAt: e.hatchesAt,
    })).filter(e => e.base)
  },
}
