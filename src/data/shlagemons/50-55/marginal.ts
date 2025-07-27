import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import leviaraison from '../evolutions/leviaraison'

export const marginal: BaseShlagemon = {
  id: 'marginal',
  name: 'Marginal',
  description: `Marginal passe son temps à jongler sur une corde raide tout en jouant du diabolo. Il fait la manche dans les ports en espérant qu'on lui lance autre chose que des tomates.`,
  descriptionKey: 'data.shlagemons.50-55.marginal.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: leviaraison,
    condition: { type: 'lvl', value: 100 },
  },
}

export default marginal
