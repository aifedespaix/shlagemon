import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const mVentriloque: BaseShlagemon = {
  id: 'm-ventriloque',
  name: 'M. Ventriloque',
  description: `C'est le sosie raté d'un célèbre humoriste et il passe son temps à discuter avec sa propre main. Ses tours de ventriloquie mettent mal à l'aise plus qu'ils ne font rire.`,
  descriptionKey: 'data.shlagemons.90-95.m-ventriloque.description',
  types: [shlagemonTypes.psy],
}

export default mVentriloque
