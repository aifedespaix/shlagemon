import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import BattleShlagemon from '../src/components/battle/Shlagemon.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useDexDetailModalStore } from '../src/stores/dexDetailModal'
import { useDexInfoModalStore } from '../src/stores/dexInfoModal'
import { useShlagedexStore } from '../src/stores/shlagedex'

const messages = { en: { components: { battle: { Shlagemon: { infoTooltip: 'info' } } } } }

describe('battle shlagemon info button', () => {
  it('opens detail modal when shlagemon is owned', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const detailModal = useDexDetailModalStore()
    const spy = vi.spyOn(detailModal, 'open')
    const mon = dex.createShlagemon(carapouffe)

    const i18n = createI18n({ legacy: false, locale: 'en', messages })

    const wrapper = mount(BattleShlagemon, {
      props: { mon, hp: 10, owned: true },
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

    await wrapper.find('button').trigger('click')
    expect(spy).toHaveBeenCalledWith(mon)
  })

  it('opens info modal when shlagemon is not owned', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const infoModal = useDexInfoModalStore()
    const spy = vi.spyOn(infoModal, 'open')
    const mon = dex.createShlagemon(carapouffe)

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

    await wrapper.find('button').trigger('click')
    expect(spy).toHaveBeenCalledWith(mon)
  })
})
