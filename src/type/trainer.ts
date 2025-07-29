import type { Character } from './character'

export interface TrainerShlagemon {
  baseId: string
  level: number
}

export interface Trainer {
  id: string
  character: Character
  dialogBefore: string
  /** i18n key for the dialog before battle */
  dialogBeforeKey?: string
  dialogAfter: string
  /** i18n key for the dialog after battle */
  dialogAfterKey?: string
  dialogDefeat?: string
  /** i18n key for the dialog when defeated */
  dialogDefeatKey?: string
  reward: number
  shlagemons: (TrainerShlagemon | string)[]
}
