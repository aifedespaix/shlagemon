import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grosseflemme: BaseShlagemon = {
  id: 'grosseflemme',
  name: 'Grosseflemme',
  description: `Grosseflemme est l’incarnation ultime de la dégradation shlagémonesque. Sa carapace rocheuse, autrefois robuste, est désormais couverte de taches d’humidité, de mousse et de vieux chewing-gums collés. Il est si lourd et vautré qu’il a fusionné avec le canapé abandonné sur lequel il traîne depuis des années. Ses bras et jambes semblent presque atrophiés, mais il parvient encore à tendre la main pour attraper un paquet de chips ou rallumer une clope.

Son visage affiche un mélange de lassitude et d’aigreur, les yeux mi-clos, cernés à l’extrême. Des restes de pizza et des canettes vides jonchent le sol autour de lui. La seule chose qui le motive, c’est de râler sur les autres Shlagémons, tout en soupirant bruyamment.

**Attaque signature :** *Souffle Fétide* — Grosseflemme baille en direction de l’adversaire, libérant un souffle d’haleine croupie capable d’endormir même les plus motivés.

On raconte que personne n’a jamais vu Grosseflemme se lever de son canapé, sauf une fois, pour atteindre une télécommande tombée trop loin. Même là, il a préféré lancer une pantoufle plutôt que de faire l’effort de bouger.`,
  descriptionKey: 'data.shlagemons.evolutions.grosseflemme.description',
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
}

export default grosseflemme
