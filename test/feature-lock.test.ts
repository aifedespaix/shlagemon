import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import InventoryPanel from '../src/components/panel/Inventory.vue'
import ZonePanel from '../src/components/panel/Zone.vue'
import ShlagemonList from '../src/components/shlagemon/List.vue'
import { potion } from '../src/data/items'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useFeatureLockStore } from '../src/stores/featureLock'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('feature lock flags', () => {
  it('disables zone buttons when zones are locked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const featureLock = useFeatureLockStore()
    featureLock.lockZones()
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia], provide: { selectZone: vi.fn() } },
    })
    await wrapper.vm.$nextTick()
    const savageButtons = wrapper.findAll('#savages button')
    const villageButtons = wrapper.findAll('#villages button')
    const buttons = [...savageButtons, ...villageButtons]
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
  })

  it('disables Shlagédex selection when locked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    dex.createShlagemon(carapouffe)
    const featureLock = useFeatureLockStore()
    featureLock.lockShlagedex()
    const wrapper = mount(ShlagemonList, {
      props: { mons: dex.shlagemons, showCheckbox: true },
      global: { plugins: [pinia] },
    })
    await wrapper.vm.$nextTick()
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).not.toBeUndefined()
  })

  it('keeps Shlagédex selection enabled when explicitly unlocked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    dex.createShlagemon(carapouffe)
    const featureLock = useFeatureLockStore()
    featureLock.lockShlagedex()
    const wrapper = mount(ShlagemonList, {
      props: { mons: dex.shlagemons, showCheckbox: true, locked: false },
      global: { plugins: [pinia] },
    })
    await wrapper.vm.$nextTick()
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBeUndefined()
  })

  it('disables inventory actions when locked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const inventory = useInventoryStore()
    inventory.add(potion.id)
    const featureLock = useFeatureLockStore()
    featureLock.lockInventory()
    const wrapper = mount(InventoryPanel, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button[disabled]')
    expect(button.exists()).toBe(true)
  })
})
