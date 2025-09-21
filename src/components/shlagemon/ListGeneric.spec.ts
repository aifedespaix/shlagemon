import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import ListGeneric from './ListGeneric.vue'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (key: string) => key }) }))

const filterStore = { search: ref(''), sortBy: ref('level'), sortAsc: ref(true) }
vi.mock('~/stores/dexFilter', () => ({ useDexFilterStore: () => filterStore }))

const featureLockStore = { isShlagedexLocked: false }
vi.mock('~/stores/featureLock', () => ({ useFeatureLockStore: () => featureLockStore }))

const laboratoryStore = { isLegendaryBattleActive: false }
vi.mock('~/stores/laboratory', () => ({ useLaboratoryStore: () => laboratoryStore }))

const shlagemons = ref<any[]>([])
const dexStore = { shlagemons, newCount: 0, markAllSeen: vi.fn() }
vi.mock('~/stores/shlagedex', () => ({ useShlagedexStore: () => dexStore }))

const stubs = {
  LayoutScrollablePanel: { template: '<div><slot name="header"/><slot name="content"/></div>' },
  UiSortControls: { template: '<div></div>' },
  UiSearchInput: { template: '<input />' },
  UiInfo: { template: '<div><slot /></div>' },
  ShlagemonListItem: { template: '<div class="item" @click="$emit(\'click\')" @activate="$emit(\'activate\')" />' },
  TransitionGroup: { template: '<div><slot /></div>' },
}

const type = { id: 'normal', name: 't', description: 'd', color: '#000', resistance: [], weakness: [], tags: [], passiveEffects: [] }
function createMon(id = 'm1') {
  return {
    id,
    base: { id: 'b1', name: 'test', description: 'd', types: [type], speciality: 'unique' },
    baseStats: { hp: 1, attack: 1, defense: 1, smelling: 1 },
    captureDate: '2024-01-01',
    captureCount: 1,
    lvl: 1,
    xp: 0,
    rarity: 1,
    sex: 'male',
    isShiny: false,
    hpCurrent: 1,
    allowEvolution: false,
    hp: 1,
    attack: 1,
    defense: 1,
    smelling: 1,
    heldItemId: undefined,
  }
}

describe('listGeneric', () => {
  it('uses store shlagemons and emits events', async () => {
    const mon = createMon()
    shlagemons.value = [mon]
    const wrapper = mount(ListGeneric, { global: { stubs } })

    const item = wrapper.find('.item')
    expect(item.exists()).toBe(true)

    await item.trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([mon])

    await item.trigger('activate')
    expect(wrapper.emitted('activate')?.[0]).toEqual([mon])
  })
})
