import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { Trainer } from '~/types'
import { caillou } from './characters/caillou'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { norman } from './characters/norman'
import { profMerdant } from './characters/prof-merdant'
import { sachatte } from './characters/sachatte'
import { zonesData } from './zones'

function createKing(zoneId: SavageZoneId, character: Character, dialogBefore: string, dialogAfter: string): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)!
  const level = zone.maxLevel + 1
  const size = zone.maxLevel < 10 ? 3 : 6
  const shlagemons = (zone.shlagemons ?? []).slice(0, size).map(b => ({ baseId: b.id, level }))
  return {
    id: `king-${zoneId}`,
    character,
    dialogBefore,
    dialogAfter,
    reward: zone.maxLevel,
    shlagemons,
  }
}

export const kings: Trainer[] = [
  createKing('plaine-kekette', caillou, 'Je protege cette plaine, prepare-toi!', 'Hum, tu m\'as battu, chanceux.'),
  createKing('bois-de-bouffon', sachatte, 'Ces bois seront ta tombe.', 'Je reviendrai plus fort.'),
  createKing('chemin-du-slip', norman, 'Entres dans ma grotte si tu l\'oses.', 'Ta victoire ne sera que temporaire.'),
  createKing('ravin-fesse-molle', marineLahaine, 'Le ravin te verra chuter!', 'Incroyable... tu as gagné.'),
  createKing('precipice-nanard', marcon, 'Le vieux Nanard t\'attend.', 'Le vieux Nanard te regarde avec degout.'),
  createKing('marais-moudugenou', sachatte, 'Tu vas couler dans le marais!', 'Tu t\'extirpes du marais victorieux.'),
  createKing('forteresse-petmoalfiak', profMerdant, 'Ma forteresse est imprenable!', 'Tu as brise ma forteresse...'),
  createKing('route-du-nawak', caillou, 'Perds-toi sur cette route!', 'Tu t\'en sors, pour l\'instant.'),
  createKing('mont-dracatombe', norman, 'Le sommet est pour les braves!', 'Le mont te cede la victoire.'),
  createKing('catacombes-merdifientes', marineLahaine, 'Les catacombes sont ton futur tombeau.', 'Je sombre dans l\'ombre des catacombes.'),
  createKing('route-aguicheuse', marcon, 'Tentes-tu ta chance ici?', 'Bien joue, voyageur.'),
  createKing('vallee-des-chieurs', sachatte, 'Personne ne ressort de cette grotte.', 'Tu as dompte la puanteur.'),
  createKing('trou-du-bide', caillou, 'Mon trou ne te fera pas de cadeau.', 'Je m\'incline... pour cette fois.'),
  createKing('zone-giga-zob', profMerdant, 'Bienvenue en enfer!', 'Impossible... comment as-tu fait ?'),
  createKing('route-so-dom', marcon, 'Derniere ligne droite, minus!', 'Tu es vraiment le meilleur.'),
]
