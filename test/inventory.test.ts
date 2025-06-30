import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('inventory actions', () => {
  it('heals active shlagemon with potion', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)
    mon.hpCurrent = 10
    inventory.add('potion')
    const result = inventory.useItem('potion')
    expect(result).toBe(true)
    expect(mon.hpCurrent).toBeGreaterThan(10)
  })

  it('captures shlagemon with shlageball', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const dex = useShlagedexStore()
    const count = dex.shlagemons.length
    inventory.add('shlageball')
    const result = inventory.useItem('shlageball')
    expect(result).toBe(true)
    expect(dex.shlagemons.length).toBe(count + 1)
  })
})
