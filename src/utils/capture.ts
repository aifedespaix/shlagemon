import type { Ball, DexShlagemon } from '~/type'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const coefMod = 1 / Math.sqrt(enemy.base.coefficient)
  const levelMod = 1 / (1 + enemy.lvl / 20)
  const chance = hpChance * coefMod * levelMod * ball.catchBonus
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
