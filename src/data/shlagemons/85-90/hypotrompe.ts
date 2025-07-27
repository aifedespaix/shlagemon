import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hyporuisseau from '../evolutions/hyporuisseau'

export const hypotrompe: BaseShlagemon = {
  id: 'hypotrompe',
  name: 'Hypotrompe',
  description: `Petit hippocampe distrait, Hypotrompe se trompe constamment de direction. Sa trompe démesurée lui sert à aspirer tout ce qui passe, y compris des objets qui n'auraient jamais dû finir dans un estomac.`,
  descriptionKey: 'data.shlagemons.85-90.hypotrompe.description',
  types: [shlagemonTypes.eau],
  coefficient: 87,
  evolutions: [{
    base: hyporuisseau,
    condition: { type: 'lvl', value: 92 },
  }],
}

export default hypotrompe
