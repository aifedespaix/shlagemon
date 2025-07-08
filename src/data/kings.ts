import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { Trainer } from '~/types'
import { caillou } from './characters/caillou'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { norman } from './characters/norman'
import { profMerdant } from './characters/prof-merdant'
import { sachatte } from './characters/sachatte'
import { siphanus } from './characters/siphanus'
import { zonesData } from './zones'

function createKing(zoneId: SavageZoneId, character: Character, qteShlagemons: number, dialogBefore: string, dialogAfter: string): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)!
  if (!zone) {
    console.warn(`Zone ${zoneId} not found`)
    return
  }
  const level = zone.maxLevel || 1 + 1

  const shlagemons: { baseId: string, level: number }[] = []
  const orderedShlagemons = zone.shlagemons!.sort((a, b) => a.coefficient - b.coefficient)
  if (qteShlagemons > 1) {
    let i = qteShlagemons
    shlagemons.push(...orderedShlagemons.slice(0, qteShlagemons - 1).map(b => ({ baseId: b.id, level: level - i-- })))
  }
  shlagemons.push(...orderedShlagemons.slice(-1).map(b => ({ baseId: b.id, level })))

  return {
    id: `king-${zoneId}`,
    character,
    dialogBefore,
    dialogAfter,
    reward: zone.maxLevel || 1,
    shlagemons,
  }
}

export const kings: Trainer[] = [
  createKing('plaine-kekette', caillou, 2, 'Je protege cette plaine, prepare-toi!', 'Hum, tu m\'as battu, chanceux.'),
  createKing('bois-de-bouffon', sachatte, 3, 'Ces bois seront ta tombe.', 'Je reviendrai plus fort.'),
  createKing('chemin-du-slip', norman, 4, 'Entres dans ma grotte si tu l\'oses.', 'Ta victoire ne sera que temporaire.'),
  createKing('ravin-fesse-molle', marineLahaine, 4, 'Le ravin te verra chuter!', 'Incroyable... tu as gagné.'),
  createKing('precipice-nanard', marcon, 5, 'Le vieux Nanard t\'attend.', 'Le vieux Nanard te regarde avec degout.'),
  createKing('marais-moudugenou', siphanus, 5, 'Tu vas couler dans le marais!', 'Tu t\'extirpes du marais victorieux.'),
  createKing('forteresse-petmoalfiak', profMerdant, 5, 'Ma forteresse est imprenable!', 'Tu as brise ma forteresse...'),
  createKing('route-du-nawak', caillou, 6, 'Perds-toi sur cette route!', 'Tu t\'en sors, pour l\'instant.'),
  createKing('mont-dracatombe', norman, 6, 'Le sommet est pour les braves!', 'Le mont te cede la victoire.'),
  createKing('catacombes-merdifientes', marineLahaine, 6, 'Les catacombes sont ton futur tombeau.', 'Je sombre dans l\'ombre des catacombes.'),
  createKing('route-aguicheuse', marcon, 6, 'Tentes-tu ta chance ici?', 'Bien joue, voyageur.'),
  createKing('vallee-des-chieurs', sachatte, 7, 'Personne ne ressort de cette grotte.', 'Tu as dompte la puanteur.'),
  createKing('trou-du-bide', caillou, 7, 'Mon trou ne te fera pas de cadeau.', 'Je m\'incline... pour cette fois.'),
  createKing('zone-giga-zob', profMerdant, 7, 'Bienvenue en enfer!', 'Impossible... comment as-tu fait ?'),
  createKing('route-so-dom', marcon, 8, 'Derniere ligne droite, minus!', 'Tu es vraiment le meilleur.'),
]
