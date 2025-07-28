import type { Character } from './character'

export interface TrainerShlagemon {
  baseId: string
  level: number
}

export interface Trainer {
  id: string
  character: Character
  dialogBefore: string
  dialogAfter: string
  dialogDefeat?: string
  reward: number
  shlagemons: (TrainerShlagemon | string)[]
}
