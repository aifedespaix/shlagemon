import type { BaseShlagemon } from '~/data/shlagemons'
import type { DexShlagemon } from '~/types'

export function createDexShlagemon(base: BaseShlagemon): DexShlagemon {
  return {
    ...base,
    lvl: 1,
    rarity: 1,
    hp: 50,
    attack: 10,
    defense: 10,
    smelling: 1,
  }
}
