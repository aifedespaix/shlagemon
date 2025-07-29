import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { useInventoryStore } from './inventory'
import { useShlagedexStore } from './shlagedex'

const potions = [fabulousPotion, mysteriousPotion, specialPotion]

export const useKingPotionStore = defineStore('kingPotion', () => {
  const inventory = useInventoryStore()
  const dex = useShlagedexStore()
  const audio = useAudioStore()

  const used = ref(false)
  const current = ref<string | null>(null)

  const owned = computed(() =>
    potions.filter(p => (inventory.items[p.id] || 0) > 0),
  )

  const equipped = computed(() =>
    current.value ? potions.find(p => p.id === current.value) || null : null,
  )

  const power = computed(() => equipped.value?.power ?? 0)

  function equip(id: string) {
    if (owned.value.some(p => p.id === id))
      current.value = id
  }

  function activate() {
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
    else {
      dex.activeShlagemon.hpCurrent = Math.max(0, dex.activeShlagemon.hpCurrent - amount)
      audio.playSfx('items-KingPotion-hit')
    }
    inventory.remove(potion.id)
    used.value = true
    current.value = null
    return true
  }

  function reset() {
    used.value = false
  }

  return { owned, current, equipped, power, used, equip, activate, reset }
}, {
  persist: { pick: ['current'] },
})
