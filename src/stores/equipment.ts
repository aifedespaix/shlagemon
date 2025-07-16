import { defineStore } from 'pinia'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

export const useEquipmentStore = defineStore('equipment', () => {
  const holders = ref<Record<string, string | null>>({})
  const dex = useShlagedexStore()
  const inventory = useInventoryStore()

  function equip(monId: string, itemId: string) {
    const mon = dex.shlagemons.find(m => m.id === monId)
    if (!mon)
      return
    if (mon.heldItemId) {
      holders.value[mon.heldItemId] = null
      inventory.add(mon.heldItemId)
      if (mon.heldItemId === 'vitality-ring') {
        const max = dex.maxHp(mon)
        if (mon.hpCurrent > max)
          mon.hpCurrent = max
      }
    }
    const current = holders.value[itemId]
    if (current) {
      const other = dex.shlagemons.find(m => m.id === current)
      if (other) {
        other.heldItemId = null
        if (itemId === 'vitality-ring') {
          const max = dex.maxHp(other)
          if (other.hpCurrent > max)
            other.hpCurrent = max
        }
      }
    }
    mon.heldItemId = itemId
    holders.value[itemId] = monId
    inventory.remove(itemId)
    if (itemId === 'vitality-ring')
      mon.hpCurrent = dex.maxHp(mon)
  }

  function unequip(monId: string) {
    const mon = dex.shlagemons.find(m => m.id === monId)
    if (!mon || !mon.heldItemId)
      return
    const itemId = mon.heldItemId
    mon.heldItemId = null
    holders.value[itemId] = null
    inventory.add(itemId)
    if (itemId === 'vitality-ring') {
      const max = dex.maxHp(mon)
      if (mon.hpCurrent > max)
        mon.hpCurrent = max
    }
  }

  function unequipItem(itemId: string) {
    const holderId = holders.value[itemId]
    if (!holderId)
      return
    const mon = dex.shlagemons.find(m => m.id === holderId)
    if (mon) {
      mon.heldItemId = null
      if (itemId === 'vitality-ring') {
        const max = dex.maxHp(mon)
        if (mon.hpCurrent > max)
          mon.hpCurrent = max
      }
    }
    holders.value[itemId] = null
    inventory.add(itemId)
  }

  function getHolder(itemId: string) {
    return holders.value[itemId] || null
  }

  return { holders, equip, unequip, unequipItem, getHolder }
}, {
  persist: true,
})
