import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import KingPotionButton from '../src/components/battle/KingPotionButton.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useInventoryStore } from '../src/stores/inventory'
import { useKingPotionStore } from '../src/stores/kingPotion'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('king potion', () => {
  it('heals or damages according to power', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const store = useKingPotionStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add('special-potion')
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const half = Math.round(dex.maxHp(mon) / 2)
    mon.hpCurrent = half
    store.activate()
    expect(mon.hpCurrent).toBeGreaterThan(half)
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const before = mon.hpCurrent
    const result = store.activate()
    expect(result).toBe(false)
    expect(mon.hpCurrent).toBe(before)
    vi.useRealTimers()
  })

  it('activates on hold', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add('special-potion')
    const wrapper = mount(KingPotionButton, {
      global: { plugins: [pinia], stubs: ['UiButton'] },
    })
    const store = useKingPotionStore()
    const spy = vi.spyOn(store, 'activate')
    await wrapper.trigger('pointerdown')
    vi.advanceTimersByTime(1000)
    await wrapper.trigger('pointerup')
    expect(spy).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
