import type { Ball, DexShlagemon } from '~/type'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const coefMod = 1 / Math.cbrt(enemy.coefficient)
  const levelMod = 1 / (1 + enemy.lvl / 40)
  // Slightly increase the global capture rate to make encounters less frustrating
  const difficultyMod = 1.3
  const dex = useShlagedexStore()
  const captureMod = 1 + dex.captureBonusPercent / 100
  const chance = Math.min(100, hpChance * coefMod * levelMod * ball.catchBonus * difficultyMod * captureMod)
  const dev = useDeveloperStore()
  if (dev.debug) {
    console.warn(
      `Capture chance: ${chance.toFixed(2)}%`,
      { level: enemy.lvl, coef: enemy.coefficient, ballBonus: ball.catchBonus, hpChance, coefMod, levelMod, captureMod },
    )
  }
  return Math.random() * 100 < chance
}

export function captureChanceFromHp(ratio: number): number {
  const r = Math.min(1, Math.max(0, ratio))
  const baseChance = 80
  const multiplier = 3 ** (1 - r)
  return baseChance * multiplier
}

export function simpleCapture(enemy: DexShlagemon): boolean {
  const chance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  return Math.random() * 100 < chance
}
