import type { ShlagemonType, TypeName } from '../type'

export const normal: ShlagemonType = {
  id: 'normal',
  name: 'data.shlagemons-type.normal.name',
  description: 'data.shlagemons-type.normal.description',
  color: '#A8A878',
  resistance: [],
  weakness: ['combat'],
  tags: ['banal', 'fade'],
  passiveEffects: [],
}

export const feu: ShlagemonType = {
  id: 'feu',
  name: 'data.shlagemons-type.feu.name',
  description: 'data.shlagemons-type.feu.description',
  color: '#e25822',
  resistance: ['plante', 'metal', 'fee'],
  weakness: ['eau', 'sol'],
  tags: ['brûlant'],
  passiveEffects: [],
}

export const eau: ShlagemonType = {
  id: 'eau',
  name: 'data.shlagemons-type.eau.name',
  description: 'data.shlagemons-type.eau.description',
  color: '#3b83bd',
  resistance: ['feu', 'roche', 'eau'],
  weakness: ['plante', 'electrique'],
  tags: ['humide'],
  passiveEffects: [],
}

export const plante: ShlagemonType = {
  id: 'plante',
  name: 'data.shlagemons-type.plante.name',
  description: 'data.shlagemons-type.plante.description',
  color: '#769958',
  resistance: ['sol', 'electrique', 'eau'],
  weakness: ['feu', 'plante', 'poison', 'vol'],
  tags: ['fongique'],
  passiveEffects: [],
}

export const electrique: ShlagemonType = {
  id: 'electrique',
  name: 'data.shlagemons-type.electrique.name',
  description: 'data.shlagemons-type.electrique.description',
  color: '#f9e743',
  resistance: ['vol', 'electrique', 'eau'],
  weakness: ['sol'],
  tags: ['électrique'],
  passiveEffects: [],
}

export const roche: ShlagemonType = {
  id: 'roche',
  name: 'data.shlagemons-type.roche.name',
  description: 'data.shlagemons-type.roche.description',
  color: '#a79f94',
  resistance: ['feu', 'vol', 'poison', 'fee'],
  weakness: ['combat', 'eau', 'plante', 'sol', 'metal'],
  tags: ['solide'],
  passiveEffects: [],
}

export const vol: ShlagemonType = {
  id: 'vol',
  name: 'data.shlagemons-type.vol.name',
  description: 'data.shlagemons-type.vol.description',
  color: '#A4C2F4',
  resistance: ['combat', 'plante', 'eau'],
  weakness: ['roche', 'electrique', 'plante'],
  tags: ['aérien'],
  passiveEffects: [],
}

export const combat: ShlagemonType = {
  id: 'combat',
  name: 'data.shlagemons-type.combat.name',
  description: 'data.shlagemons-type.combat.description',
  color: '#C03028',
  resistance: ['roche', 'darksasuke', 'poison'],
  weakness: ['vol', 'psy', 'fee'],
  tags: ['bourrin'],
  passiveEffects: [],
}

export const spectre: ShlagemonType = {
  id: 'spectre',
  name: 'data.shlagemons-type.spectre.name',
  description: 'data.shlagemons-type.spectre.description',
  color: '#705898',
  resistance: ['poison', 'combat'],
  weakness: ['darksasuke', 'spectre'],
  tags: ['ectoplasmique'],
  passiveEffects: [],
}

export const darksasuke: ShlagemonType = {
  id: 'darksasuke',
  name: 'data.shlagemons-type.darksasuke.name',
  description: 'data.shlagemons-type.darksasuke.description',
  color: '#4D4D4D',
  resistance: ['spectre', 'psy', 'plante'],
  weakness: ['combat', 'fee'],
  tags: ['malsain'],
  passiveEffects: [],
}

export const psy: ShlagemonType = {
  id: 'psy',
  name: 'data.shlagemons-type.psy.name',
  description: 'data.shlagemons-type.psy.description',
  color: '#FF66CC',
  resistance: ['combat', 'fee'],
  weakness: ['darksasuke', 'spectre', 'poison'],
  tags: ['mental'],
  passiveEffects: [],
}

export const poison: ShlagemonType = {
  id: 'poison',
  name: 'data.shlagemons-type.poison.name',
  description: 'data.shlagemons-type.poison.description',
  color: '#A040A0',
  resistance: ['plante', 'combat', 'fee'],
  weakness: ['sol', 'psy'],
  tags: ['toxique'],
  passiveEffects: [],
}

export const metal: ShlagemonType = {
  id: 'metal',
  name: 'data.shlagemons-type.metal.name',
  description: 'data.shlagemons-type.metal.description',
  color: '#B8B8D0',
  resistance: ['poison', 'eau', 'electrique', 'plante', 'psy', 'roche', 'fee', 'vol'],
  weakness: ['combat', 'feu', 'sol'],
  tags: ['métal'],
  passiveEffects: [],
}

export const sol: ShlagemonType = {
  id: 'sol',
  name: 'data.shlagemons-type.sol.name',
  description: 'data.shlagemons-type.sol.description',
  color: '#E0C068',
  resistance: ['electrique', 'poison', 'feu', 'roche'],
  weakness: ['plante', 'eau'],
  tags: ['sale', 'boueux'],
  passiveEffects: [],
}

export const fee: ShlagemonType = {
  id: 'fee',
  name: 'data.shlagemons-type.fee.name',
  description: 'data.shlagemons-type.fee.description',
  color: '#EE99AC',
  resistance: [],
  weakness: ['poison', 'metal'],
  tags: ['collant'],
  passiveEffects: [],
}

export const dragon: ShlagemonType = {
  id: 'dragon',
  name: 'data.shlagemons-type.dragon.name',
  description: 'data.shlagemons-type.dragon.description',
  color: '#7038F8', // couleur violette proche du type Dragon
  resistance: ['feu', 'eau', 'electrique', 'plante'],
  weakness: ['dragon', 'glace', 'fee'],
  tags: ['mythique'],
  passiveEffects: [],
}

export const glace: ShlagemonType = {
  id: 'glace',
  name: 'data.shlagemons-type.glace.name',
  description: 'data.shlagemons-type.glace.description',
  color: '#98d8d8',
  resistance: ['glace'],
  weakness: ['feu', 'roche', 'combat', 'metal'],
  tags: ['gelé', 'froid'],
  passiveEffects: [],
}

export const insecte: ShlagemonType = {
  id: 'insecte',
  name: 'data.shlagemons-type.insecte.name',
  description: 'data.shlagemons-type.insecte.description',
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
