import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Shlagedex from '../src/components/panel/Shlagedex.vue'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('shlagedex double click', () => {
  it('activates shlagemon on double click', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
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
        ],
      },
    })
    const item = wrapper.find('div.relative')
    await item.trigger('click')
    await item.trigger('click')
    expect(dex.activeShlagemon?.id).toBe(mon.id)
  })
})
