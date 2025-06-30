import type { ShlagemonType } from '../type/shlagemon'

export const moisisme: ShlagemonType = {
  id: 'moisisme',
  name: 'Moisisme',
  description: 'Type fongique, dégoulinant, qui ronge lentement ses adversaires.',
  color: '#6a9e3f',
  resistance: [],
  weakness: [],
  tags: ['collant', 'chaotique'],
  passiveEffects: ['apply-poison'],
}

export const plastoc: ShlagemonType = {
  id: 'plastoc',
  name: 'Plastoc',
  description: 'Type synthétique et tape-à-l’œil, mais pas très écolo.',
  color: '#e86fda',
  resistance: [],
  weakness: [],
  tags: ['toxique'],
  passiveEffects: ['reflect-damage'],
}

export const yoloide: ShlagemonType = {
  id: 'yoloide',
  name: 'YOLOïde',
  description: 'Type impulsif qui mise tout sur un coup critique.',
  color: '#ff2222',
  resistance: [],
  weakness: [],
  tags: ['chaotique'],
  passiveEffects: ['ignore-defense'],
}

export const paperasse: ShlagemonType = {
  id: 'paperasse',
  name: 'Paperasse',
  description: 'Type lent, mais inévitable. Peut paralyser n’importe quelle action.',
  color: '#aaaaaa',
  resistance: [],
  weakness: [],
  tags: ['bureaucratique'],
  passiveEffects: ['lower-accuracy'],
}

export const vapotonie: ShlagemonType = {
  id: 'vapotonie',
  name: 'Vapotage',
  description: 'Type flou, flottant et toxique. Disparaît dès qu’on le regarde.',
  color: '#b6d6f2',
  resistance: [],
  weakness: [],
  tags: ['intangible'],
  passiveEffects: ['confuse', 'resist-status'],
}

export const flanquant: ShlagemonType = {
  id: 'flanquant',
  name: 'Flanquant',
  description: 'Type gluant et instable. Ne tient jamais en place.',
  color: '#ffcc88',
  resistance: [],
  weakness: [],
  tags: ['alimentaire'],
  passiveEffects: ['draw-attacks'],
}

export const dramaqueen: ShlagemonType = {
  id: 'dramaqueen',
  name: 'Dramaqueen',
  description: 'Type théâtral qui amplifie chaque action.',
  color: '#f39acb',
  resistance: [],
  weakness: [],
  tags: ['émotif'],
  passiveEffects: [],
}

export const bricoFoutoir: ShlagemonType = {
  id: 'brico-foutoir',
  name: 'Brico-Foutoir',
  description: 'Type bricoleur et imprévisible.',
  color: '#8c7853',
  resistance: [],
  weakness: [],
  tags: ['chaotique'],
  passiveEffects: [],
}

export const apericube: ShlagemonType = {
  id: 'apéricube',
  name: 'Apéricube',
  description: 'Type fromage cubique, étonnamment résistant.',
  color: '#ffd966',
  resistance: [],
  weakness: [],
  tags: ['alimentaire'],
  passiveEffects: [],
}

export const trouNoir: ShlagemonType = {
  id: 'trou-noir',
  name: 'Trou Noir',
  description: 'Type cosmique qui aspire toute attaque.',
  color: '#222222',
  resistance: [],
  weakness: [],
  tags: ['cosmique'],
  passiveEffects: [],
}

moisisme.resistance.push(plastoc, flanquant)
moisisme.weakness.push(vapotonie, bricoFoutoir)

plastoc.resistance.push(moisisme, apericube)
plastoc.weakness.push(bricoFoutoir, trouNoir)

yoloide.resistance.push(dramaqueen)
yoloide.weakness.push(paperasse)

paperasse.resistance.push(dramaqueen, bricoFoutoir)
paperasse.weakness.push(vapotonie)

vapotonie.resistance.push(moisisme)
vapotonie.weakness.push(flanquant)

flanquant.resistance.push(yoloide)
flanquant.weakness.push(plastoc)

// ... tu peux continuer à déclarer les autres de cette manière ...

// liste exportée
export const shlagemonTypes: ShlagemonType[] = [
  moisisme,
  plastoc,
  yoloide,
  paperasse,
  vapotonie,
  flanquant,
  dramaqueen,
  bricoFoutoir,
  apericube,
  trouNoir,
]
