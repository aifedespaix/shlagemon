import type { DexShlagemon } from '~/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { useAutoEquip } from './helpers'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

const potions = [fabulousPotion, mysteriousPotion, specialPotion]

export const useKingPotionStore = defineStore('kingPotion', () => {
  const inventory = useInventoryStore()
  const dex = useShlagedexStore()
  const audio = useAudioStore()

  const used = ref(false)

  const { current, owned, equip } = useAutoEquip(
    potions,
    id => inventory.items[id] || 0,
    (a, b) => (b.power ?? 0) - (a.power ?? 0),
  )

  const equipped = computed(() =>
    current.value ? potions.find(p => p.id === current.value) || null : null,
  )

  const power = computed(() => equipped.value?.power ?? 0)

  function activate(enemy?: DexShlagemon | null) {
    if (used.value)
      return false
    const potion = equipped.value
    if (!potion || !dex.activeShlagemon)
      return false
    const max = dex.maxHp(dex.activeShlagemon)
    const amount = Math.round((max * potion.power) / 100)
    if (Math.random() < 0.5) {
      dex.healActive(amount)
      audio.playSfx('items-KingPotion-heal')
    }
    else if (enemy) {
      enemy.hpCurrent = Math.max(0, enemy.hpCurrent - amount)
      audio.playSfx('items-KingPotion-hit')
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

  return { owned, current, equipped, power, used, equip, activate, reset }
}, {
  persist: { pick: ['current'] },
})
