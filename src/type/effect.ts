export interface ActiveEffect {
  id: number
  type: 'attack' | 'defense' | 'xp' | 'vitality' | 'capture'
  percent: number
  icon?: string
  iconClass?: string
  expiresAt: number
  /** @deprecated No longer used, kept for save compatibility */
  amount?: number
  timeout?: ReturnType<typeof setTimeout>
}
