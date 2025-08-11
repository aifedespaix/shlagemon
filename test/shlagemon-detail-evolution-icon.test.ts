import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'

import ShlagemonDetail from '../src/components/shlagemon/Detail.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { carabifle } from '../src/data/shlagemons/evolutions/carabifle'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('shlagemon detail evolution icon', () => {
  it('displays shlageball icon when evolution is owned', () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const dex = useShlagedexStore()
    const mon = createDexShlagemon(carapouffe)
    const evo = createDexShlagemon(carabifle)
    dex.shlagemons.push(mon, evo)

    const messages = {
      en: {
        components: {
          shlagemon: {
            Detail: { evolveByLevel: 'Level {level}' },
          },
        },
      },
    }

    const i18n = createI18n({ legacy: false, locale: 'en', messages })

    const wrapper = mount(ShlagemonDetail, {
      props: { mon },
      global: {
        plugins: [pinia, i18n],
        stubs: {
          ShlagemonImage: true,
          ShlagemonType: true,
          WearableItemIcon: true,
          ShlagemonStats: true,
          ShlagemonXpBar: true,
          ShlagemonRarityInfo: true,
          UiButton: true,
          UiCheckBox: true,
        },
        directives: { tooltip: () => {} },
      },
    })

    const button = wrapper.findAll('button').find(b => b.text().includes('Level'))
    expect(button).toBeTruthy()
    expect(button!.find('img').attributes('src')).toBe('/items/shlageball/shlageball.webp')
  })
})
