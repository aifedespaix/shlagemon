import type { Ball, DexShlagemon } from '~/type'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpRatio = enemy.hpCurrent / enemy.hp
  const baseChance = (1 - hpRatio) * 100
  const rarityMod = 1 / (enemy.rarity / 100)
  const chance = baseChance * ball.catchBonus * rarityMod
  return Math.random() * 100 < chance
}
