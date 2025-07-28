import { defineStore } from 'pinia'
import { computed } from 'vue'
import { fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

const potions = [fabulousPotion, mysteriousPotion, specialPotion]

export const useKingPotionStore = defineStore('kingPotion', () => {
  const inventory = useInventoryStore()
  const dex = useShlagedexStore()

  const owned = computed(() =>
    potions.find(p => inventory.items[p.id] > 0) || null,
  )

  const power = computed(() => owned.value?.power ?? 0)

  function activate() {
    const potion = owned.value
    if (!potion || !dex.activeShlagemon)
      return false
    const max = dex.maxHp(dex.activeShlagemon)
    const amount = Math.round((max * potion.power) / 100)
    if (Math.random() < 0.5)
      dex.healActive(amount)
    else
      dex.activeShlagemon.hpCurrent = Math.max(0, dex.activeShlagemon.hpCurrent - amount)
    return true
  }

  return { owned, power, activate }
})
