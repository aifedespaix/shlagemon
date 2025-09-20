import type { Stoppable } from '@vueuse/core'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { I18nKey } from '~/type'
import type { ActiveEffect } from '~/type/effect'
import type { Item, WearableItem } from '~/type/item'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { allItems } from '~/data/items'
import { allShlagemons } from '~/data/shlagemons'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { useWildLevelStore } from '~/stores/wildLevel'
import {
  applyCurrentStats,
  applyStats,
  createDexShlagemon,
  xpForLevel,
  xpRewardForLevel,
} from '~/utils/dexFactory'
import { shlagedexSerializer } from '~/utils/shlagedex-serialize'
import { generateUuid } from '~/utils/uuid'

export const useShlagedexStore = defineStore('shlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)
  const highestLevel = ref(0)
  const effects = ref<ActiveEffect[]>([])
  const audio = useAudioStore()
  const disease = useDiseaseStore()
  const equipment = useEquipmentStore()
  const laboratory = useLaboratoryStore()
  const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))
  const newCount = computed(() => shlagemons.value.filter(m => m.isNew).length)
  cleanupEffects()
  watchEffect(cleanupEffects)
  // Vérifie chaque seconde si les effets ont expiré pour retirer icône et bonus
  useIntervalFn(cleanupEffects, 1000)

  function rarityToastMessage(name: I18nKey, rarityGain: number, levelLoss: number) {
    const point = i18n.global.t('stores.shlagedex.point', rarityGain)
    const level = i18n.global.t('stores.shlagedex.level', levelLoss)
    return i18n.global.t('stores.shlagedex.rarityChanged', {
      name: i18n.global.t(name),
      rarityGain,
      levelLoss,
      point,
      level,
    })
  }

  const {
    accessibleZones,
  } = useZoneAccess(highestLevel)
  const wildLevel = useWildLevelStore()

  const accessibleShopLevel = computed(() =>
    accessibleZones.value
      .filter(z => z.type === 'village' && Object.values(z.pois).some(p => p.type === 'shop'))
      .reduce((m, z) => Math.max(m, z.minLevel), 0),
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
  // Reduced global bonus by a factor of 10 for better balancing
  const bonusPercent = computed(
    () => averageLevel.value * 2 * (potentialCompletionPercent.value / 100) / 10,
  )
  const bonusMultiplier = computed(() => 1 + bonusPercent.value / 100)

  const xpBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'xp')
    return effect?.percent || 0
  })

  function wearableBonus(
    id: string | null | undefined,
    type: WearableItem['effectType'],
  ) {
    if (!id)
      return 0
    const item = allItems.find(i => i.id === id) as WearableItem | undefined
    if (item && item.wearable && item.effectType === type)
      return item.percent
    return 0
  }

  const attackBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'attack')
    return effect?.percent || 0
  })

  const defenseBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'defense')
    return effect?.percent || 0
  })

  const vitalityBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'vitality')
    return effect?.percent || 0
  })

  const captureBonusPercent = computed(() => {
    const effect = effects.value.find(e => e.type === 'capture')
    return effect?.percent || 0
  })

  function effectiveAttack(mon: DexShlagemon): number {
    const bonus = attackBonusPercent.value
      + wearableBonus(mon.heldItemId, 'attack')
    return Math.round(mon.attack * (1 + bonus / 100))
  }

  /**
   * Compute the current defense value for a shlagemon.
   *
   * Bonuses from active potions and equipped items are applied and the
   * result is floored to avoid inflating the statistic.
   */
  function effectiveDefense(mon: DexShlagemon): number {
    const bonus = defenseBonusPercent.value
      + wearableBonus(mon.heldItemId, 'defense')
    return Math.floor(mon.defense * (1 + bonus / 100))
  }

  function maxHp(mon: DexShlagemon): number {
    const isActive = activeShlagemon.value?.id === mon.id
    let bonus = isActive ? vitalityBonusPercent.value : 0
    bonus += wearableBonus(mon.heldItemId, 'vitality')
    return Math.round(mon.hp * (1 + bonus / 100))
  }

  function xpGainForLevel(level: number): number {
    const base = xpRewardForLevel(level)
    return Math.floor(base * (1 + xpBonusPercent.value / 100))
  }

  function updateHighestLevel(mon: DexShlagemon) {
    if (mon.lvl > highestLevel.value)
      highestLevel.value = mon.lvl
  }

  function recomputeHighestLevel() {
    highestLevel.value = shlagemons.value.reduce((max, m) => Math.max(max, m.lvl), 0)
  }

  /**
   * Play the rarity 100 sound effect when a Shlagémon crosses the threshold.
   *
   * @param mon - The concerned Shlagémon.
   * @param previous - Rarity value before the change.
   */
  function maybePlayRaritySfx(mon: DexShlagemon, previous: number) {
    if (previous < 100 && mon.rarity >= 100)
      audio.playSfx('rarity-100')
  }

  function addShlagemon(mon: DexShlagemon) {
    if (mon.isNew === undefined)
      mon.isNew = true
    shlagemons.value.push(mon)
    if (!activeShlagemon.value)
      activeShlagemon.value = mon
    updateHighestLevel(mon)
  }

  function markSeen(mon: DexShlagemon) {
    mon.isNew = false
  }

  function markAllSeen() {
    shlagemons.value.forEach((m) => {
      m.isNew = false
    })
  }

  function setActiveShlagemon(mon: DexShlagemon) {
    if (disease.active || mon.busy)
      return
    activeShlagemon.value = mon
    markSeen(mon)
  }

  /**
   * Toggle the busy state of a Shlagémon and switch the active entry when
   * necessary.
   */
  function setBusy(id: string, value: boolean) {
    const mon = shlagemons.value.find(m => m.id === id)
    if (!mon)
      return
    mon.busy = value
    if (value && activeShlagemon.value?.id === id) {
      const start = shlagemons.value.findIndex(m => m.id === id) + 1
      const rotated = shlagemons.value.slice(start).concat(shlagemons.value.slice(0, start))
      const next = rotated.find(m => !m.busy) || null
      activeShlagemon.value = next
    }
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
    effect.timeout?.stop?.()
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
        existing.timeout?.stop?.()
        existing.timeout = useTimeoutFn(() => removeEffect(existing.id), existing.expiresAt - now) as Stoppable
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
      timeout: useTimeoutFn(() => removeEffect(id), duration) as Stoppable,
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
        existing.timeout?.stop?.()
        existing.timeout = useTimeoutFn(() => removeEffect(existing.id), existing.expiresAt - now) as Stoppable
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
      timeout: useTimeoutFn(() => removeEffect(id), duration) as Stoppable,
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
        existing.timeout?.stop?.()
        existing.timeout = useTimeoutFn(() => removeEffect(existing.id), existing.expiresAt - now) as Stoppable
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
      timeout: useTimeoutFn(() => removeEffect(id), duration) as Stoppable,
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
        existing.timeout?.stop?.()
        existing.timeout = useTimeoutFn(() => removeEffect(existing.id), existing.expiresAt - now) as Stoppable
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
      timeout: useTimeoutFn(() => removeEffect(id), duration) as Stoppable,
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
        existing.timeout?.stop?.()
        existing.timeout = useTimeoutFn(() => removeEffect(existing.id), existing.expiresAt - now) as Stoppable
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
      timeout: useTimeoutFn(() => removeEffect(id), duration) as Stoppable,
    }
    effects.value.push(effect)
  }

  function applyOdorElixir(mon: DexShlagemon) {
    if (mon.rarityFollowsLevel)
      return
    mon.rarityFollowsLevel = true
    const before = mon.rarity
    mon.rarity = mon.lvl
    maybePlayRaritySfx(mon, before)
    applyStats(mon)
    applyCurrentStats(mon)
  }

  const evolutionStore = useEvolutionStore()

  function applyEvolution(mon: DexShlagemon, to: BaseShlagemon) {
    const existing = shlagemons.value.find(m => m.base.id === to.id && m.id !== mon.id)
    if (existing) {
      existing.captureCount += 1
      const previousRarity = existing.rarity
      existing.isShiny ||= mon.isShiny
      existing.rarity = Math.max(existing.rarity, mon.rarity)
      if (existing.rarity !== previousRarity) {
        maybePlayRaritySfx(existing, previousRarity)
        toast(i18n.global.t('stores.shlagedex.rarityReached', {
          name: i18n.global.t(existing.base.name),
          rarity: existing.rarity,
        }))
      }
      applyStats(existing)
      if (mon.lvl > existing.lvl) {
        existing.lvl = mon.lvl
        existing.xp = mon.xp
      }
      else if (mon.lvl === existing.lvl) {
        existing.xp = Math.max(existing.xp, mon.xp)
      }
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      if (mon.heldItemId) {
        const itemId = mon.heldItemId
        equipment.unequip(mon.id)
        equipment.equip(existing.id, itemId)
      }
      const index = shlagemons.value.findIndex(m => m.id === mon.id)
      if (index !== -1)
        shlagemons.value.splice(index, 1)
      if (activeShlagemon.value?.id === mon.id)
        activeShlagemon.value = existing
      existing.isNew = true
      recomputeHighestLevel()
    }
    else {
      mon.base = to
      applyStats(mon)
      applyCurrentStats(mon)
      mon.hpCurrent = maxHp(mon)
      mon.captureDate = new Date().toISOString()
      mon.captureCount = 1
      mon.isNew = true
      toast(i18n.global.t('stores.shlagedex.evolved', { name: i18n.global.t(mon.base.name) }))
    }
  }

  async function checkEvolution(mon: DexShlagemon): Promise<boolean> {
    const evolutions = (mon.base.evolutions ?? (mon.base.evolution ? [mon.base.evolution] : []))
      .filter(e => e.base.id !== mon.base.id)
    const evo = evolutions.find(e => e.condition.type === 'lvl' && mon.lvl >= e.condition.value)
    if (!evo || !mon.allowEvolution)
      return false
    const accepted = await evolutionStore.requestEvolution(mon, evo.base)
    if (accepted)
      applyEvolution(mon, evo.base)
    return true
  }

  async function evolveWithItem(mon: DexShlagemon, item: Item) {
    const evolutions = (mon.base.evolutions ?? (mon.base.evolution ? [mon.base.evolution] : []))
      .filter(e => e.base.id !== mon.base.id)
    const evo = evolutions.find(e => e.condition.type === 'item' && e.condition.value.id === item.id)
    if (!evo)
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
    zoneMaxLevel?: number,
  ) {
    if (mon.lvl >= maxLevel)
      return
    const bonus = wearableBonus(mon.heldItemId, 'xp')
    if (bonus)
      amount = Math.round(amount * (1 + bonus / 100))
    if (zoneMaxLevel) {
      // Severely reduce XP when the Shlagémon outlevels the zone
      if (mon.lvl >= zoneMaxLevel + 5)
        amount = Math.round(amount / 10)
      else if (mon.lvl >= zoneMaxLevel)
        amount = Math.round(amount / 2)
    }
    mon.xp += amount
    let evolutionRequested = false
    while (mon.lvl < maxLevel && mon.xp >= xpForLevel(mon.lvl)) {
      mon.xp -= xpForLevel(mon.lvl)
      mon.lvl += 1
      if (mon.rarityFollowsLevel) {
        const before = mon.rarity
        mon.rarity = mon.lvl
        maybePlayRaritySfx(mon, before)
      }
      audio.playSfx('lvl-up')
      const prevHp = mon.hpCurrent
      if (mon.rarityFollowsLevel)
        applyStats(mon)
      applyCurrentStats(mon)
      const healAmount = Math.round((mon.hp * healPercent) / 100)
      mon.hpCurrent = Math.min(mon.hp, prevHp + healAmount)
      updateHighestLevel(mon)
      if (!evolutionRequested)
        evolutionRequested = await checkEvolution(mon)
    }
    if (mon.lvl >= maxLevel)
      mon.xp = 0
  }

  /**
   * Create and register a new Shlagémon in the player's Shlagédex.
   *
   * The function also notifies the achievements system so that capture and
   * zone-completion achievements are evaluated immediately.
   *
   * @param base - Base data of the Shlagémon to create.
   * @param shiny - Whether the created Shlagémon is shiny.
   * @returns The created DexShlagémon instance.
   */
  function createShlagemon(base: BaseShlagemon, shiny = false) {
    const mon = createDexShlagemon(base, shiny, 1, wildLevel.highestWildLevel)
    mon.captureDate = new Date().toISOString()
    mon.captureCount = 1
    addShlagemon(mon)
    updateHighestLevel(mon)
    notifyAchievement({ type: 'capture', shiny })
    toast(i18n.global.t('stores.shlagedex.obtained', { name: i18n.global.t(base.name) }))
    return mon
  }

  function captureShlagemon(
    base: BaseShlagemon,
    shiny = false,
    rarity?: number,
  ) {
    const existing = shlagemons.value.find(mon => mon.base.id === base.id)
    if (existing) {
      if (existing.rarity >= 100) {
        if (shiny && !existing.isShiny) {
          existing.captureCount += 1
          existing.isShiny = true
          toast(i18n.global.t('stores.shlagedex.obtained', { name: i18n.global.t(existing.base.name) }))
        }
        else {
          toast(i18n.global.t('stores.shlagedex.alreadyMax'))
        }
        return existing
      }
      const before = existing.rarity
      const incoming = createDexShlagemon(
        base,
        shiny,
        1,
        rarity ?? wildLevel.highestWildLevel,
        rarity ?? 1,
      )
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
      maybePlayRaritySfx(existing, before)
      if (incoming.isShiny)
        existing.isShiny = true
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      updateHighestLevel(existing)
      toast(rarityToastMessage(existing.base.name, rarityGain, levelLoss))
      return existing
    }
    const incoming = createDexShlagemon(
      base,
      shiny,
      1,
      rarity ?? wildLevel.highestWildLevel,
      rarity ?? 1,
    )
    incoming.captureDate = new Date().toISOString()
    incoming.captureCount = 1
    addShlagemon(incoming)
    updateHighestLevel(incoming)
    maybePlayRaritySfx(incoming, 0)
    toast(i18n.global.t('stores.shlagedex.obtained', { name: i18n.global.t(incoming.base.name) }))
    return incoming
  }

  function captureEnemy(enemy: DexShlagemon) {
    const mergeWithLegendaryEncounter = laboratory.consumeLegendaryEncounter(enemy.base.id)
    const existing = shlagemons.value.find(mon => mon.base.id === enemy.base.id)
    if (mergeWithLegendaryEncounter && existing) {
      existing.captureCount += 1
      const previousRarity = existing.rarity
      existing.rarity = Math.min(100, Math.max(existing.rarity, enemy.rarity))
      maybePlayRaritySfx(existing, previousRarity)
      existing.isShiny ||= enemy.isShiny
      existing.lvl = Math.max(existing.lvl, enemy.lvl)
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      updateHighestLevel(existing)
      toast(i18n.global.t('stores.shlagedex.legendaryMerged', {
        name: i18n.global.t(existing.base.name),
        level: existing.lvl,
        rarity: existing.rarity,
      }))
      return existing
    }
    if (existing) {
      if (existing.rarity >= 100) {
        if (enemy.isShiny && !existing.isShiny) {
          existing.captureCount += 1
          existing.isShiny = true
          toast(i18n.global.t('stores.shlagedex.obtained', { name: i18n.global.t(existing.base.name) }))
        }
        else {
          toast(i18n.global.t('stores.shlagedex.alreadyMax'))
        }
        return existing
      }
      const before = existing.rarity
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
      maybePlayRaritySfx(existing, before)
      existing.isShiny ||= enemy.isShiny
      existing.lvl = Math.max(1, existing.lvl - levelLoss)
      existing.xp = 0
      applyStats(existing)
      applyCurrentStats(existing)
      existing.hpCurrent = maxHp(existing)
      updateHighestLevel(existing)
      toast(rarityToastMessage(existing.base.name, rarityGain, levelLoss))
      return existing
    }
    const captured: DexShlagemon = {
      ...enemy,
      id: generateUuid(),
      hpCurrent: enemy.hp,
      captureDate: new Date().toISOString(),
      captureCount: 1,
      isNew: true,
    }
    addShlagemon(captured)
    updateHighestLevel(captured)
    maybePlayRaritySfx(captured, 0)
    toast(i18n.global.t('stores.shlagedex.obtained', { name: i18n.global.t(captured.base.name) }))
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
    toast(i18n.global.t('stores.shlagedex.released', { name: i18n.global.t(mon.base.name) }))
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
    newCount,
    markSeen,
    markAllSeen,
    addShlagemon,
    setBusy,
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
    applyOdorElixir,
    effectiveAttack,
    effectiveDefense,
    maxHp,
    xpGainForLevel,
    captureBonusPercent,
    clearEffects,
    effects,
    evolveWithItem,
    removeEffect,
  }
}, {
  persist: {
    debug: true,
    serializer: shlagedexSerializer,
    afterHydrate(ctx) {
      const store = ctx.store as ReturnType<typeof useShlagedexStore>
      const now = Date.now()
      store.effects.slice().forEach((e) => {
        const effect = e as ActiveEffect
        if (effect.expiresAt <= now) {
          store.removeEffect(effect.id)
          return
        }
        if (typeof effect.timeout?.stop !== 'function')
          effect.timeout = useTimeoutFn(() => store.removeEffect(effect.id), effect.expiresAt - now) as Stoppable
      })
      store.shlagemons.forEach((m) => {
        if (m.isNew === undefined)
          m.isNew = false
      })
    },
  } as PersistedStateOptions,
})
