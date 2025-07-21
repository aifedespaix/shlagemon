import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const wem: BaseShlagemon = {
  id: 'wem',
  name: 'Wem',
  description: `Wem est terne, pataud, et délibérément inutile. On raconte qu’il a été créé par erreur lors d’un téléchargement corrompu d’un clone sur une imprimante 3D alimentée par une bouilloire.

Il ne vole pas, il ne flotte pas, il rampe doucement en couinant comme une chaussure mouillée. Chaque cellule de son corps transpire la médiocrité : ses attaques échouent à 60% du temps, ses pouvoirs sont incompatibles avec tous les systèmes connus, et même sa présence fait buguer les enceintes Bluetooth.

Son attaque signature, *Raté Critique*, inflige 0 dégâts mais provoque un inconfort durable chez l’adversaire. Wem a le pouvoir unique d’annuler l’enthousiasme autour de lui, et certains dresseurs le transportent uniquement pour neutraliser les encouragements du public adverse.

On ne le trouve pas : c’est lui qui reste, par erreur, au fond d’un sac. Son rêve ? Être ignoré parfaitement, comme un ticket de caisse mouillé.`,
  descriptionKey: 'data.shlagemons.wem.description',
  types: [shlagemonTypes.psy],
  coefficient: 115,
}

export default wem
