import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
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
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add('special-potion')
    store.equip('special-potion')
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const half = Math.round(dex.maxHp(mon) / 2)
    mon.hpCurrent = half
    store.activate(enemy)
    expect(mon.hpCurrent).toBeGreaterThan(half)
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const before = mon.hpCurrent
    const result = store.activate(enemy)
    expect(result).toBe(false)
    expect(mon.hpCurrent).toBe(before)
    vi.useRealTimers()
  })

  it('damages the enemy when unlucky', async () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const store = useKingPotionStore()
    const mon = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    inventory.add('special-potion')
    await nextTick()
    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    const before = enemy.hpCurrent
    store.activate(enemy)
    expect(enemy.hpCurrent).toBeLessThan(before)
    vi.useRealTimers()
  })

  it('auto-equips a potion when bought without one equipped', async () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const store = useKingPotionStore()

    expect(store.current).toBeNull()

    inventory.add('mysterious-potion')
    await nextTick()

    expect(store.current).toBe('mysterious-potion')
  })

  it('equips the next best potion after using the last one', async () => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const store = useKingPotionStore()
    const mon = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)

    inventory.add('fabulous-potion')
    inventory.add('special-potion')
    await nextTick()
    expect(store.current).toBe('fabulous-potion')

    store.activate(enemy)
    await nextTick()
    expect(store.current).toBe('special-potion')

    store.reset()
    store.activate(enemy)
    await nextTick()
    expect(store.current).toBeNull()
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
    const enemy = dex.createShlagemon(carapouffe)
    const store = useKingPotionStore()
    store.equip('special-potion')
    const wrapper = mount(KingPotionButton, {
      props: { enemy },
      global: { plugins: [pinia], stubs: ['UiButton'] },
    })
    const spy = vi.spyOn(store, 'activate')
    await wrapper.trigger('pointerdown')
    vi.advanceTimersByTime(1000)
    await wrapper.trigger('pointerup')
    expect(spy).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
