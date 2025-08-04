import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BattleShlagemon from '../src/components/battle/Shlagemon.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('battle shlagemon faint visibility', () => {
  it('emits faintEnd immediately when document is hidden', async () => {
    const original = Object.getOwnPropertyDescriptor(document, 'visibilityState')
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })

    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)

    const wrapper = mount(BattleShlagemon, {
      props: { mon, hp: 10, fainted: false },
      global: {
        plugins: [pinia],
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

    await wrapper.setProps({ fainted: true })
    await nextTick()

    expect(wrapper.emitted('faintEnd')).toBeTruthy()

    wrapper.unmount()
    if (original)
      Object.defineProperty(document, 'visibilityState', original)
  })
})
