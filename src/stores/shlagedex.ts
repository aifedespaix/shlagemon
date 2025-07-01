import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { applyStats, createDexShlagemon, xpForLevel } from '~/utils/dexFactory'
import { shlagedexSerializer } from '~/utils/shlagedex-serialize'

export const useShlagedexStore = defineStore('shlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)

  function addShlagemon(mon: DexShlagemon) {
    shlagemons.value.push(mon)
    if (!activeShlagemon.value)
      activeShlagemon.value = mon
  }

  function setActiveShlagemon(mon: DexShlagemon) {
    activeShlagemon.value = mon
  }

  function setShlagemons(mons: DexShlagemon[]) {
    shlagemons.value = [...mons]
  }

  function reset() {
    shlagemons.value = []
    activeShlagemon.value = null
  }

  function healActive(amount: number) {
    if (!activeShlagemon.value)
      return
    activeShlagemon.value.hpCurrent = Math.min(
      activeShlagemon.value.hp,
      activeShlagemon.value.hpCurrent + amount,
    )
  }

  function boostDefense(amount: number, duration = 10000) {
    if (!activeShlagemon.value)
      return
    activeShlagemon.value.defense += amount
    setTimeout(() => {
      if (activeShlagemon.value)
        activeShlagemon.value.defense -= amount
    }, duration)
  }

  function gainXp(mon: DexShlagemon, amount: number) {
    mon.xp += amount
    while (mon.lvl < 100 && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      applyStats(mon)
      mon.hpCurrent = mon.hp
    }
  }

  function createShlagemon(base: BaseShlagemon) {
    const mon = createDexShlagemon(base)
    addShlagemon(mon)
    toast(`Tu as obtenu ${base.name} !`)
    return mon
  }

  return { shlagemons, activeShlagemon, addShlagemon, setActiveShlagemon, setShlagemons, reset, createShlagemon, gainXp, healActive, boostDefense }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
