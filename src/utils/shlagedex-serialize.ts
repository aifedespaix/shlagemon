import { allShlagemons } from '~/data/shlagemons'
import { baseStats, statWithRarityAndCoefficient } from './dexFactory'

const baseMap = Object.fromEntries(allShlagemons.map(b => [b.id, b]))

export const shlagedexSerializer = {
  serialize(data: any): string {
    return JSON.stringify({
      ...data,
      shlagemons: data.shlagemons.map((mon: any) => ({
        ...mon,
        baseId: mon.base?.id ?? mon.baseId,
        base: undefined, // on supprime la boucle
      })),
      activeShlagemon: data.activeShlagemon
        ? {
            ...data.activeShlagemon,
            baseId: data.activeShlagemon.base?.id ?? data.activeShlagemon.baseId,
            base: undefined,
          }
        : null,
    })
  },

  deserialize(raw: string): any {
    const parsed = JSON.parse(raw)

    const shlagemons = (parsed.shlagemons || [])
      .map((mon: any) => {
        const base = mon.base ?? baseMap[mon.baseId]
        if (!base)
          return null
        return {
          ...mon,
          base,
          baseId: mon.baseId ?? base.id,
          baseStats: mon.baseStats ?? {
            hp: statWithRarityAndCoefficient(baseStats.hp, base.coefficient, mon.rarity ?? 1),
            attack: statWithRarityAndCoefficient(baseStats.attack, base.coefficient, mon.rarity ?? 1),
            defense: statWithRarityAndCoefficient(baseStats.defense, base.coefficient, mon.rarity ?? 1),
            smelling: statWithRarityAndCoefficient(baseStats.smelling, base.coefficient, mon.rarity ?? 1),
          },
          allowEvolution: mon.allowEvolution ?? true,
        }
      })
      .filter(Boolean)

    let active = parsed.activeShlagemon
    if (active) {
      const base = active.base ?? baseMap[active.baseId]
      if (base) {
        const found = shlagemons.find((m: any) => m.id === active.id)
        active = found || {
          ...active,
          base,
          baseId: active.baseId ?? base.id,
          baseStats: active.baseStats ?? {
            hp: statWithRarityAndCoefficient(baseStats.hp, base.coefficient, active.rarity ?? 1),
            attack: statWithRarityAndCoefficient(baseStats.attack, base.coefficient, active.rarity ?? 1),
            defense: statWithRarityAndCoefficient(baseStats.defense, base.coefficient, active.rarity ?? 1),
            smelling: statWithRarityAndCoefficient(baseStats.smelling, base.coefficient, active.rarity ?? 1),
          },
          allowEvolution: active.allowEvolution ?? true,
        }
      }
      else {
        active = null
      }
    }

    return {
      ...parsed,
      shlagemons,
      activeShlagemon: active ?? null,
    }
  },
}
