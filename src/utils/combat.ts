import type { ShlagemonType } from '~/type'

/**
 * Retourne le multiplicateur de dégâts et l'effet visuel associé
 */
export function getTypeMultiplier(
  attackType: ShlagemonType,
  targetType: ShlagemonType,
): { multiplier: number, effect: 'super' | 'not' | 'normal' } {
  let base = 1

  if (attackType.weakness.some(w => w.id === targetType.id)) {
    base = 0.8 // L'attaque est faible contre le type ciblé
  }
  else if (attackType.resistance.some(r => r.id === targetType.id)) {
    base = 1.2 // L'attaque est forte contre le type ciblé
  }

  const variance = 0.8 + Math.random() * 0.4 // entre x0.8 et x1.2
  const multiplier = base * variance

  const effect: 'super' | 'not' | 'normal'
    = base > 1 ? 'super' : base < 1 ? 'not' : 'normal'

  return { multiplier, effect }
}

/**
 * Calcule les dégâts en fonction du type et du multiplicateur
 */
export function computeDamage(
  base: number,
  attackType: ShlagemonType,
  targetType: ShlagemonType,
): { damage: number, effect: 'super' | 'not' | 'normal', crit: 'critical' | 'weak' | 'normal' } {
  const { multiplier: typeMultiplier, effect } = getTypeMultiplier(attackType, targetType)
  const variance = 0.8 + Math.random() * 0.4 // entre x0.8 et x1.2
  let crit: 'critical' | 'weak' | 'normal' = 'normal'
  if (variance > 1.15)
    crit = 'critical'
  else if (variance < 0.85)
    crit = 'weak'
  const damage = Math.round(base * typeMultiplier * variance)
  return { damage, effect, crit }
}
