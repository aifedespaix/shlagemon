export interface ActiveEffect {
  id: number
  type: 'attack' | 'defense' | 'xp'
  percent: number
  icon?: string
  iconClass?: string
  expiresAt: number
  amount: number
  timeoutId?: ReturnType<typeof setTimeout>
}
