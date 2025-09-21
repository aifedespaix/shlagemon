import type { Ball, DexShlagemon } from '~/type'

/**
 * Computes the capture chance for a given enemy and ball without applying randomness.
 *
 * @param enemy - The enemy to try to capture.
 * @param ball - The ball used for the capture attempt.
 * @returns The capture probability expressed as a percentage between 0 and 100.
 */
export function getCaptureChance(enemy: DexShlagemon, ball: Ball): number {
  if (ball.id === 'master-shlag')
    return masterShlagChance(enemy)
  const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
  const levelBonus = ballLevelMultiplier(ball, enemy.lvl)
  if (levelBonus <= 0)
    return 0
  const rarityMod = rarityModifier(enemy.rarity)
  const levelPenalty = levelDifficultyMultiplier(enemy.lvl)
  const captureMod = captureBonusMultiplier()
  const chance = Math.min(
    100,
    hpChance * levelBonus * rarityMod * captureMod * levelPenalty,
  )
  // The capture sequence performs up to three attempts. Dividing the
  // probability by three keeps the overall success rate aligned with the
  // computed chance value.
  return chance / 3
}

function masterShlagChance(enemy: DexShlagemon): number {
  const treatAsLegendary = enemy.base.speciality === 'legendary'
    || enemy.captureProfile === 'legendary'
  if (!treatAsLegendary)
    return 100
  const dev = useDeveloperStore()
  const ratio = Math.min(1, Math.max(0, enemy.hpCurrent / enemy.hp))
  const finalChance = 1 + (1 - ratio) * 9
  const perAttempt = 1 - (1 - finalChance / 100) ** (1 / 2)
  if (dev.debug)
    return 100
  return perAttempt * 100
}

export function tryCapture(enemy: DexShlagemon, ball: Ball): boolean {
  const chance = getCaptureChance(enemy, ball)
  const dev = useDeveloperStore()
  if (dev.debug) {
    const hpChance = captureChanceFromHp(enemy.hpCurrent / enemy.hp)
    const levelBonus = ballLevelMultiplier(ball, enemy.lvl)
    const rarityMod = rarityModifier(enemy.rarity)
    const levelPenalty = levelDifficultyMultiplier(enemy.lvl)
    const captureMod = captureBonusMultiplier()
    console.warn(
      `Capture chance: ${chance.toFixed(2)}%`,
      { level: enemy.lvl, hpChance, levelBonus, rarityMod, captureMod, levelPenalty },
    )
  }
  return Math.random() * 100 < chance
}

/**
 * Returns the multiplicative capture bonus provided by the Shlagedex store.
 *
 * The store exposes a percentage that should increase capture chances but
 * never penalize them. Any negative value is clamped to zero to avoid
 * unintentionally reducing the probability.
 */
function captureBonusMultiplier(): number {
  const dex = useShlagedexStore()
  const bonus = Math.max(0, dex.captureBonusPercent)
  return 1 + bonus / 100
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

/**
 * Linear difficulty scaling based on the enemy level.
 *
 * Levels are divided into three tiers: 1-33, 33-66 and 66-99. Each tier
 * increases the capture difficulty linearly from no penalty at the start of
 * the tier to a 50% penalty at the end.
 */
export function levelDifficultyMultiplier(level: number): number {
  const tiers = [
    { start: 1, end: 33 },
    { start: 33, end: 66 },
    { start: 66, end: 99 },
  ] as const
  const tier = tiers.find(t => level >= t.start && level <= t.end)
  if (!tier)
    return level > 99 ? 0.5 : 1

  const progress = (level - tier.start) / (tier.end - tier.start)
  const clamped = Math.min(1, Math.max(0, progress))
  return 1 - 0.5 * clamped
}
