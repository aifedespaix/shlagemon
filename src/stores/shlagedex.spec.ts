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
const activeLegendaryBaseId = ref<string | null>(null)
const laboratoryStoreMock = {
  beginLegendaryEncounter: (id: string) => {
    activeLegendaryBaseId.value = id
  },
  clearLegendaryEncounter: () => {
    activeLegendaryBaseId.value = null
  },
  consumeLegendaryEncounter: (id: string) => {
    if (activeLegendaryBaseId.value === id) {
      activeLegendaryBaseId.value = null
      return true
    }
    return false
  },
}
vi.mock('~/stores/laboratory', () => ({ useLaboratoryStore: () => laboratoryStoreMock }))
vi.mock('~/data/items', () => (
  new Proxy({ allItems: [] as any[] }, {
    get(target, prop: string) {
      if (prop in target)
        return (target as any)[prop]
      return { id: prop }
    },
  })
))
vi.mock('~/data/shlagemons', () => ({ allShlagemons: [] }))

export async function describeEvolutionMerge() {
  const { useShlagedexStore } = await import('./shlagedex')
  const { createDexShlagemon } = await import('~/utils/dexFactory')

  describe('shlagedex evolution merging', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
      activeLegendaryBaseId.value = null
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

    it('merges stats when capturing laboratory legendary replacements', async () => {
      const store = useShlagedexStore()
      const base: BaseShlagemon = {
        id: 'lab-target',
        name: 'lab-target',
        description: 'lab-target',
        types: [],
        speciality: 'unique',
      }

      const existing = createDexShlagemon(base, false, 50, 50, 50)
      existing.isShiny = false
      store.shlagemons.push(existing)

      laboratoryStoreMock.beginLegendaryEncounter(base.id)

      const enemy = createDexShlagemon(base, true, 200, 100, 100)
      const result = store.captureEnemy(enemy)

      expect(result).toBe(existing)
      expect(existing.captureCount).toBe(2)
      expect(existing.isShiny).toBe(true)
      expect(existing.rarity).toBe(100)
      expect(existing.lvl).toBe(200)
      expect(existing.hpCurrent).toBe(store.maxHp(existing))
      expect(laboratoryStoreMock.consumeLegendaryEncounter(base.id)).toBe(false)
    })
  })
}
