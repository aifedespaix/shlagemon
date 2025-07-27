import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import barbok from '../evolutions/barbok'

export const amoche: BaseShlagemon = {
  id: 'amoche',
  name: 'Amoche',
  description: `Amoche est une tentative ratée de serpent. Son corps est irrégulier, cabossé, et son museau semble avoir été dessiné au marqueur par un enfant triste. Sa peau terne évoque le plastique fondu, et il laisse derrière lui une traînée légèrement gluante dont l’origine reste floue. Amoche n’a pas conscience de sa propre mocheté, mais les autres Shlagémons la ressentent physiquement, ce qui lui confère une présence toxique passive. Son attaque *Regard Déformant* a une chance d’infliger l’état Malaise. Il ne rampe pas, il traîne. Il n’effraie pas, il gêne.`,
  descriptionKey: 'data.shlagemons.10-15.amoche.description',
  types: [shlagemonTypes.poison],
  coefficient: 13,
  evolutions: [{ base: barbok, condition: { type: 'lvl', value: 42 } }],
}

export default amoche
