import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { multiExp } from '../src/data/items/items'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { useEquipmentStore } from '../src/stores/equipment'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('equipment on release', () => {
  it('returns held item to inventory when releasing a shlagemon', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const equipment = useEquipmentStore()

    inventory.add(multiExp.id)
    const mon = dex.createShlagemon(pikachiant)
    equipment.equip(mon.id, multiExp.id)

    dex.releaseShlagemon(mon)

    expect(inventory.items[multiExp.id]).toBe(1)
    expect(equipment.getHolder(multiExp.id)).toBeNull()
  })
})
