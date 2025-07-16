import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { BaseShlagemon, Trainer } from '~/types'
import { caillou } from './characters/caillou'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { norman } from './characters/norman'
import { profMerdant } from './characters/prof-merdant'
import { sachatte } from './characters/sachatte'
import { siphanus } from './characters/siphanus'
import { zonesData } from './zones'

function createKing(zoneId: SavageZoneId, character: Character, qteShlagemons: number, dialogBefore: string, dialogAfter: string, dialogDefeat: string): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)!
  if (!zone) {
    console.warn(`Zone ${zoneId} not found`)
    return
  }
  const levelMax = (zone.maxLevel ?? 1) + 1

  // Gather base shlagemons and their first evolution stage
  const available = zone.shlagemons!
    .flatMap(b => b.evolution?.base ? [b, b.evolution.base] : [b])
    // Remove potential duplicates by id
    .reduce<Record<string, BaseShlagemon>>((acc, mon) => {
      acc[mon.id] = mon
      return acc
    }, {})
  const uniqueMons = Object.values(available)

  // Sort by coefficient descending to pick the strongest ones
  const sorted = uniqueMons.sort((a, b) => b.coefficient - a.coefficient)
  const selected = sorted.slice(0, qteShlagemons).reverse()

  const shlagemons: { baseId: string, level: number }[] = selected.map((b, idx) => ({
    baseId: b.id,
    level: levelMax - (selected.length - 1 - idx),
  }))

  return {
    id: `king-${zoneId}`,
    character,
    dialogBefore,
    dialogAfter,
    dialogDefeat,
    reward: zone.maxLevel || 1,
    shlagemons,
  }
}

export const kings: Trainer[] = [
  createKing('plaine-kekette', caillou, 2, 'Je protege cette plaine, prepare-toi!', 'Hum, tu m\'as battu, chanceux.', 'Hahaha ! J\'t\'ai explosé, retourne jouer dans le bac à sable !'),
  createKing('bois-de-bouffon', sachatte, 3, 'Ces bois seront ta tombe.', 'Je reviendrai plus fort.', 'Tes griffes sont émoussées, je t\'ai humilié, miaou!'),
  createKing('chemin-du-slip', norman, 4, 'Entres dans ma grotte si tu l\'oses.', 'Ta victoire ne sera que temporaire.', 'Tu pues la lose, file te laver !'),
  createKing('ravin-fesse-molle', marineLahaine, 4, 'Le ravin te verra chuter!', 'Incroyable... tu as gagné.', 'Jette-toi dans le ravin et qu\'on en parle plus, naze.'),
  createKing('precipice-nanard', marcon, 5, 'Le vieux Nanard t\'attend.', 'Le vieux Nanard te regarde avec degout.', 'Le vieux Nanard t\'a roulé dessus, pauvre cloche.'),
  createKing('marais-moudugenou', siphanus, 5, 'Tu vas couler dans le marais!', 'Tu t\'extirpes du marais victorieux.', 'Je t\'éclabousse de ma boue, retourne barboter ailleurs.'),
  createKing('forteresse-petmoalfiak', profMerdant, 5, 'Ma forteresse est imprenable!', 'Tu as brise ma forteresse...', 'Boum ! Ma forteresse t\'écrase, petit cancre.'),
  createKing('route-du-nawak', caillou, 6, 'Perds-toi sur cette route!', 'Tu t\'en sors, pour l\'instant.', 'Complètement paumé ? Je t\'ai laissé sur le bord, tocard.'),
  createKing('mont-dracatombe', norman, 6, 'Le sommet est pour les braves!', 'Le mont te cede la victoire.', 'T\'es moins drôle que mes vannes foireuses, dégage.'),
  createKing('catacombes-merdifientes', marineLahaine, 6, 'Les catacombes sont ton futur tombeau.', 'Je sombre dans l\'ombre des catacombes.', 'Remonte donc à la surface, larve.'),
  createKing('route-aguicheuse', marcon, 6, 'Tentes-tu ta chance ici?', 'Bien joue, voyageur.', 'Président 1 - Toi 0. Allez, file avant que je te taxe.'),
  createKing('vallee-des-chieurs', sachatte, 7, 'Personne ne ressort de cette grotte.', 'Tu as dompte la puanteur.', 'Même tes pets n\'effraient personne, perdant.'),
  createKing('trou-du-bide', caillou, 7, 'Mon trou ne te fera pas de cadeau.', 'Je m\'incline... pour cette fois.', 'Même mon trou a plus de talent que toi.'),
  createKing('zone-giga-zob', profMerdant, 7, 'Bienvenue en enfer!', 'Impossible... comment as-tu fait ?', 'Hop, direction les rattrapages, minus !'),
  createKing('route-so-dom', marcon, 8, 'Derniere ligne droite, minus!', 'Tu es vraiment le meilleur.', 'J\'avance, toi tu recules, larbin.'),
]
