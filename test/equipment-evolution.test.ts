import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { multiExp, thunderStone } from '../src/data/items/items'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import raichiotte from '../src/data/shlagemons/evolutions/raichiotte'
import { useEquipmentStore } from '../src/stores/equipment'
import { useEvolutionStore } from '../src/stores/evolution'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('equipment on evolution', () => {
  it('keeps unique item on evolved species', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const inventory = useInventoryStore()
    const equipment = useEquipmentStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)

    inventory.add(multiExp.id)
    const target = dex.createShlagemon(raichiotte)
    const mon = dex.createShlagemon(pikachiant)

    equipment.equip(mon.id, multiExp.id)

    const result = await dex.evolveWithItem(mon, thunderStone)
    expect(result).toBe(true)

    expect(mon.heldItemId).toBeNull()
    const holder = equipment.getHolder(multiExp.id)
    const qty = inventory.items[multiExp.id] || 0
    expect(holder === target.id || qty === 1).toBe(true)
  })
})
