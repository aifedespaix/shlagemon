import type { BaseShlagemon } from '~/type'
import { abraquemar } from './abraquemar'
import { alaouakbar } from './alaouakbar'
import { bulgrosboule } from './bulgrosboule'
import { canarchichon } from './canarchichon'
import { carapouffe } from './carapouffe'
import { dartagnan } from './dartagnan'
import { emboli } from './emboli'
import { goubite } from './goubite'
import { metamorve } from './metamorve'
import { mewteub } from './mewteub'
import { nanmeouesh } from './nameouesh'
import { nosferachid } from './nosferachid'
import { pikachiant } from './pikachiant'
import { ptitocard } from './ptitocard'
import { qulbudrogue } from './qulbudrogue'
import { ricardnin } from './ricardnin'
import { rouxPasCool } from './rouxPasCool'
import { sacdepates } from './sacdepates'
import { salamiches } from './salamiches'
import { sperectum } from './sperectum'

export {
  abraquemar,
  alaouakbar,
  bulgrosboule,
  canarchichon,
  carapouffe,
  dartagnan,
  emboli,
  goubite,
  metamorve,
  mewteub,
  nanmeouesh,
  nosferachid,
  pikachiant,
  ptitocard,
  qulbudrogue,
  ricardnin,
  rouxPasCool,
  sacdepates,
  salamiches,
  sperectum,
}

export const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]

const modules = import.meta.glob<{ default: BaseShlagemon }>('./*.ts', { eager: true })

export const allShlagemons: BaseShlagemon[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts'))
  .map(([, m]) => m.default)
