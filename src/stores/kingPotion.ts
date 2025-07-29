import type { DexShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

const potions = [fabulousPotion, mysteriousPotion, specialPotion]

export const useKingPotionStore = defineStore('kingPotion', () => {
  const inventory = useInventoryStore()
  const dex = useShlagedexStore()

  const used = ref(false)

  const owned = computed(() =>
    potions.find(p => inventory.items[p.id] > 0) || null,
  )

  const power = computed(() => owned.value?.power ?? 0)

  function activate(enemy?: DexShlagemon | null) {
    if (used.value)
      return false
    const potion = owned.value
    if (!potion || !dex.activeShlagemon)
      return false
    const max = dex.maxHp(dex.activeShlagemon)
    const amount = Math.round((max * potion.power) / 100)
    if (Math.random() < 0.5) {
      dex.healActive(amount)
    }
    else if (enemy) {
      enemy.hpCurrent = Math.max(0, enemy.hpCurrent - amount)
    }
    else {
      return false
    }
    inventory.remove(potion.id)
    used.value = true
    return true
  }

  function reset() {
    used.value = false
  }

  return { owned, power, used, activate, reset }
})
