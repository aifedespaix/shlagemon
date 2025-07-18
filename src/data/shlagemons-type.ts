import type { ShlagemonType } from '../type'

export type TypeName = 'normal' | 'feu' | 'eau' | 'plante' | 'roche' | 'electrique' | 'vol' | 'combat' | 'spectre' | 'darksasuke' | 'psy' | 'poison' | 'metal' | 'sol' | 'fee' | 'dragon' | 'glace' | 'insecte'

export const normal: ShlagemonType = {
  id: 'normal',
  name: 'Normy',
  description: 'Type complètement inintéressant et trop pourri.',
  color: '#A8A878',
  resistance: [],
  weakness: [],
  tags: ['banal', 'fade'],
  passiveEffects: [],
}

export const feu: ShlagemonType = {
  id: 'feu',
  name: 'Cramé',
  description: 'Type brûlant qui réduit tout en cendres.',
  color: '#e25822',
  resistance: [],
  weakness: [],
  tags: ['brûlant'],
  passiveEffects: [],
}

export const eau: ShlagemonType = {
  id: 'eau',
  name: 'Mouillé',
  description: 'Type humide qui éteint facilement les ardeurs.',
  color: '#3b83bd',
  resistance: [],
  weakness: [],
  tags: ['humide'],
  passiveEffects: [],
}

export const plante: ShlagemonType = {
  id: 'plante',
  name: 'Moisi',
  description: 'Type végétal en décomposition.',
  color: '#769958',
  resistance: [],
  weakness: [],
  tags: ['fongique'],
  passiveEffects: [],
}

export const electrique: ShlagemonType = {
  id: 'electrique',
  name: 'Électrochiasse',
  description: 'Type chargé d\'électricité statique.',
  color: '#f9e743',
  resistance: [],
  weakness: [],
  tags: ['électrique'],
  passiveEffects: [],
}

export const roche: ShlagemonType = {
  id: 'roche',
  name: 'Caillasse',
  description: 'Type roc très coriace.',
  color: '#a79f94',
  resistance: [],
  weakness: [],
  tags: ['solide'],
  passiveEffects: [],
}

export const vol: ShlagemonType = {
  id: 'vol',
  name: 'AirEction',
  description: 'Type aérien mais qui sent la teub.',
  color: '#A4C2F4',
  resistance: [],
  weakness: [],
  tags: ['aérien'],
  passiveEffects: [],
}

export const combat: ShlagemonType = {
  id: 'combat',
  name: 'Castagne',
  description: 'Type bagarreur qui tape sans réfléchir.',
  color: '#C03028',
  resistance: [],
  weakness: [],
  tags: ['bourrin'],
  passiveEffects: [],
}

export const spectre: ShlagemonType = {
  id: 'spectre',
  name: 'Spectranus',
  description: 'Type chelou qui fout les jetons.',
  color: '#705898',
  resistance: [],
  weakness: [],
  tags: ['ectoplasmique'],
  passiveEffects: [],
}

export const darksasuke: ShlagemonType = {
  id: 'darksasuke',
  name: 'DarkSasuke',
  description: 'Type victime, gothique et émo qui cours avec les bras en arrière.',
  color: '#4D4D4D',
  resistance: [],
  weakness: [],
  tags: ['malsain'],
  passiveEffects: [],
}

export const psy: ShlagemonType = {
  id: 'psy',
  name: 'Psytrance',
  description: `Un fan de musique de merde, il ne sait pas s'amuser sans prendre de drogue.`,
  color: '#FF66CC',
  resistance: [],
  weakness: [],
  tags: ['mental'],
  passiveEffects: [],
}

export const poison: ShlagemonType = {
  id: 'poison',
  name: 'Poisonet',
  description: 'Type toxique qui t’envoie des mails louches.',
  color: '#A040A0',
  resistance: [],
  weakness: [],
  tags: ['toxique'],
  passiveEffects: [],
}

export const metal: ShlagemonType = {
  id: 'metal',
  name: 'Ferraille',
  description: 'Type blindé mais rouillé qui couine à chaque pas.',
  color: '#B8B8D0',
  resistance: [],
  weakness: [],
  tags: ['métal'],
  passiveEffects: [],
}

export const sol: ShlagemonType = {
  id: 'sol',
  name: 'Cradouze',
  description: 'Type terreux qui gratte les pieds.',
  color: '#E0C068',
  resistance: [],
  weakness: [],
  tags: ['sale', 'boueux'],
  passiveEffects: [],
}

export const fee: ShlagemonType = {
  id: 'fee',
  name: 'FéeLation',
  description: 'Type sucré en apparence, mais colle aux doigts.',
  color: '#EE99AC',
  resistance: [],
  weakness: [],
  tags: ['collant'],
  passiveEffects: [],
}

export const dragon: ShlagemonType = {
  id: 'dragon',
  name: 'DragonDorf',
  description: 'Type majestueux mais trop sûr de lui, qui finit toujours battu à la fin.',
  color: '#7038F8', // couleur violette proche du type Dragon
  resistance: [],
  weakness: [],
  tags: ['mythique'],
  passiveEffects: [],
}

export const glace: ShlagemonType = {
  id: 'glace',
  name: 'Glaconasse',
  description: 'Type froid comme ton ex, glissant et imprévisible.',
  color: '#98d8d8',
  resistance: [],
  weakness: [],
  tags: ['gelé', 'froid'],
  passiveEffects: [],
}

export const insecte: ShlagemonType = {
  id: 'insecte',
  name: 'Mouchtik',
  description: 'Type grouillant, souvent poilu, toujours dérangeant. Il gratte la nuit et te juge en silence.',
  color: '#a8b820',
  resistance: [],
  weakness: [],
  tags: ['grattant', 'antenne', 'multisegmenté'],
  passiveEffects: [],
}

normal.weakness.push(combat)
feu.weakness.push(eau, sol)
feu.resistance.push(plante, metal, fee)
eau.weakness.push(plante, electrique)
eau.resistance.push(feu, roche, eau)
plante.weakness.push(feu, plante, poison, vol)
plante.resistance.push(sol, electrique, eau)
electrique.weakness.push(sol)
electrique.resistance.push(vol, electrique, eau)
roche.weakness.push(combat, eau, plante, sol, metal)
roche.resistance.push(feu, vol, poison, fee)
vol.weakness.push(roche, electrique, plante)
vol.resistance.push(combat, plante, eau)
combat.weakness.push(vol, psy, fee)
combat.resistance.push(roche, darksasuke, poison)
spectre.weakness.push(darksasuke, spectre)
spectre.resistance.push(poison, combat)
darksasuke.weakness.push(combat, fee)
darksasuke.resistance.push(spectre, psy, plante)
psy.weakness.push(darksasuke, spectre, poison)
psy.resistance.push(combat, fee)
poison.weakness.push(sol, psy)
poison.resistance.push(plante, combat, fee)
metal.weakness.push(combat, feu, sol)
metal.resistance.push(poison, eau, electrique, plante, psy, roche, fee, vol)
sol.weakness.push(plante, eau)
sol.resistance.push(electrique, poison, feu, roche)
fee.weakness.push(poison, metal)
dragon.weakness.push(dragon, glace, fee)
dragon.resistance.push(feu, eau, electrique, plante)
glace.weakness.push(feu, roche, combat, metal)
glace.resistance.push(glace)
insecte.weakness.push(feu, poison, vol, roche)
insecte.resistance.push(combat, plante, sol)

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
