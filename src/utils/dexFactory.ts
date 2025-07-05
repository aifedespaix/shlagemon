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
  if (!mon.baseStats) {
    mon.baseStats = {
      hp: statWithRarityAndCoefficient(baseStats.hp, mon.base.coefficient, mon.rarity),
      attack: statWithRarityAndCoefficient(baseStats.attack, mon.base.coefficient, mon.rarity),
      defense: statWithRarityAndCoefficient(baseStats.defense, mon.base.coefficient, mon.rarity),
      smelling: statWithRarityAndCoefficient(baseStats.smelling, mon.base.coefficient, mon.rarity),
    }
  }
  const levelBoost = 1 + (mon.lvl - 1) * 0.02
  mon.hp = Math.floor((mon.baseStats.hp + (mon.lvl - 1) * 5) * levelBoost)
  mon.attack = Math.floor(mon.baseStats.attack + (mon.lvl - 1) * 2)
  mon.defense = Math.floor(mon.baseStats.defense + (mon.lvl - 1) * 2)
  mon.smelling = Math.floor(mon.baseStats.smelling + (mon.lvl - 1) * 0.5)
  mon.hpCurrent = mon.hp
}

export function createDexShlagemon(
  base: BaseShlagemon,
  shiny = false,
  coefficientMultiplier = 1,
): DexShlagemon {
  const rarity = generateRarity()
  const adjustedBase: BaseShlagemon = {
    ...base,
    coefficient: base.coefficient * coefficientMultiplier,
  }
  const mon: DexShlagemon = {
    id: crypto.randomUUID(),
    base: adjustedBase,
    baseStats: {
      hp: statWithRarityAndCoefficient(baseStats.hp, adjustedBase.coefficient, rarity),
      attack: statWithRarityAndCoefficient(baseStats.attack, adjustedBase.coefficient, rarity),
      defense: statWithRarityAndCoefficient(baseStats.defense, adjustedBase.coefficient, rarity),
      smelling: statWithRarityAndCoefficient(baseStats.smelling, adjustedBase.coefficient, rarity),
    },
    captureDate: new Date().toISOString(),
    captureCount: 1,
    lvl: 1,
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
  const randomFactor = 0.95 + Math.random() * 0.1 // ±5%
  const finalValue = base * coefficientBoost * rarityBoost * randomFactor
  return Math.floor(finalValue / 5) * 5 // arrondi au multiple de 5 inférieur
}
