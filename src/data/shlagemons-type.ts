import type { ShlagemonType, TypeName } from '../type'

export const normal: ShlagemonType = {
  id: 'normal',
  name: 'Normy',
  description: 'Type complètement inintéressant et trop pourri.',
  color: '#A8A878',
  resistance: [],
  weakness: ['combat'],
  tags: ['banal', 'fade'],
  passiveEffects: [],
}

export const feu: ShlagemonType = {
  id: 'feu',
  name: 'Cramé',
  description: 'Type brûlant qui réduit tout en cendres.',
  color: '#e25822',
  resistance: ['plante', 'metal', 'fee'],
  weakness: ['eau', 'sol'],
  tags: ['brûlant'],
  passiveEffects: [],
}

export const eau: ShlagemonType = {
  id: 'eau',
  name: 'Mouillé',
  description: 'Type humide qui éteint facilement les ardeurs.',
  color: '#3b83bd',
  resistance: ['feu', 'roche', 'eau'],
  weakness: ['plante', 'electrique'],
  tags: ['humide'],
  passiveEffects: [],
}

export const plante: ShlagemonType = {
  id: 'plante',
  name: 'Moisi',
  description: 'Type végétal en décomposition.',
  color: '#769958',
  resistance: ['sol', 'electrique', 'eau'],
  weakness: ['feu', 'plante', 'poison', 'vol'],
  tags: ['fongique'],
  passiveEffects: [],
}

export const electrique: ShlagemonType = {
  id: 'electrique',
  name: 'Électrochiasse',
  description: 'Type chargé d\'électricité statique.',
  color: '#f9e743',
  resistance: ['vol', 'electrique', 'eau'],
  weakness: ['sol'],
  tags: ['électrique'],
  passiveEffects: [],
}

export const roche: ShlagemonType = {
  id: 'roche',
  name: 'Caillasse',
  description: 'Type roc très coriace.',
  color: '#a79f94',
  resistance: ['feu', 'vol', 'poison', 'fee'],
  weakness: ['combat', 'eau', 'plante', 'sol', 'metal'],
  tags: ['solide'],
  passiveEffects: [],
}

export const vol: ShlagemonType = {
  id: 'vol',
  name: 'AirEction',
  description: 'Type aérien mais qui sent la teub.',
  color: '#A4C2F4',
  resistance: ['combat', 'plante', 'eau'],
  weakness: ['roche', 'electrique', 'plante'],
  tags: ['aérien'],
  passiveEffects: [],
}

export const combat: ShlagemonType = {
  id: 'combat',
  name: 'Castagne',
  description: 'Type bagarreur qui tape sans réfléchir.',
  color: '#C03028',
  resistance: ['roche', 'darksasuke', 'poison'],
  weakness: ['vol', 'psy', 'fee'],
  tags: ['bourrin'],
  passiveEffects: [],
}

export const spectre: ShlagemonType = {
  id: 'spectre',
  name: 'Spectranus',
  description: 'Type chelou qui fout les jetons.',
  color: '#705898',
  resistance: ['poison', 'combat'],
  weakness: ['darksasuke', 'spectre'],
  tags: ['ectoplasmique'],
  passiveEffects: [],
}

export const darksasuke: ShlagemonType = {
  id: 'darksasuke',
  name: 'DarkSasuke',
  description: 'Type victime, gothique et émo qui cours avec les bras en arrière.',
  color: '#4D4D4D',
  resistance: ['spectre', 'psy', 'plante'],
  weakness: ['combat', 'fee'],
  tags: ['malsain'],
  passiveEffects: [],
}

export const psy: ShlagemonType = {
  id: 'psy',
  name: 'Psytrance',
  description: `Un fan de musique de merde, il ne sait pas s'amuser sans prendre de drogue.`,
  color: '#FF66CC',
  resistance: ['combat', 'fee'],
  weakness: ['darksasuke', 'spectre', 'poison'],
  tags: ['mental'],
  passiveEffects: [],
}

export const poison: ShlagemonType = {
  id: 'poison',
  name: 'Poisonet',
  description: 'Type toxique qui t’envoie des mails louches.',
  color: '#A040A0',
  resistance: ['plante', 'combat', 'fee'],
  weakness: ['sol', 'psy'],
  tags: ['toxique'],
  passiveEffects: [],
}

export const metal: ShlagemonType = {
  id: 'metal',
  name: 'Ferraille',
  description: 'Type blindé mais rouillé qui couine à chaque pas.',
  color: '#B8B8D0',
  resistance: ['poison', 'eau', 'electrique', 'plante', 'psy', 'roche', 'fee', 'vol'],
  weakness: ['combat', 'feu', 'sol'],
  tags: ['métal'],
  passiveEffects: [],
}

export const sol: ShlagemonType = {
  id: 'sol',
  name: 'Cradouze',
  description: 'Type terreux qui gratte les pieds.',
  color: '#E0C068',
  resistance: ['electrique', 'poison', 'feu', 'roche'],
  weakness: ['plante', 'eau'],
  tags: ['sale', 'boueux'],
  passiveEffects: [],
}

export const fee: ShlagemonType = {
  id: 'fee',
  name: 'FéeLation',
  description: 'Type sucré en apparence, mais colle aux doigts.',
  color: '#EE99AC',
  resistance: [],
  weakness: ['poison', 'metal'],
  tags: ['collant'],
  passiveEffects: [],
}

export const dragon: ShlagemonType = {
  id: 'dragon',
  name: 'DragonDorf',
  description: 'Type majestueux mais trop sûr de lui, qui finit toujours battu à la fin.',
  color: '#7038F8', // couleur violette proche du type Dragon
  resistance: ['feu', 'eau', 'electrique', 'plante'],
  weakness: ['dragon', 'glace', 'fee'],
  tags: ['mythique'],
  passiveEffects: [],
}

export const glace: ShlagemonType = {
  id: 'glace',
  name: 'Glaconasse',
  description: 'Type froid comme ton ex, glissant et imprévisible.',
  color: '#98d8d8',
  resistance: ['glace'],
  weakness: ['feu', 'roche', 'combat', 'metal'],
  tags: ['gelé', 'froid'],
  passiveEffects: [],
}

export const insecte: ShlagemonType = {
  id: 'insecte',
  name: 'Mouchtik',
  description: 'Type grouillant, souvent poilu, toujours dérangeant. Il gratte la nuit et te juge en silence.',
  color: '#a8b820',
  resistance: ['combat', 'plante', 'sol'],
  weakness: ['feu', 'poison', 'vol', 'roche'],
  tags: ['grattant', 'antenne', 'multisegmenté'],
  passiveEffects: [],
}

// liste exportée
export const shlagemonTypes: { [typeName in TypeName]: ShlagemonType } = {
  normal,
  feu,
  eau,
  plante,
  roche,
  electrique,
  vol,
  combat,
  spectre,
  darksasuke,
  psy,
  poison,
  metal,
  sol,
  fee,
  dragon,
  glace,
  insecte,
}
