import type { Ball, DexShlagemon } from '~/type'

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const levelBonus = ballLevelMultiplier(ball, enemy.lvl)
  if (levelBonus <= 0)
    return false
  const rarityMod = rarityModifier(enemy.rarity)
  const dex = useShlagedexStore()
  const captureMod = 1 + dex.captureBonusPercent / 100
  const chance = Math.min(100, hpChance * levelBonus * rarityMod * captureMod)
  const dev = useDeveloperStore()
  if (dev.debug) {
    console.warn(
      `Capture chance: ${chance.toFixed(2)}%`,
      { level: enemy.lvl, hpChance, levelBonus, rarityMod, captureMod },
    )
  }
  return Math.random() * 100 < chance
}

function ballLevelMultiplier(ball: Ball, level: number): number {
  switch (ball.id) {
    case 'shlageball':
      return level <= 33 ? 1 : 0
    case 'super-shlageball':
      if (level > 66)
        return 0
      return level < 33 ? 2 : 1
    case 'hyper-shlageball':
      if (level < 33)
        return 3
      if (level < 66)
        return 2
      return 1
    default:
      return ball.catchBonus || 1
  }
}

function rarityModifier(rarity: number): number {
  const r = Math.min(100, Math.max(1, rarity))
  return 1 - (r - 1) * 0.75 / 99
}

export function captureChanceFromHp(ratio: number): number {
  const r = Math.min(1, Math.max(0, ratio))
  return 89 * (1 - r)
}

export function simpleCapture(enemy: DexShlagemon): boolean {
  const chance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  return Math.random() * 100 < chance
}
