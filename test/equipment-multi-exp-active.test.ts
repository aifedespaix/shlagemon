import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { multiExp } from '../src/data/items'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { useEquipmentStore } from '../src/stores/equipment'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('equipping multi exp', () => {
  it('does not change the active shlagemon', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const equipment = useEquipmentStore()

    const active = dex.createShlagemon(pikachiant)
    const holder = dex.createShlagemon(pikachiant)
    dex.setActiveShlagemon(active)
    inventory.add(multiExp.id)

    equipment.equip(holder.id, multiExp.id)

    expect(dex.activeShlagemon?.id).toBe(active.id)
  })
})
