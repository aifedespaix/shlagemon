import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'

export function xpForLevel(level: number): number {
  return Math.floor(100 * 1.1 ** (level - 1))
}

export function applyStats(mon: DexShlagemon) {
  mon.hp = 50 + (mon.lvl - 1) * 5
  mon.attack = 10 + (mon.lvl - 1) * 2
  mon.defense = 10 + (mon.lvl - 1) * 2
  mon.smelling = 1 + (mon.lvl - 1) * 0.5
}

export function createDexShlagemon(base: BaseShlagemon): DexShlagemon {
  const rarity = generateRarity()
  const mon: DexShlagemon = {
    id: crypto.randomUUID(),
    base,
    lvl: 1,
    xp: 0,
    rarity,
    hp: statWithRarity(base.hp, rarity),
    attack: statWithRarity(base.attack, rarity),
    defense: statWithRarity(base.defense, rarity),
    smelling: statWithRarity(base.smelling, rarity),
    sex: Math.random() < 0.5 ? 'male' : 'female',
  }
  applyStats(mon)
  return mon
}

function generateRarity(): number {
  const x = Math.random() // Uniforme entre 0 et 1
  const skewed = x ** 2 // Quadratique (favorise les faibles valeurs)
  return Math.floor(1 + skewed * 99) // Échelle 1–100
}

function statWithRarity(base: number, rarity: number): number {
  const boostFactor = 1 + 0.25 * (rarity - 1) / 99 // de 1.0 à 1.25
  const randomFactor = 0.95 + Math.random() * 0.1 // petite variation entre -5% et +5%
  const finalValue = base * boostFactor * randomFactor
  return Math.floor(finalValue / 5) * 5 // arrondi au multiple de 5 inférieur
}
