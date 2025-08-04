import type { TypeName } from '~/type'
import { shlagemonTypes } from '~/data/shlagemons-type'

/**
 * Retourne le multiplicateur de dégâts et l'effet visuel associé
 */
export function getTypeMultiplier(
  attackType: TypeName,
  targetType: TypeName,
): { multiplier: number, effect: 'super' | 'not' | 'normal' } {
  const atk = shlagemonTypes[attackType]
  const def = shlagemonTypes[targetType]
  let base = 1

  if (def.weakness.includes(atk.id))
    base = 1.5 // La cible est faible contre ce type
  else if (def.resistance.includes(atk.id))
    base = 0.5 // La cible résiste à ce type

  const effect: 'super' | 'not' | 'normal'
    = base > 1 ? 'super' : base < 1 ? 'not' : 'normal'

  return { multiplier: base, effect }
}

/**
 * Calcule les dégâts en fonction du type et du multiplicateur
 */
export function computeDamage(
  base: number,
  attackType: TypeName,
  targetTypes: TypeName | TypeName[],
): { damage: number, effect: 'super' | 'not' | 'normal', crit: 'critical' | 'weak' | 'normal' } {
  const types = Array.isArray(targetTypes) ? targetTypes : [targetTypes]
  const typeMultiplier = types
    .map(t => getTypeMultiplier(attackType, t).multiplier)
    .reduce((acc, cur) => acc * cur, 1)
  const effect: 'super' | 'not' | 'normal'
    = typeMultiplier > 1 ? 'super' : typeMultiplier < 1 ? 'not' : 'normal'
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
