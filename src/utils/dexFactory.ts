import type { Stats } from '~/type'
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'

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
  // These base stats only depend on the rarity of the monster. The coefficient
  // bonus is applied separately when computing the current stats so that base
  // stats remain stable when the coefficient is modified by zone rank changes.
  mon.baseStats = {
    hp: statWithRarityAndCoefficient(baseStats.hp, 1, mon.rarity),
    attack: statWithRarityAndCoefficient(baseStats.attack, 1, mon.rarity),
    defense: statWithRarityAndCoefficient(baseStats.defense, 1, mon.rarity),
    smelling: statWithRarityAndCoefficient(baseStats.smelling, 1, mon.rarity),
  }
}

export function applyCurrentStats(mon: DexShlagemon) {
  const levelBoost = 1 + (mon.lvl - 1) * 0.02
  const coefficientBoost = 1 + 2.5 * (mon.coefficient - 1) / 999

  const hpBase = Math.floor(mon.baseStats.hp * coefficientBoost / 5) * 5
  mon.hp = Math.floor((hpBase + (mon.lvl - 1) * 5) * levelBoost)
  mon.attack = Math.floor(mon.baseStats.attack * coefficientBoost + (mon.lvl - 1) * 2)
  mon.defense = Math.floor(mon.baseStats.defense * coefficientBoost + (mon.lvl - 1) * 2)
  mon.smelling = Math.floor(mon.baseStats.smelling * coefficientBoost + (mon.lvl - 1) * 0.5)
  mon.hpCurrent = mon.hp
}

export function createDexShlagemon(
  base: BaseShlagemon,
  shiny = false,
  coefficientMultiplier = 1,
  level = 1,
): DexShlagemon {
  const rarity = generateRarity()
  const mon: DexShlagemon = {
    id: crypto.randomUUID(),
    base,
    coefficient: base.coefficient * coefficientMultiplier,
    baseStats: {
      hp: statWithRarityAndCoefficient(baseStats.hp, 1, rarity),
      attack: statWithRarityAndCoefficient(baseStats.attack, 1, rarity),
      defense: statWithRarityAndCoefficient(baseStats.defense, 1, rarity),
      smelling: statWithRarityAndCoefficient(baseStats.smelling, 1, rarity),
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
  }
  applyStats(mon)
  applyCurrentStats(mon)
  return mon
}

function generateRarity(): number {
  const x = Math.random()
  const skewed = x ** 2
  return Math.floor(1 + skewed * 99)
}

export function statWithRarityAndCoefficient(base: number, coefficient: number, rarity: number): number {
  const coefficientBoost = 1 + 2.5 * (coefficient - 1) / 999 // 1.0 → 3.5
  const rarityBoost = 1 + 0.25 * (rarity - 1) / 99 // 1.0 → 1.25
  // const randomFactor = 0.95 + Math.random() * 0.1 // ±5%
  const finalValue = base * coefficientBoost * rarityBoost
  return Math.floor(finalValue / 5) * 5 // arrondi au multiple de 5 inférieur
}
