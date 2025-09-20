import type { I18nKey } from '~/type'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import type { ShlagemonType } from '~/type/shlagemonType'
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
vi.mock('~/data/items', async () => {
  const actual = await vi.importActual<typeof import('~/data/items')>('~/data/items')
  return { ...actual, allItems: [] as any[] }
})
vi.mock('~/data/shlagemons', () => ({ allShlagemons: [] }))

const dummyType: ShlagemonType = {
  id: 'normal',
  name: 'type.normal.name' as I18nKey,
  description: 'type.normal.description' as I18nKey,
  color: '#fff',
  resistance: [],
  weakness: [],
  tags: [],
  passiveEffects: [],
}

function createBase(id: string): BaseShlagemon {
  return {
    id,
    name: `${id}.name` as I18nKey,
    description: `${id}.description` as I18nKey,
    types: [dummyType],
    speciality: 'unique',
  }
}

function createDexMon(id: string, hp = 100): DexShlagemon {
  const stats = { hp, attack: 10, defense: 10, smelling: 10 }
  return {
    id,
    base: createBase(`${id}-base`),
    baseStats: stats,
    captureDate: new Date().toISOString(),
    captureCount: 1,
    lvl: 10,
    xp: 0,
    rarity: 10,
    sex: 'male',
    isShiny: false,
    hpCurrent: hp,
    allowEvolution: false,
    heldItemId: null,
    rarityFollowsLevel: false,
    isNew: false,
    busy: false,
    ...stats,
  }
}

describe('final battle store integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('restores appropriate HP values when switching during the final battle', async () => {
    const { useShlagedexStore } = await import('~/stores/shlagedex')
    const { useFinalBattleStore } = await import('~/stores/finalBattle')

    const dex = useShlagedexStore()
    const finalBattle = useFinalBattleStore()
    const alpha = createDexMon('alpha')
    const beta = createDexMon('beta')

    dex.shlagemons.push(alpha, beta)
    dex.setActiveShlagemon(alpha)
    alpha.hpCurrent = 42

    finalBattle.begin()

    dex.setActiveShlagemon(beta)
    expect(beta.hpCurrent).toBe(beta.hp)
    expect(alpha.hpCurrent).toBe(42)

    beta.hpCurrent = 55
    dex.setActiveShlagemon(alpha)
    expect(alpha.hpCurrent).toBe(42)

    alpha.hpCurrent = 10
    dex.setActiveShlagemon(beta)
    beta.hpCurrent = 80
    dex.setActiveShlagemon(alpha)
    expect(alpha.hpCurrent).toBe(10)

    finalBattle.finish()
    beta.hpCurrent = 24
    dex.setActiveShlagemon(beta)
    expect(beta.hpCurrent).toBe(24)

    finalBattle.begin()
    beta.hpCurrent = 12
    dex.setActiveShlagemon(alpha)
    expect(alpha.hpCurrent).toBe(alpha.hp)
  })
})
