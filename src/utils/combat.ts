export function getTypeMultiplier(attackType: string, targetType: string, table: Record<string, Record<string, number>>): { multiplier: number, effect: 'super' | 'not' | 'normal' } {
  const base = table[attackType]?.[targetType] ?? 1
  const variance = 0.8 + Math.random() * 0.4 // ±20%
  const multiplier = base * variance
  const effect = base > 1 ? 'super' : base < 1 ? 'not' : 'normal'
  return { multiplier, effect }
}

export function computeDamage(base: number, attackType: string, targetType: string, table: Record<string, Record<string, number>>): { damage: number, effect: 'super' | 'not' | 'normal' } {
  const { multiplier, effect } = getTypeMultiplier(attackType, targetType, table)
  const damage = Math.round(base * multiplier)
  return { damage, effect }
}
