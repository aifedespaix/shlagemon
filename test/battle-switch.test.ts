import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import BattleMain from '../src/components/battle/BattleMain.vue'
import { carapouffe, salamiches } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('battleMain switch', () => {
  it('updates hp when active shlagemon changes', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon1 = dex.createShlagemon(carapouffe)
    const mon2 = dex.createShlagemon(salamiches)
    dex.setActiveShlagemon(mon1)
    const wrapper = mount(BattleMain, {
      global: {
        plugins: [pinia],
        stubs: ['ProgressBar', 'ImageByBackground'],
      },
    })
    await nextTick()
    let hpDisplay = wrapper.findAll('.hp').at(0)!.text()
    expect(hpDisplay).toContain(String(mon1.hp))
    dex.setActiveShlagemon(mon2)
    await nextTick()
    hpDisplay = wrapper.findAll('.hp').at(0)!.text()
    expect(hpDisplay).toContain(String(mon2.hp))
    wrapper.unmount()
    vi.useRealTimers()
  })
})
