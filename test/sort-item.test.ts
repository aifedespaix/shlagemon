import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Shlagedex from '../src/components/panel/Shlagedex.vue'
import { potion } from '../src/data/items'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useDexFilterStore } from '../src/stores/dexFilter'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('shlagedex sort item', () => {
  it('displays shlagemons with items first', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const filter = useDexFilterStore()
    const withoutItem = dex.createShlagemon(carapouffe, false)
    const withItem = dex.createShlagemon(sacdepates, false)
    withItem.heldItemId = potion.id
    filter.sortBy = 'item'
    const wrapper = mount(Shlagedex, {
      global: {
        plugins: [pinia],
        stubs: [
          'ShlagemonImage',
          'ShlagemonType',
          'Modal',
          'SearchInput',
          'SelectOption',
          'CheckBox',
          'MultiExpIcon',
        ],
      },
    })

    const items = wrapper.findAll('div.relative')
    expect(items.length).toBe(2)
    // Active Shlagemon should remain first regardless of sort
    expect(items[0].text()).toContain(withoutItem.base.name)
    expect(items[1].text()).toContain(withItem.base.name)
  })
})
