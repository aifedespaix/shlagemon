import type { ShlagemonType } from '../type'

export const crame: ShlagemonType = {
  id: 'crame',
  name: 'Crâme',
  description: 'Type brûlant qui réduit tout en cendres.',
  color: '#e25822',
  resistance: [],
  weakness: [],
  tags: ['brûlant'],
  passiveEffects: [],
}

export const mouille: ShlagemonType = {
  id: 'mouille',
  name: 'Mouillé',
  description: 'Type humide qui éteint facilement les ardeurs.',
  color: '#3b83bd',
  resistance: [],
  weakness: [],
  tags: ['humide'],
  passiveEffects: [],
}

export const moisi: ShlagemonType = {
  id: 'moisi',
  name: 'Moisi',
  description: 'Type végétal en décomposition.',
  color: '#769958',
  resistance: [],
  weakness: [],
  tags: ['fongique'],
  passiveEffects: [],
}

export const statik: ShlagemonType = {
  id: 'statik',
  name: 'Statik',
  description: 'Type chargé d\'électricité statique.',
  color: '#f9e743',
  resistance: [],
  weakness: [],
  tags: ['électrique'],
  passiveEffects: [],
}

export const caillasse: ShlagemonType = {
  id: 'caillasse',
  name: 'Caillasse',
  description: 'Type roc très coriace.',
  color: '#a79f94',
  resistance: [],
  weakness: [],
  tags: ['solide'],
  passiveEffects: [],
}

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

export const electrochiasse: ShlagemonType = {
  id: 'electrochiasse',
  name: 'Électrochiasse',
  description: `Un type instable et bruyant. Déclenche des décharges aussi imprévisibles que gênantes. Très redouté dans les lieux publics.`,
  color: '#a4c639', // un vert douteux à mi-chemin entre la bile et la prise fondue
  resistance: [],
  weakness: [],
  tags: ['dégueu', 'instable'],
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

electrochiasse.resistance.push(dramaqueen)
electrochiasse.weakness.push(plastoc)

// liens pour les types de base
crame.weakness.push(mouille)
mouille.resistance.push(crame)
mouille.weakness.push(moisi, statik)
moisi.weakness.push(crame)
caillasse.weakness.push(mouille)
statik.weakness.push(caillasse)

// liste exportée
export const shlagemonTypes: { [type: string]: ShlagemonType } = {
  crame,
  mouille,
  moisi,
  statik,
  caillasse,
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
  electrochiasse,
}
