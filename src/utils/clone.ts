import type { DexShlagemon } from '~/type'

export function cloneDexShlagemon(mon: DexShlagemon): DexShlagemon {
  return {
    ...mon,
    base: mon.base,
    baseStats: { ...mon.baseStats },
  }
}
