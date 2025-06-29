import type { ShlagemonType } from '../types/shlagemon'

export const moisisme: ShlagemonType = {
  id: 'moisisme',
  name: 'Moisisme',
  description: 'Type fongique, dégoulinant, qui ronge lentement ses adversaires.',
  color: '#6a9e3f',
  resistance: ['plastoc', 'flanquant'],
  weakness: ['vapotonie', 'brico-foutoir'],
  tags: ['collant', 'chaotique'],
  passiveEffects: ['apply-poison'],
}

export const plastoc: ShlagemonType = {
  id: 'plastoc',
  name: 'Plastoc',
  description: 'Type synthétique et tape-à-l’œil, mais pas très écolo.',
  color: '#e86fda',
  resistance: ['moisisme', 'apéricube'],
  weakness: ['brico-foutoir', 'trou-noir'],
  tags: ['toxique'],
  passiveEffects: ['reflect-damage'],
}

export const yoloide: ShlagemonType = {
  id: 'yoloide',
  name: 'YOLOïde',
  description: 'Type impulsif qui mise tout sur un coup critique.',
  color: '#ff2222',
  resistance: ['dramaqueen'],
  weakness: ['paperasse'],
  tags: ['chaotique'],
  passiveEffects: ['ignore-defense'],
}

export const paperasse: ShlagemonType = {
  id: 'paperasse',
  name: 'Paperasse',
  description: 'Type lent, mais inévitable. Peut paralyser n’importe quelle action.',
  color: '#aaaaaa',
  resistance: ['dramaqueen', 'brico-foutoir'],
  weakness: ['vapotonie'],
  tags: ['bureaucratique'],
  passiveEffects: ['lower-accuracy'],
}

export const vapotonie: ShlagemonType = {
  id: 'vapotonie',
  name: 'Vapotage',
  description: 'Type flou, flottant et toxique. Disparaît dès qu’on le regarde.',
  color: '#b6d6f2',
  resistance: ['moisisme'],
  weakness: ['flanquant'],
  tags: ['intangible'],
  passiveEffects: ['confuse', 'resist-status'],
}

export const flanquant: ShlagemonType = {
  id: 'flanquant',
  name: 'Flanquant',
  description: 'Type gluant et instable. Ne tient jamais en place.',
  color: '#ffcc88',
  resistance: ['yoloide'],
  weakness: ['plastoc'],
  tags: ['alimentaire'],
  passiveEffects: ['draw-attacks'],
}

// ... tu peux continuer à déclarer les autres de cette manière ...

// liste exportée
export const shlagemonTypes: ShlagemonType[] = [
  moisisme,
  plastoc,
  yoloide,
  paperasse,
  vapotonie,
  flanquant,
]
