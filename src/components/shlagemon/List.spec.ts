import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import { multiExp } from '~/data/items'
import List from './List.vue'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (key: string) => key }) }))

const filterStore = { search: ref(''), sortBy: ref('level'), sortAsc: ref(false) }
vi.mock('~/stores/dexFilter', () => ({ useDexFilterStore: () => filterStore }))

const featureLockStore = { isShlagedexLocked: false }
vi.mock('~/stores/featureLock', () => ({ useFeatureLockStore: () => featureLockStore }))

const shlagemons = ref<any[]>([])
const dexStore = { shlagemons, activeShlagemon: ref(null), newCount: 0, setActiveShlagemon: vi.fn(), markAllSeen: vi.fn() }
vi.mock('~/stores/shlagedex', () => ({ useShlagedexStore: () => dexStore }))

const holders = ref<Record<string, string | null>>({})
const equipmentStore = { holders, getHolder: (id: string) => holders.value[id] || null }
vi.mock('~/stores/equipment', () => ({ useEquipmentStore: () => equipmentStore }))

const inventoryStore = { items: {} as Record<string, number> }
vi.mock('~/stores/inventory', () => ({ useInventoryStore: () => inventoryStore }))

const wearableOpenSpy = vi.fn()
vi.mock('~/stores/wearableItem', () => ({ useWearableItemStore: () => ({ open: wearableOpenSpy }) }))

const openSpy = vi.fn()
vi.mock('~/stores/dexDetailModal', () => ({ useDexDetailModalStore: () => ({ open: openSpy }) }))

const type = { id: 'normal', name: 't', description: 'd', color: '#000', resistance: [], weakness: [], tags: [], passiveEffects: [] }
function createMon(heldItemId?: string) {
  return {
    id: 'm1',
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
    heldItemId,
  }
}

const stubs = {
  LayoutScrollablePanel: { template: '<div><slot name="header"></slot><slot name="content"></slot></div>' },
  UiSortControls: { template: '<div></div>' },
  UiSearchInput: { template: '<input />' },
  UiButton: { template: '<button><slot /></button>' },
  UiInfo: { template: '<div><slot /></div>' },
  ShlagemonListItem: { template: '<div></div>' },
  TransitionGroup: { template: '<div><slot /></div>' },
}

describe('shlagemon List Multi Exp button', () => {
  beforeEach(() => {
    shlagemons.value = []
    holders.value = {}
    openSpy.mockClear()
    wearableOpenSpy.mockClear()
    inventoryStore.items = {}
  })

  it('renders the multi exp button when equipped', () => {
    const mon = createMon(multiExp.id)
    shlagemons.value.push(mon)
    holders.value[multiExp.id] = mon.id
    inventoryStore.items[multiExp.id] = 1
    const wrapper = mount(List, { props: { mons: [mon], isMainShlagedex: true }, global: { stubs } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('opens the holder modal on click', async () => {
    const mon = createMon(multiExp.id)
    shlagemons.value.push(mon)
    holders.value[multiExp.id] = mon.id
    inventoryStore.items[multiExp.id] = 1
    const wrapper = mount(List, { props: { mons: [mon], isMainShlagedex: true }, global: { stubs } })
    await wrapper.find('button').trigger('click')
    expect(openSpy).toHaveBeenCalledWith(mon)
  })

  it('renders the multi exp button when owned but not equipped', () => {
    const mon = createMon()
    shlagemons.value.push(mon)
    inventoryStore.items[multiExp.id] = 1
    const wrapper = mount(List, { props: { mons: [mon], isMainShlagedex: true }, global: { stubs } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('opens the equip modal when not equipped', async () => {
    const mon = createMon()
    shlagemons.value.push(mon)
    inventoryStore.items[multiExp.id] = 1
    const wrapper = mount(List, { props: { mons: [mon], isMainShlagedex: true }, global: { stubs } })
    await wrapper.find('button').trigger('click')
    expect(wearableOpenSpy).toHaveBeenCalledWith(multiExp)
  })

  it('hides the multi exp button when item not owned', () => {
    const mon = createMon()
    shlagemons.value.push(mon)
    const wrapper = mount(List, { props: { mons: [mon], isMainShlagedex: true }, global: { stubs } })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
