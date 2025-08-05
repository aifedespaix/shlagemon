import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import BattleShlagemon from '../src/components/battle/Shlagemon.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

const messages = { en: { components: { battle: { Shlagemon: { infoTooltip: 'info' } } } } }

describe('battle shlagemon shiny name', () => {
  it('adds rainbow class when shlagemon is shiny', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.isShiny = true

    const i18n = createI18n({ legacy: false, locale: 'en', messages })

    const wrapper = mount(BattleShlagemon, {
      props: { mon, hp: 10 },
      global: {
        plugins: [pinia, i18n],
        stubs: {
          EffectBadge: true,
          DiseaseBadge: true,
          InventoryWearableItemIcon: true,
          ShlagemonImage: true,
          UiProgressBar: true,
        },
        directives: { tooltip: () => {} },
      },
    })

    expect(wrapper.get('span.font-bold').classes()).toContain('shiny-text')
  })
})
