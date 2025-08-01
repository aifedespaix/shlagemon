import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import InventoryPanel from '../src/components/panel/Inventory.vue'
import { attackPotion, capturePotion, odorElixir } from '../src/data/items'
import { useInventoryStore } from '../src/stores/inventory'

describe('inventory tab badges', () => {
  it('shows the number of undiscovered items per category', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const inventory = useInventoryStore()
    inventory.add(odorElixir.id)
    inventory.add(attackPotion.id)
    inventory.add(capturePotion.id)

    const wrapper = mount(InventoryPanel, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('nav button')
    expect(buttons[0].text()).toContain('1')
    expect(buttons[1].text()).toContain('2')
  })
})
