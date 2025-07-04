import type { ActiveEffect } from '~/type/effect'
import type { Item } from '~/type/item'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { allShlagemons } from '~/data/shlagemons'
import { shops } from '~/data/shops'
import { zonesData } from '~/data/zones'
import {
  applyStats,
  baseStats,
  createDexShlagemon,
  statWithRarityAndCoefficient,
  xpForLevel,
} from '~/utils/dexFactory'
import { shlagedexSerializer } from '~/utils/shlagedex-serialize'
import { useDiseaseStore } from './disease'
import { useEvolutionStore } from './evolution'
import { useZoneProgressStore } from './zoneProgress'

export const useShlagedexStore = defineStore('shlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)
  const highestLevel = ref(0)
  const effects = ref<ActiveEffect[]>([])
  const progress = useZoneProgressStore()
  const disease = useDiseaseStore()
  const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
  cleanupEffects()
  watchEffect(cleanupEffects)

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
  const accessibleShopLevel = computed(() =>
    shops
      .filter(s => accessibleZones.value.some(z => z.id === s.id))
      .reduce((m, s) => Math.max(m, s.level), 0),
  )

  const accessibleBaseIds = computed(() => {
    const ids = new Set<string>()
    for (const z of accessibleZones.value)
      z.shlagemons?.forEach(m => ids.add(m.id))
    if (accessibleShopLevel.value >= 50 && baseMap.pikachiant)
      ids.add('pikachiant')
    return ids
  })

  const capturedBaseIds = computed(() => new Set(shlagemons.value.map(m => m.base.id)))

  const potentialCompletionPercent = computed(() => {
    const total = accessibleBaseIds.value.size
    if (!total)
      return 0
    let captured = 0
    for (const id of accessibleBaseIds.value) {
      if (capturedBaseIds.value.has(id))
        captured += 1
    }
    return (captured / total) * 100
  })

  const completionPercent = computed(() => {
    const total = allShlagemons.length
    const captured = shlagemons.value.length

    return (captured / total) * 100
  })

  const averageLevel = computed(() =>
    shlagemons.value.length
      ? shlagemons.value.reduce((s, m) => s + m.lvl, 0) / shlagemons.value.length
      : 0,
  )
  const bonusPercent = computed(
    () => averageLevel.value * 2 * (potentialCompletionPercent.value / 100),
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
    if (disease.active)
      return
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

  function removeEffect(id: number) {
    const idx = effects.value.findIndex(e => e.id === id)
    if (idx === -1)
      return
    const effect = effects.value[idx]
    if (effect.timeoutId !== undefined)
      clearTimeout(effect.timeoutId)
    effects.value.splice(idx, 1)
    if (!activeShlagemon.value)
      return
    if (effect.type === 'attack')
      activeShlagemon.value.attack -= effect.amount
    else if (effect.type === 'defense')
      activeShlagemon.value.defense -= effect.amount
  }

  function cleanupEffects() {
    const now = Date.now()
    effects.value.slice().forEach((e) => {
      if (e.expiresAt <= now)
        removeEffect(e.id)
    })
  }

  function boostDefense(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
    if (!activeShlagemon.value)
      return
    const now = Date.now()
    const existing = effects.value.find(e => e.type === 'defense')
    if (existing) {
      if (existing.percent === percent) {
        existing.expiresAt += duration
        if (existing.timeoutId !== undefined)
          clearTimeout(existing.timeoutId)
        existing.timeoutId = setTimeout(() => removeEffect(existing.id), existing.expiresAt - now)
        return
      }
      removeEffect(existing.id)
    }
    const amount = Math.floor(activeShlagemon.value.defense * percent / 100)
    activeShlagemon.value.defense += amount
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'defense',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
      amount,
      timeoutId: setTimeout(() => removeEffect(id), duration),
    }
    effects.value.push(effect)
  }

  function boostAttack(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
    if (!activeShlagemon.value)
      return
    const now = Date.now()
    const existing = effects.value.find(e => e.type === 'attack')
    if (existing) {
      if (existing.percent === percent) {
        existing.expiresAt += duration
        if (existing.timeoutId !== undefined)
          clearTimeout(existing.timeoutId)
        existing.timeoutId = setTimeout(() => removeEffect(existing.id), existing.expiresAt - now)
        return
      }
      removeEffect(existing.id)
    }
    const amount = Math.floor(activeShlagemon.value.attack * percent / 100)
    activeShlagemon.value.attack += amount
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'attack',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
      amount,
      timeoutId: setTimeout(() => removeEffect(id), duration),
    }
    effects.value.push(effect)
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
    const incoming = createDexShlagemon(base, shiny)
    if (existing) {
      existing.captureCount += 1
      let rarityGain = 1
      let levelLoss = 1
      if (incoming.rarity > existing.rarity) {
        rarityGain = incoming.rarity - existing.rarity
        levelLoss = rarityGain
        existing.rarity = incoming.rarity
      }
      else if (existing.rarity < 100) {
        existing.rarity += 1
      }
      existing.rarity = Math.min(existing.rarity, 100)
      if (incoming.isShiny)
        existing.isShiny = true
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
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
      toast(
        `${existing.base.name} gagne ${rarityGain} points de rareté et perd ${levelLoss} niveaux !`,
      )
      return existing
    }
    incoming.captureDate = new Date().toISOString()
    incoming.captureCount = 1
    addShlagemon(incoming)
    updateHighestLevel(incoming)
    toast(`Tu as obtenu ${incoming.base.name} !`)
    return incoming
  }

  function captureEnemy(enemy: DexShlagemon) {
    const existing = shlagemons.value.find(mon => mon.base.id === enemy.base.id)
    if (existing) {
      existing.captureCount += 1
      let rarityGain = 1
      let levelLoss = 1
      if (enemy.rarity > existing.rarity) {
        rarityGain = enemy.rarity - existing.rarity
        levelLoss = rarityGain
        existing.rarity = enemy.rarity
      }
      else if (existing.rarity < 100) {
        existing.rarity += 1
      }
      existing.rarity = Math.min(existing.rarity, 100)
      existing.isShiny ||= enemy.isShiny
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
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
      toast(
        `${existing.base.name} gagne ${rarityGain} points de rareté et perd ${levelLoss} niveaux !`,
      )
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
    completionPercent,
    shlagemons,
    activeShlagemon,
    highestLevel,
    accessibleBaseIds,
    capturedBaseIds,
    averageLevel,
    potentialCompletionPercent,
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
    boostAttack,
    effects,
    evolveWithItem,
  }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
