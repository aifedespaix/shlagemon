import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import {
  applyStats,
  baseStats,
  createDexShlagemon,
  statWithRarityAndCoefficient,
  xpForLevel,
} from '~/utils/dexFactory'
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
    return mon
  }

  function captureShlagemon(base: BaseShlagemon) {
    const existing = shlagemons.value.find(mon => mon.base.id === base.id)
    if (existing) {
      if (existing.rarity < 100)
        existing.rarity += 1
      existing.lvl = 1
      existing.xp = 0
      existing.hp = statWithRarityAndCoefficient(
        baseStats.hp,
        existing.base.coefficient,
        existing.rarity,
      )
      existing.attack = statWithRarityAndCoefficient(
        baseStats.attack,
        existing.base.coefficient,
        existing.rarity,
      )
      existing.defense = statWithRarityAndCoefficient(
        baseStats.defense,
        existing.base.coefficient,
        existing.rarity,
      )
      existing.smelling = statWithRarityAndCoefficient(
        baseStats.smelling,
        existing.base.coefficient,
        existing.rarity,
      )
      applyStats(existing)
      existing.hpCurrent = existing.hp
      return existing
    }
    return createShlagemon(base)
  }

  return { shlagemons, activeShlagemon, addShlagemon, setActiveShlagemon, setShlagemons, reset, createShlagemon, captureShlagemon, gainXp, healActive, boostDefense }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
