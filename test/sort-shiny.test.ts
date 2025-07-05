import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Shlagedex from '../src/components/shlagemon/Shlagedex.vue'
import { carapouffe, sacdepates } from '../src/data/shlagemons'
import { useDexFilterStore } from '../src/stores/dexFilter'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('shlagedex sort', () => {
  it('displays shiny shlagemons first', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const filter = useDexFilterStore()
    dex.createShlagemon(carapouffe, false)
    dex.createShlagemon(sacdepates, true)
    filter.sortBy = 'shiny'
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
    expect(items[0].text()).toContain('Sac de Pâtes')
  })
})
