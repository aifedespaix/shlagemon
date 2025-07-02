import type { Ball, DexShlagemon } from '~/type'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpRatio = enemy.hpCurrent / enemy.hp
  const baseChance = (1 - hpRatio) * 100
  const rarityMod = 1 / (enemy.rarity / 100)
  const chance = baseChance * ball.catchBonus * rarityMod
  return Math.random() * 100 < chance
}

export function captureChanceFromHp(ratio: number): number {
  const r = Math.min(1, Math.max(0, ratio))
  if (r <= 0.1)
    return 90
  if (r >= 1)
    return 10
  return 10 + (1 - r) / 0.9 * 80
}

export function simpleCapture(enemy: DexShlagemon): boolean {
  const chance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  return Math.random() * 100 < chance
}
