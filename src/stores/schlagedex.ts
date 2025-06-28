import type { BaseShlagemon } from '~/data/shlagemons'
import type { DexShlagemon } from '~/types/shlagemon'
import { defineStore } from 'pinia'
import { applyStats, createDexShlagemon, xpForLevel } from '~/utils/dexFactory'

export const useSchlagedexStore = defineStore('schlagedex', () => {
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

  function clear() {
    shlagemons.value = []
  }

  function gainXp(mon: DexShlagemon, amount: number) {
    mon.xp += amount
    while (mon.lvl < 100 && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      applyStats(mon)
    }
  }

  function createShlagemon(base: BaseShlagemon) {
    const mon = createDexShlagemon(base)
    addShlagemon(mon)
    return mon
  }

  return { shlagemons, activeShlagemon, addShlagemon, setActiveShlagemon, setShlagemons, clear, createShlagemon, gainXp }
}, {
  persist: true,
})
