import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Shlagedex from '../src/components/panel/Shlagedex.vue'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
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
    // The first item is the active Shlagemon
    expect(items[1].text()).toContain('Sac de Pâtes')
  })
})
