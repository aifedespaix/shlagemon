export interface ActiveEffect {
  id: number
  type: 'attack' | 'defense'
  percent: number
  icon?: string
  iconClass?: string
  expiresAt: number
  amount: number
}
