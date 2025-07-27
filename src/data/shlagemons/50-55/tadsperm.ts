import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grostadsperm from '../evolutions/grostadsperm'

export const tadsperm: BaseShlagemon = {
  id: 'tadsperm',
  name: 'Tadsperm',
  description: `Tadsperm est un tas visqueux au teint douteux, oscillant entre le gris laiteux et le beige maladif. Son corps dégouline de gouttes épaisses qui s’échappent en permanence, laissant derrière lui des traces suspectes et gluantes. Son sourire est béat, l’œil mi-clos, l’air totalement détaché du monde extérieur.

Sa principale occupation : s’isoler dans des coins sombres pour savourer les plaisirs les plus solitaires de la vie. Son attaque signature, *Jet Spontané*, consiste à projeter une gerbe collante et opaque qui ralentit et colle l’adversaire sur place.

On raconte qu’il passe plus de temps à “méditer” qu’à se battre. Certains dresseurs disent avoir glissé dessus dans les vestiaires…`,
  descriptionKey: 'data.shlagemons.50-55.tadsperm.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: grostadsperm,
    condition: {
      type: 'lvl',
      value: 59,
    },
  },
}

export default tadsperm
