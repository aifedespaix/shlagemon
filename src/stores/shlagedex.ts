import type { ActiveEffect } from '~/type/effect'
import type { Item } from '~/type/item'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { allShlagemons } from '~/data/shlagemons'
import {
  applyCurrentStats,
  applyStats,
  createDexShlagemon,
  xpForLevel,
  xpRewardForLevel,
} from '~/utils/dexFactory'
import { shlagedexSerializer } from '~/utils/shlagedex-serialize'
import { useAudioStore } from './audio'
import { useDiseaseStore } from './disease'
import { useEquipmentStore } from './equipment'
import { useEvolutionStore } from './evolution'
import { useZoneAccess } from './zoneAccess'

export const useShlagedexStore = defineStore('shlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)
  const highestLevel = ref(0)
  const effects = ref<ActiveEffect[]>([])
  const zoneStore = useZoneStore()
  const audio = useAudioStore()
  const disease = useDiseaseStore()
  const equipment = useEquipmentStore()
  const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
  cleanupEffects()
  watchEffect(cleanupEffects)
  // Vérifie chaque seconde si les effets ont expiré pour retirer icône et bonus
  setInterval(cleanupEffects, 1000)

  function rarityToastMessage(name: string, rarityGain: number, levelLoss: number) {
    const point = rarityGain > 1 ? 'points' : 'point'
    const level = levelLoss > 1 ? 'niveaux' : 'niveau'
    return `${name} gagne ${rarityGain} ${point} de rareté et perd ${levelLoss} ${level} !`
  }

  const {
    accessibleZones,
    accessibleXpZones,
  } = useZoneAccess(highestLevel)

  const accessibleShopLevel = computed(() =>
    accessibleZones.value
      .filter(z => z.village?.shop)
      .reduce((m, z) => Math.max(m, z.village!.shop!.level), 0),
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

  const xpBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'xp')
    return effect?.percent || 0
  })

  const xpWearableBonus = (id: string | undefined) => {
    if (!id)
      return 0
    if (id === 'xp-ring')
      return 15
    if (id === 'advanced-xp-ring')
      return 25
    if (id === 'xp-amulet')
      return 33
    return 0
  }

  const attackBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'attack')
    return effect?.percent || 0
  })

  const attackWearableBonus = (id: string | undefined) => {
    if (!id)
      return 0
    if (id === 'attack-ring')
      return 15
    if (id === 'advanced-attack-ring')
      return 25
    if (id === 'attack-amulet')
      return 33
    return 0
  }

  const defenseBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'defense')
    return effect?.percent || 0
  })

  const defenseWearableBonus = (id: string | undefined) => {
    if (!id)
      return 0
    if (id === 'defense-ring')
      return 15
    if (id === 'advanced-defense-ring')
      return 25
    if (id === 'defense-amulet')
      return 33
    return 0
  }

  const vitalityBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'vitality')
    return effect?.percent || 0
  })

  const vitalityWearableBonus = (id: string | undefined) => {
    if (!id)
      return 0
    if (id === 'vitality-ring')
      return 15
    if (id === 'advanced-vitality-ring')
      return 25
    if (id === 'vitality-amulet')
      return 33
    return 0
  }

  const captureBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'capture')
    return effect?.percent || 0
  })

  function effectiveAttack(mon: DexShlagemon): number {
    const bonus = attackBonusPercent.value + attackWearableBonus(mon.heldItemId)
    return Math.round(mon.attack * (1 + bonus / 100))
  }

  function effectiveDefense(mon: DexShlagemon): number {
    const bonus = defenseBonusPercent.value + defenseWearableBonus(mon.heldItemId)
    return Math.round(mon.defense * (1 + bonus / 100))
  }

  function maxHp(mon: DexShlagemon): number {
    const isActive = activeShlagemon.value?.id === mon.id
    let bonus = isActive ? vitalityBonusPercent.value : 0
    bonus += vitalityWearableBonus(mon.heldItemId)
    return Math.round(mon.hp * (1 + bonus / 100))
  }

  function xpGainForLevel(level: number): number {
    const base = xpRewardForLevel(level)
    return Math.floor(base * (1 + xpBonusPercent.value / 100))
  }

  function updateCoefficient(
    mon: DexShlagemon,
    zoneId?: string,
    heal = true,
    force = false,
  ) {
    if (!force && mon.rarity !== 100)
      return
    const target = zoneId ? { id: zoneId } : zoneStore.getZoneForLevel(mon.lvl)
    if (!target)
      return
    const rank = zoneStore.getZoneRank(target.id)
    const baseCoef = mon.lvl + 1
    const newCoef = baseCoef * rank
    mon.coefficient = newCoef
    applyCurrentStats(mon)
    if (heal)
      mon.hpCurrent = maxHp(mon)
  }

  function updateHighestLevel(mon: DexShlagemon) {
    if (mon.lvl > highestLevel.value)
      highestLevel.value = mon.lvl
  }

  function recomputeHighestLevel() {
    highestLevel.value = shlagemons.value.reduce((max, m) => Math.max(max, m.lvl), 0)
  }

  watch(accessibleXpZones, () => {
    shlagemons.value.forEach(updateCoefficient)
  })

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
    const max = maxHp(activeShlagemon.value)
    activeShlagemon.value.hpCurrent = Math.min(
      max,
      activeShlagemon.value.hpCurrent + amount,
    )
  }

  function removeEffect(id: number) {
    const idx = effects.value.findIndex(e => e.id === id)
    if (idx === -1)
      return
    const effect = effects.value[idx]
    if (effect.timeoutId !== undefined) {
      clearTimeout(effect.timeoutId)
    }
    effects.value.splice(idx, 1)
    if (effect.type === 'vitality' && activeShlagemon.value) {
      const max = maxHp(activeShlagemon.value)
      if (activeShlagemon.value.hpCurrent > max)
        activeShlagemon.value.hpCurrent = max
    }
  }

  function cleanupEffects() {
    const now = Date.now()
    effects.value.slice().forEach((e) => {
      if (e.expiresAt <= now)
        removeEffect(e.id)
    })
  }

  function clearEffects() {
    effects.value.slice().forEach(e => removeEffect(e.id))
  }

  function boostDefense(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
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
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'defense',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
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
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'attack',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
      timeoutId: setTimeout(() => removeEffect(id), duration),
    }
    effects.value.push(effect)
  }

  function boostVitality(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
    const now = Date.now()
    const existing = effects.value.find(e => e.type === 'vitality')
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
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'vitality',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
      timeoutId: setTimeout(() => removeEffect(id), duration),
    }
    effects.value.push(effect)
  }

  function boostXp(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
    const now = Date.now()
    const existing = effects.value.find(e => e.type === 'xp')
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
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'xp',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
      amount: 0,
      timeoutId: setTimeout(() => removeEffect(id), duration),
    }
    effects.value.push(effect)
  }

  function boostCapture(
    percent: number,
    icon?: string,
    iconClass?: string,
    duration = 600000,
  ) {
    cleanupEffects()
    const now = Date.now()
    const existing = effects.value.find(e => e.type === 'capture')
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
    const id = Date.now() + Math.random()
    const effect: ActiveEffect = {
      id,
      type: 'capture',
      percent,
      icon,
      iconClass,
      expiresAt: now + duration,
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
        if (existing.rarity === 100)
          audio.playSfx('/audio/sfx/rarity-100.ogg')
        toast(`${existing.base.name} atteint la rareté ${existing.rarity} !`)
      }
      existing.lvl = 1
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      if (mon.heldItemId) {
        const itemId = mon.heldItemId
        equipment.unequip(mon.id)
        equipment.equip(existing.id, itemId)
      }
      if (mon.isShiny)
        existing.isShiny = true
      const index = shlagemons.value.findIndex(m => m.id === mon.id)
      if (index !== -1)
        shlagemons.value.splice(index, 1)
      if (activeShlagemon.value?.id === mon.id)
        activeShlagemon.value = existing
      recomputeHighestLevel()
      updateCoefficient(existing, zoneStore.current.id, true, true)
    }
    else {
      mon.base = to
      applyStats(mon)
      applyCurrentStats(mon)
      mon.hpCurrent = maxHp(mon)
      mon.captureDate = new Date().toISOString()
      mon.captureCount = 1
      toast(`${mon.base.name} a évolué !`)
      updateCoefficient(mon, zoneStore.current.id, true, true)
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
    const bonus = xpWearableBonus(mon.heldItemId)
    if (bonus)
      amount = Math.round(amount * (1 + bonus / 100))
    mon.xp += amount
    while (mon.lvl < maxLevel && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      audio.playSfx('/audio/sfx/lvl-up.ogg')
      const prevHp = mon.hpCurrent
      if (mon.rarity === 100)
        updateCoefficient(mon, undefined, false)
      applyCurrentStats(mon)
      const healAmount = Math.round((mon.hp * healPercent) / 100)
      mon.hpCurrent = Math.min(mon.hp, prevHp + healAmount)
      updateHighestLevel(mon)
      const before = mon.base.id
      await checkEvolution(mon)
      if (mon.base.id === before && mon.rarity === 100)
        updateCoefficient(mon, undefined, false)
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
    updateCoefficient(mon)
    toast(`Tu as obtenu ${base.name} !`)
    return mon
  }

  function captureShlagemon(base: BaseShlagemon, shiny = false) {
    const existing = shlagemons.value.find(mon => mon.base.id === base.id)
    if (existing) {
      if (existing.rarity >= 100) {
        toast('Vous avez déjà ce Shlagémon au maximum de sa rareté')
        return existing
      }
      const incoming = createDexShlagemon(base, shiny)
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
      const before = existing.rarity
      existing.rarity = Math.min(existing.rarity, 100)
      if (before < 100 && existing.rarity === 100)
        audio.playSfx('/audio/sfx/rarity-100.ogg')
      if (incoming.isShiny)
        existing.isShiny = true
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      updateHighestLevel(existing)
      updateCoefficient(existing)
      toast(rarityToastMessage(existing.base.name, rarityGain, levelLoss))
      return existing
    }
    const incoming = createDexShlagemon(base, shiny)
    incoming.captureDate = new Date().toISOString()
    incoming.captureCount = 1
    addShlagemon(incoming)
    updateHighestLevel(incoming)
    updateCoefficient(incoming)
    if (incoming.rarity === 100)
      audio.playSfx('/audio/sfx/rarity-100.ogg')
    toast(`Tu as obtenu ${incoming.base.name} !`)
    return incoming
  }

  function captureEnemy(enemy: DexShlagemon) {
    const existing = shlagemons.value.find(mon => mon.base.id === enemy.base.id)
    if (existing) {
      if (existing.rarity >= 100) {
        toast('Vous avez déjà ce Shlagémon au maximum de sa rareté')
        return existing
      }
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
      const before = existing.rarity
      existing.rarity = Math.min(existing.rarity, 100)
      if (before < 100 && existing.rarity === 100)
        audio.playSfx('/audio/sfx/rarity-100.ogg')
      existing.isShiny ||= enemy.isShiny
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      updateHighestLevel(existing)
      updateCoefficient(existing)
      toast(rarityToastMessage(existing.base.name, rarityGain, levelLoss))
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
    updateCoefficient(captured)
    if (captured.rarity === 100)
      audio.playSfx('/audio/sfx/rarity-100.ogg')
    toast(`Tu as obtenu ${captured.base.name} !`)
    return captured
  }

  function releaseShlagemon(mon: DexShlagemon) {
    const index = shlagemons.value.findIndex(m => m.id === mon.id)
    if (index === -1)
      return
    equipment.unequip(mon.id)
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
    boostVitality,
    boostXp,
    boostCapture,
    effectiveAttack,
    effectiveDefense,
    maxHp,
    xpGainForLevel,
    captureBonusPercent,
    clearEffects,
    effects,
    evolveWithItem,
  }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
  },
})
