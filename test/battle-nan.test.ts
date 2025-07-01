import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import BattleMain from '../src/components/battle/BattleMain.vue'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'

describe('battle NaN bug', () => {
  it('should not produce NaN hp or level', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const zone = useZoneStore()
    dex.createShlagemon(carapouffe)
    zone.setZone('plaine')
    const wrapper = mount(BattleMain, {
      global: { plugins: [pinia], stubs: ['ProgressBar', 'ImageByBackground'] },
    })
    await Promise.resolve()
    vi.runOnlyPendingTimers()
    const text = wrapper.text()
    expect(text).not.toContain('NaN')
    wrapper.unmount()
    vi.useRealTimers()
  })
})
