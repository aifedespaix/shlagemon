import type { Ball, DexShlagemon } from '~/type'
import { useDeveloperStore } from '~/stores/developer'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const coefMod = 1 / Math.sqrt(enemy.base.coefficient)
  const levelMod = 1 / (1 + enemy.lvl / 20)
  // Slightly increase the global capture rate to make encounters less frustrating
  const difficultyMod = 1.5
  const chance = Math.min(100, hpChance * coefMod * levelMod * ball.catchBonus * difficultyMod)
  const dev = useDeveloperStore()
  if (dev.debug) {
    console.warn(
      `Capture chance: ${chance.toFixed(2)}%`,
      { level: enemy.lvl, coef: enemy.base.coefficient, ballBonus: ball.catchBonus, hpChance, coefMod, levelMod },
    )
  }
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
