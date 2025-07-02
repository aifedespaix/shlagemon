import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
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
  const highestLevel = ref(0)

  function updateHighestLevel(mon: DexShlagemon) {
    if (mon.lvl > highestLevel.value)
      highestLevel.value = mon.lvl
  }

  function recomputeHighestLevel() {
    highestLevel.value = shlagemons.value.reduce((max, m) => Math.max(max, m.lvl), 0)
  }

  function addShlagemon(mon: DexShlagemon) {
    shlagemons.value.push(mon)
    if (!activeShlagemon.value)
      activeShlagemon.value = mon
    updateHighestLevel(mon)
  }

  function setActiveShlagemon(mon: DexShlagemon) {
    activeShlagemon.value = mon
  }

  function setShlagemons(mons: DexShlagemon[]) {
    shlagemons.value = [...mons]
    recomputeHighestLevel()
  }

  function reset() {
    shlagemons.value = []
    activeShlagemon.value = null
    highestLevel.value = 0
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

  function gainXp(mon: DexShlagemon, amount: number, maxLevel = 100) {
    if (mon.lvl >= maxLevel)
      return
    mon.xp += amount
    while (mon.lvl < maxLevel && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      applyStats(mon)
      mon.hpCurrent = mon.hp
      updateHighestLevel(mon)
    }
    if (mon.lvl >= maxLevel)
      mon.xp = 0
  }

  function createShlagemon(base: BaseShlagemon, shiny = false) {
    const mon = createDexShlagemon(base, shiny)
    addShlagemon(mon)
    updateHighestLevel(mon)
    toast(`Tu as obtenu ${base.name} !`)
    return mon
  }

  function captureShlagemon(base: BaseShlagemon, shiny = false) {
    const existing = shlagemons.value.find(mon => mon.base.id === base.id)
    if (existing) {
      if (existing.rarity < 100) {
        existing.rarity += 1
        toast(`${existing.base.name} atteint la rareté ${existing.rarity} !`)
      }
      if (shiny)
        existing.isShiny = true
      existing.lvl = 1
      existing.xp = 0
      existing.baseStats = {
        hp: statWithRarityAndCoefficient(
          baseStats.hp,
          existing.base.coefficient,
          existing.rarity,
        ),
        attack: statWithRarityAndCoefficient(
          baseStats.attack,
          existing.base.coefficient,
          existing.rarity,
        ),
        defense: statWithRarityAndCoefficient(
          baseStats.defense,
          existing.base.coefficient,
          existing.rarity,
        ),
        smelling: statWithRarityAndCoefficient(
          baseStats.smelling,
          existing.base.coefficient,
          existing.rarity,
        ),
      }
      applyStats(existing)
      existing.hpCurrent = existing.hp
      updateHighestLevel(existing)
      return existing
    }
    const created = createShlagemon(base, shiny)
    updateHighestLevel(created)
    return created
  }

  function captureEnemy(enemy: DexShlagemon) {
    const existing = shlagemons.value.find(mon => mon.base.id === enemy.base.id)
    if (existing) {
      if (existing.rarity < 100) {
        existing.rarity += 1
        toast(`${existing.base.name} atteint la rareté ${existing.rarity} !`)
      }
      existing.isShiny ||= enemy.isShiny
      existing.lvl = 1
      existing.xp = 0
      existing.baseStats = {
        hp: statWithRarityAndCoefficient(baseStats.hp, existing.base.coefficient, existing.rarity),
        attack: statWithRarityAndCoefficient(baseStats.attack, existing.base.coefficient, existing.rarity),
        defense: statWithRarityAndCoefficient(baseStats.defense, existing.base.coefficient, existing.rarity),
        smelling: statWithRarityAndCoefficient(baseStats.smelling, existing.base.coefficient, existing.rarity),
      }
      applyStats(existing)
      existing.hpCurrent = existing.hp
      updateHighestLevel(existing)
      return existing
    }
    const captured: DexShlagemon = {
      ...enemy,
      id: crypto.randomUUID(),
      hpCurrent: enemy.hp,
    }
    addShlagemon(captured)
    updateHighestLevel(captured)
    toast(`Tu as obtenu ${captured.base.name} !`)
    return captured
  }

  return { shlagemons, activeShlagemon, highestLevel, addShlagemon, setActiveShlagemon, setShlagemons, reset, createShlagemon, captureShlagemon, captureEnemy, gainXp, healActive, boostDefense }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
