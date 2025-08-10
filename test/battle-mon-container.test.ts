import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import BattleMonContainer from '../src/components/battle/mon/Container.vue'
import BattleMonImageWithFaint from '../src/components/battle/mon/ImageWithFaint.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('battle mon container', () => {
  it('relays faint end event', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: { components: { battle: { Shlagemon: { infoTooltip: 'info', ownedTooltip: 'owned', damageTaken: '-{amount}', healedFor: '+{amount}' } } } } } })
    const wrapper = mount(BattleMonContainer, {
      props: { mon, hp: 10, fainted: true },
      global: {
        plugins: [pinia, i18n],
        stubs: {
          BattleMonStatusBadges: true,
          BattleMonHeldItemIcon: true,
          BattleMonInfoButton: true,
          BattleMonLevelIndicator: true,
          BattleMonHPPanel: true,
          BattleMonNameRow: true,
          BattleMonFloatingNumbers: true,
          ShlagemonImage: { template: '<div />' },
        },
        directives: { tooltip: () => {} },
      },
    })
    wrapper.findComponent(BattleMonImageWithFaint).vm.$emit('faintAnimEnd')
    expect(wrapper.emitted()).toHaveProperty('faintEnd')
  })
})
