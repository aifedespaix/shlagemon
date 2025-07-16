import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Shlagedex from '../src/components/panel/Shlagedex.vue'
import { jeunebelette } from '../src/data/shlagemons/01-05/jeunebelette'
import { rouxPasCool } from '../src/data/shlagemons/01-05/rouxPasCool'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useDexFilterStore } from '../src/stores/dexFilter'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('shlagedex sort evolution', () => {
  it('orders by distance to evolution', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const filter = useDexFilterStore()

    const item = createDexShlagemon(pikachiant, false, 1, 10)
    const ready = createDexShlagemon(carapouffe, false, 1, 20)
    const near = createDexShlagemon(jeunebelette, false, 1, 4)
    const disabled = createDexShlagemon(rouxPasCool, false, 1, 20)
    disabled.allowEvolution = false

    dex.addShlagemon(item)
    dex.addShlagemon(ready)
    dex.addShlagemon(near)
    dex.addShlagemon(disabled)

    filter.sortBy = 'evolution'
    filter.sortAsc = true

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
    expect(items.length).toBe(4)
    expect(items[0].text()).toContain('Pikachiant')
    expect(items[1].text()).toContain('Carapouffe')
    expect(items[2].text()).toContain('Jeunebelette')
    expect(items[3].text()).toContain('Roux pas Cool')
  })
})
