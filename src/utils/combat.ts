import type { ShlagemonType } from '~/type'

/**
 * Retourne le multiplicateur de dégâts et l'effet visuel associé
 */
export function getTypeMultiplier(
  attackType: ShlagemonType,
  targetType: ShlagemonType,
): { multiplier: number, effect: 'super' | 'not' | 'normal' } {
  let base = 1

  if (targetType.weakness.some(w => w.id === attackType.id))
    base = 1.2 // La cible est faible contre ce type
  else if (targetType.resistance.some(r => r.id === attackType.id))
    base = 0.8 // La cible résiste à ce type

  const effect: 'super' | 'not' | 'normal'
    = base > 1 ? 'super' : base < 1 ? 'not' : 'normal'

  return { multiplier: base, effect }
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
  let multiplier = typeMultiplier * variance
  let crit: 'critical' | 'weak' | 'normal' = 'normal'

  if (Math.random() < 1 / 50) {
    multiplier *= 2
    crit = 'critical'
  }
  else if (variance < 0.85) {
    crit = 'weak'
  }

  const damage = Math.round(base * multiplier)
  return { damage, effect, crit }
}
