import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ricardnin: BaseShlagemon = {
  id: 'ricardnin',
  name: 'Ricardnin',
  description: `Ricardnin n’apparaît que lors des barbecues familiaux prolongés. On le reconnaît à sa casquette délavée à l'odeur suspecte et à la fiole sacrée qu’il garde en pendentif, qu’il appelle sa réserve tactique. Il aboie dès qu’il entend les mots "pétanque", "saucisson" ou "c’est qui qui a pris ma chaise là ?". Son haleine inflige des dégâts sur la durée, surtout s’il a mangé de l’aïoli. Son attaque signature, Souffle Anisé, embrume le terrain dans un nuage jaunâtre qui réduit la précision de tous les Pokémon adverses. Il peut aussi lancer Provoquapéro, qui oblige les dresseurs à faire une pause et à sortir les chips.`,
  descriptionKey: 'data.shlagemons.evolutions.ricardnin.description',
  types: [shlagemonTypes.feu, shlagemonTypes.eau],
}

export default ricardnin
