import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import QuickSelect from '../src/components/shlagemon/QuickSelect.vue'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('shlagemonQuickSelect selectsActive', () => {
  it('does not change active when selectsActive is false', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const active = dex.createShlagemon(pikachiant)
    const target = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(active)

    const wrapper = mount(QuickSelect, {
      props: { selectsActive: false },
      shallow: true,
    })

    ;(wrapper.vm as any).choose(target)

    expect(dex.activeShlagemon?.id).toBe(active.id)
  })

  it('changes active when selectsActive is true', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const active = dex.createShlagemon(pikachiant)
    const target = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(active)

    const wrapper = mount(QuickSelect, {
      shallow: true,
    })

    ;(wrapper.vm as any).choose(target)

    expect(dex.activeShlagemon?.id).toBe(target.id)
  })
})
