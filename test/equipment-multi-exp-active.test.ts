import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { multiExp } from '../src/data/items'
import { attackRing } from '../src/data/items/wearables/attackRing'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useEquipmentStore } from '../src/stores/equipment'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('equipping multi exp', () => {
  it('keeps the current active shlagemon when equipped to another shlagemon', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const equipment = useEquipmentStore()

    const active = dex.createShlagemon(pikachiant)
    const holder = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(active)
    inventory.add(multiExp.id)

    equipment.equip(holder.id, multiExp.id)

    expect(dex.activeShlagemon?.id).toBe(active.id)
  })

  it('sets the target shlagemon active when equipping other items', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const equipment = useEquipmentStore()

    const active = dex.createShlagemon(pikachiant)
    const holder = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(active)
    inventory.add(attackRing.id)

    equipment.equip(holder.id, attackRing.id)

    expect(dex.activeShlagemon?.id).toBe(holder.id)
  })
})
