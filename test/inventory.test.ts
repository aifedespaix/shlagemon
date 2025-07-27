import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { potion, shlageball } from '../src/data/items'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useCaptureLimitModalStore } from '../src/stores/captureLimitModal'
import { useInventoryStore } from '../src/stores/inventory'
import { usePlayerStore } from '../src/stores/player'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('inventory actions', () => {
  it('heals active shlagemon with potion', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    mon.hpCurrent = 10
    inventory.add(potion.id)
    const result = inventory.useItem(potion.id)
    expect(result).toBe(true)
    expect(mon.hpCurrent).toBeGreaterThan(10)
  })

  it('captures shlagemon with shlageball', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const count = dex.shlagemons.length
    inventory.add(shlageball.id)
    const result = inventory.useItem(shlageball.id)
    expect(result).toBe(true)
    expect(dex.shlagemons.length).toBe(count + 1)
  })

  it('respects capture level cap when using balls', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const player = usePlayerStore()
    const modal = useCaptureLimitModalStore()

    player.captureLevelCap = 0
    inventory.add(shlageball.id)
    const result = inventory.useItem(shlageball.id)

    expect(result).toBe(false)
    expect(dex.shlagemons.length).toBe(0)
    expect(modal.isVisible).toBe(true)
    expect(modal.requiredLevel).toBeGreaterThan(player.captureLevelCap)
  })
})
