import type { Character } from './character'
import type { I18nKey } from './i18n'

export interface TrainerShlagemon {
  baseId: string
  level: number
}

export interface Trainer {
  id: string
  character: Character
  dialogBefore: I18nKey
  dialogAfter: I18nKey
  dialogDefeat?: I18nKey
  reward: number
  shlagemons: (TrainerShlagemon | string)[]
}
