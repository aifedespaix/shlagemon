import type { BaseShlagemon, DexShlagemon } from '~/types/shlagemon'

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
  const mon: DexShlagemon = {
    base,
    lvl: 1,
    xp: 0,
    rarity: 1,
    hp: 50,
    attack: 10,
    defense: 10,
    smelling: 1,
  }
  applyStats(mon)
  return mon
}
