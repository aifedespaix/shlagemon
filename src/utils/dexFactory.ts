import type { Stats } from '~/type'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { specialityBonus } from '~/constants/speciality'
import marginal from '~/data/shlagemons/50-55/marginal'
import { generateUuid } from './uuid'

export const baseStats: Stats = {
  hp: 250,
  attack: 15,
  defense: 10,
  smelling: 20,
}

export function xpForLevel(level: number): number {
  return Math.floor(150 * 1.2 ** (level - 1))
}

export function xpRewardForLevel(level: number): number {
  return Math.floor(xpForLevel(level) / 3)
}

export function applyStats(mon: DexShlagemon) {
  // Always recompute base stats from the original values to avoid accumulating
  // rounding errors or chaining previous modifications.
  // Base stats only depend on the rarity of the monster.
  mon.baseStats = {
    hp: statWithRarity(baseStats.hp, mon.rarity),
    attack: statWithRarity(baseStats.attack, mon.rarity),
    defense: statWithRarity(baseStats.defense, mon.rarity),
    smelling: statWithRarity(baseStats.smelling, mon.rarity),
  }

  if (mon.base.id === marginal.id)
    mon.baseStats.attack = 0
}

export function applyCurrentStats(mon: DexShlagemon) {
  const levelBoost = 1.04 ** (mon.lvl - 1)
  const specialityBoost = 1
    + (specialityBonus[mon.base.speciality ?? 'evolution0'] || 0) / 100

  const hpBase = Math.floor(mon.baseStats.hp / 5) * 5
  mon.hp = Math.floor(hpBase * levelBoost)
  mon.attack = Math.floor(mon.baseStats.attack * levelBoost * specialityBoost)
  mon.defense = Math.floor(mon.baseStats.defense * levelBoost * specialityBoost)
  mon.smelling = Math.floor(mon.baseStats.smelling * levelBoost)
  mon.hpCurrent = mon.hp

  if (mon.base.id === marginal.id)
    mon.attack = 0
}

export function createDexShlagemon(
  base: BaseShlagemon,
  shiny = false,
  level = 1,
  maxRarity = 99,
  minRarity = 1,
): DexShlagemon {
  let rarity = generateRarity(maxRarity, minRarity)
  let rarityFollowsLevel = false
  if (base.id === 'wem') {
    rarity = level
    rarityFollowsLevel = true
  }
  const mon: DexShlagemon = {
    id: generateUuid(),
    base,
    baseStats: {
      hp: statWithRarity(baseStats.hp, rarity),
      attack: statWithRarity(baseStats.attack, rarity),
      defense: statWithRarity(baseStats.defense, rarity),
      smelling: statWithRarity(baseStats.smelling, rarity),
    },
    captureDate: new Date().toISOString(),
    captureCount: 1,
    lvl: level,
    xp: 0,
    rarity,
    hp: 0,
    attack: 0,
    defense: 0,
    smelling: 0,
    sex: Math.random() < 0.5 ? 'male' : 'female',
    isShiny: shiny || Math.random() < 0.01,
    hpCurrent: 0,
    allowEvolution: true,
    heldItemId: null,
    rarityFollowsLevel,
    isNew: true,
    busy: false,
  }
  applyStats(mon)
  applyCurrentStats(mon)
  return mon
}

/**
 * Generate a rarity value with the same skew as used for battles.
 *
 * @param max - Maximum rarity (inclusive).
 * @param min - Minimum rarity (inclusive).
 */
export function generateRarity(max = 99, min = 1): number {
  const x = Math.random()
  const skewed = x ** 2
  const value = Math.floor(1 + skewed * (max - 1))
  return Math.min(max, Math.max(min, value))
}

export function statWithRarity(base: number, rarity: number): number {
  const rarityBoost = 1 + (rarity - 1) / 99 // 1.0 → 2.0
  const finalValue = base * rarityBoost
  return Math.floor(finalValue / 5) * 5 // arrondi au multiple de 5 inférieur
}
