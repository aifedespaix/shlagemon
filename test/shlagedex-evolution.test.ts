import type { Item } from '~/type/item'
import type { BaseShlagemon } from '~/type/shlagemon'
import { createPinia, setActivePinia } from 'pinia'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

vi.mock('~/modules/i18n', () => ({ i18n: { global: { t: (key: string) => key } } }))
vi.mock('~/modules/toast', () => ({ toast: vi.fn() }))
vi.mock('~/stores/audio', () => ({ useAudioStore: () => ({ playSfx: vi.fn() }) }))
vi.mock('~/stores/disease', () => ({ useDiseaseStore: () => ({ active: false }) }))
vi.mock('~/stores/equipment', () => ({ useEquipmentStore: () => ({ equip: vi.fn(), unequip: vi.fn() }) }))
vi.mock('~/stores/evolution', () => ({ useEvolutionStore: () => ({ requestEvolution: vi.fn().mockResolvedValue(true) }) }))
vi.mock('~/stores/wildLevel', () => ({ useWildLevelStore: () => ({}) }))
vi.mock('~/stores/zoneAccess', () => ({ useZoneAccess: () => ({ accessibleZones: ref([]) }) }))
vi.mock('~/data/items', async (importOriginal) => {
  const actual: any = await importOriginal()
  return { ...actual, allItems: [] }
})
vi.mock('~/data/shlagemons', () => ({ allShlagemons: [] }))

describe('shlagedex evolution merging', () => {
  let useShlagedexStore: any
  let createDexShlagemon: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    useShlagedexStore = (await import('~/stores/shlagedex')).useShlagedexStore
    createDexShlagemon = (await import('~/utils/dexFactory')).createDexShlagemon
  })

  it('keeps shiny status and highest rarity when evolving into an existing form', async () => {
    const stone: Item = { id: 'stone', name: 'stone', description: 'stone' }
    const targetBase: BaseShlagemon = {
      id: 'target',
      name: 'target',
      description: 'target',
      types: [],
      speciality: 'unique',
    }
    const sourceBase: BaseShlagemon = {
      id: 'source',
      name: 'source',
      description: 'source',
      types: [],
      speciality: 'unique',
      evolutions: [
        { base: targetBase, condition: { type: 'item', value: stone } },
      ],
    }

    const store = useShlagedexStore()
    const existing = createDexShlagemon(targetBase, false, 5, 30, 30)
    existing.isShiny = false
    store.shlagemons.push(existing)

    const mon = createDexShlagemon(sourceBase, true, 5, 40, 40)
    mon.isShiny = true
    store.shlagemons.push(mon)

    await store.evolveWithItem(mon, stone)

    expect(store.shlagemons).toHaveLength(1)
    const merged = store.shlagemons[0]
    expect(merged.isShiny).toBe(true)
    expect(merged.rarity).toBe(40)
  })
})
