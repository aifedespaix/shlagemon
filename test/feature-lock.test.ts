import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import InventoryPanel from '../src/components/panels/InventoryPanel.vue'
import ZonePanel from '../src/components/panels/ZonePanel.vue'
import ShlagemonList from '../src/components/shlagemon/ShlagemonList.vue'
import { carapouffe } from '../src/data/shlagemons'
import { useFeatureLockStore } from '../src/stores/featureLock'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('feature lock flags', () => {
  it('disables zone buttons when zones are locked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const featureLock = useFeatureLockStore()
    featureLock.lockZones()
    const wrapper = mount(ZonePanel, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('div.zone-grid button')
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

  it('disables inventory actions when locked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const inventory = useInventoryStore()
    inventory.add('potion')
    const featureLock = useFeatureLockStore()
    featureLock.lockInventory()
    const wrapper = mount(InventoryPanel, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button[disabled]')
    expect(button.exists()).toBe(true)
  })
})
