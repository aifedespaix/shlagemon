import { allShlagemons } from '~/data/shlagemons'
import { baseStats, statWithRarityAndCoefficient } from './dexFactory'
import { deduplicateDex } from './saveFix'

function getBaseMap() {
  return Object.fromEntries(
    (allShlagemons || []).filter(Boolean).map(b => [b.id, b]),
  )
}

export const shlagedexSerializer = {
  serialize(data: any): string {
    return JSON.stringify({
      ...data,
      shlagemons: data.shlagemons.map((mon: any) => ({
        ...mon,
        baseId: mon.base?.id ?? mon.baseId,
        base: undefined, // on supprime la boucle
        heldItemId: mon.heldItemId ?? null,
      })),
      activeShlagemon: data.activeShlagemon
        ? {
            ...data.activeShlagemon,
            baseId: data.activeShlagemon.base?.id ?? data.activeShlagemon.baseId,
            base: undefined,
            heldItemId: data.activeShlagemon.heldItemId ?? null,
          }
        : null,
    })
  },

  deserialize(raw: string): any {
    const parsed = JSON.parse(raw)

    const baseMap = getBaseMap()

    let shlagemons = (parsed.shlagemons || [])
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
          captureDate: mon.captureDate ?? new Date().toISOString(),
          captureCount: mon.captureCount ?? 1,
          heldItemId: mon.heldItemId ?? null,
        }
      })
      .filter(Boolean)

    // build active before deduplication so that deduplication can keep its id
    let active = parsed.activeShlagemon
    if (active) {
      const base = active.base ?? baseMap[active.baseId]
      if (base) {
        active = {
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
          captureDate: active.captureDate ?? new Date().toISOString(),
          captureCount: active.captureCount ?? 1,
          heldItemId: active.heldItemId ?? null,
        }
      }
      else {
        active = null
      }
    }

    shlagemons = deduplicateDex(shlagemons, active?.id)

    if (active) {
      const found = shlagemons.find((m: any) => m.id === active!.id)
        || shlagemons.find((m: any) => m.base.id === active!.base.id)
      if (found)
        active = found
    }

    return {
      ...parsed,
      shlagemons,
      activeShlagemon: active ?? null,
    }
  },
}
