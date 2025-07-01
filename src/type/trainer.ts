export interface TrainerShlagemon {
  baseId: string
  level: number
}

export interface Trainer {
  id: string
  name: string
  image: string
  dialogBefore: string
  dialogAfter: string
  reward: number
  shlagemons: TrainerShlagemon[]
}
