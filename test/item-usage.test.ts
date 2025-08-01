import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { attackPotion, defensePotion } from '../src/data/items'
import { useInventoryStore } from '../src/stores/inventory'
import { useItemUsageStore } from '../src/stores/itemUsage'

describe('item usage store', () => {
  it('marks all owned items as used', () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const usage = useItemUsageStore()
    inventory.add(attackPotion.id)
    inventory.add(defensePotion.id, 2)
    usage.markAllUsed()
    expect(usage.unusedItemCount).toBe(0)
  })
})
