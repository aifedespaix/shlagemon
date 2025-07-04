import type { Item } from '~/type/item'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { zonesData } from '~/data/zones'
import {
  applyStats,
  baseStats,
  createDexShlagemon,
  statWithRarityAndCoefficient,
  xpForLevel,
} from '~/utils/dexFactory'
import { shlagedexSerializer } from '~/utils/shlagedex-serialize'
import { useEvolutionStore } from './evolution'
import { useZoneProgressStore } from './zoneProgress'

export const useShlagedexStore = defineStore('shlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)
  const highestLevel = ref(0)
  const progress = useZoneProgressStore()

  const xpZones = computed(() => zonesData.filter(z => z.maxLevel > 0))

  function canAccess(z: Zone) {
    if (z.type === 'village')
      return z.minLevel <= highestLevel.value
    const idx = xpZones.value.findIndex(x => x.id === z.id)
    if (idx === 0)
      return highestLevel.value >= z.minLevel
    const prev = xpZones.value[idx - 1]
    return highestLevel.value >= z.minLevel && progress.isKingDefeated(prev.id)
  }

  const accessibleZones = computed(() => zonesData.filter(z => canAccess(z)))

  function collectEvolutionIds(base: BaseShlagemon, ids: Set<string>, visited: Set<string>) {
    if (visited.has(base.id))
      return
    visited.add(base.id)
    ids.add(base.id)
    if (base.evolution)
      collectEvolutionIds(base.evolution.base, ids, visited)
  }

  const completableIds = computed(() => {
    const ids = new Set<string>()
    const visited = new Set<string>()
    for (const z of accessibleZones.value)
      z.shlagemons?.forEach(m => collectEvolutionIds(m, ids, visited))
    return ids
  })

  const completableCount = computed(() => completableIds.value.size)
  const averageLevel = computed(() =>
    shlagemons.value.length
      ? shlagemons.value.reduce((s, m) => s + m.lvl, 0) / shlagemons.value.length
      : 0,
  )
  const completionPercent = computed(() =>
    completableCount.value
      ? (shlagemons.value.length / completableCount.value) * 100
      : 0,
  )
  const bonusPercent = computed(
    () => averageLevel.value * 2 * (completionPercent.value / 100),
  )
  const bonusMultiplier = computed(() => 1 + bonusPercent.value / 100)

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

  const evolutionStore = useEvolutionStore()

  function applyEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    const existing = shlagemons.value.find(m => m.base.id === to.id && m.id !== mon.id)
    if (existing) {
      existing.captureCount += 1
      if (existing.rarity < 100) {
        existing.rarity += 1
        toast(`${existing.base.name} atteint la rareté ${existing.rarity} !`)
      }
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
      const index = shlagemons.value.findIndex(m => m.id === mon.id)
      if (index !== -1)
        shlagemons.value.splice(index, 1)
      if (activeShlagemon.value?.id === mon.id)
        activeShlagemon.value = existing
      recomputeHighestLevel()
    }
    else {
      mon.base = to
      mon.baseStats = {
        hp: statWithRarityAndCoefficient(baseStats.hp, mon.base.coefficient, mon.rarity),
        attack: statWithRarityAndCoefficient(baseStats.attack, mon.base.coefficient, mon.rarity),
        defense: statWithRarityAndCoefficient(baseStats.defense, mon.base.coefficient, mon.rarity),
        smelling: statWithRarityAndCoefficient(baseStats.smelling, mon.base.coefficient, mon.rarity),
      }
      applyStats(mon)
      mon.hpCurrent = mon.hp
      mon.captureDate = new Date().toISOString()
      mon.captureCount = 1
      toast(`${mon.base.name} a évolué !`)
    }
  }

  async function checkEvolution(mon: DexShlagemon) {
    const evo = mon.base.evolution
    if (!evo)
      return
    if (evo.condition.type !== 'lvl' || mon.lvl < evo.condition.value)
      return
    if (!mon.allowEvolution)
      return
    const accepted = await evolutionStore.requestEvolution(mon, evo.base)
    if (!accepted)
      return
    applyEvolution(mon, evo.base)
  }

  async function evolveWithItem(mon: DexShlagemon, item: Item) {
    const evo = mon.base.evolution
    if (!evo || evo.condition.type !== 'item' || evo.condition.value.id !== item.id)
      return false
    if (!mon.allowEvolution)
      return false
    const accepted = await evolutionStore.requestEvolution(mon, evo.base)
    if (!accepted)
      return false
    applyEvolution(mon, evo.base)
    return true
  }

  async function gainXp(
    mon: DexShlagemon,
    amount: number,
    maxLevel = 100,
    healPercent = 100,
  ) {
    if (mon.lvl >= maxLevel)
      return
    mon.xp += amount
    while (mon.lvl < maxLevel && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      const prevHp = mon.hpCurrent
      applyStats(mon)
      const healAmount = Math.round((mon.hp * healPercent) / 100)
      mon.hpCurrent = Math.min(mon.hp, prevHp + healAmount)
      updateHighestLevel(mon)
      await checkEvolution(mon)
    }
    if (mon.lvl >= maxLevel)
      mon.xp = 0
  }

  function createShlagemon(base: BaseShlagemon, shiny = false) {
    const mon = createDexShlagemon(base, shiny)
    mon.captureDate = new Date().toISOString()
    mon.captureCount = 1
    addShlagemon(mon)
    updateHighestLevel(mon)
    toast(`Tu as obtenu ${base.name} !`)
    return mon
  }

  function captureShlagemon(base: BaseShlagemon, shiny = false) {
    const existing = shlagemons.value.find(mon => mon.base.id === base.id)
    if (existing) {
      existing.captureCount += 1
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
      captureDate: new Date().toISOString(),
      captureCount: 1,
    }
    addShlagemon(captured)
    updateHighestLevel(captured)
    toast(`Tu as obtenu ${captured.base.name} !`)
    return captured
  }

function releaseShlagemon(mon: DexShlagemon) {
  const index = shlagemons.value.findIndex(m => m.id === mon.id)
  if (index === -1)
    return
  shlagemons.value.splice(index, 1)
  if (activeShlagemon.value?.id === mon.id)
    activeShlagemon.value = shlagemons.value[0] || null
  recomputeHighestLevel()
  toast(`${mon.base.name} a été relâché !`)
}

return {
  shlagemons,
  activeShlagemon,
  highestLevel,
  averageLevel,
  completionPercent,
  bonusPercent,
  bonusMultiplier,
  addShlagemon,
  setActiveShlagemon,
  setShlagemons,
  reset,
  createShlagemon,
  captureShlagemon,
  captureEnemy,
  releaseShlagemon,
  gainXp,
  healActive,
  boostDefense,
  evolveWithItem,
}

}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
