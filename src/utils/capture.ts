import type { Ball, DexShlagemon } from '~/type'
import { useDeveloperStore } from '~/stores/developer'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const coefMod = 1 / Math.cbrt(enemy.base.coefficient)
  const levelMod = 1 / (1 + enemy.lvl / 40)
  // Slightly increase the global capture rate to make encounters less frustrating
  const difficultyMod = 1.3
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
    return 80
  return 80 + (r - 0.1) / 0.9 * 20
}

export function simpleCapture(enemy: DexShlagemon): boolean {
  const chance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  return Math.random() * 100 < chance
}
