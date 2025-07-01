import { allShlagemons } from '~/data/shlagemons'

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
        }
      })
      .filter(Boolean)

    let active = parsed.activeShlagemon
    if (active) {
      const base = active.base ?? baseMap[active.baseId]
      active = base
        ? {
            ...active,
            base,
            baseId: active.baseId ?? base.id,
          }
        : null
    }

    return {
      ...parsed,
      shlagemons,
      activeShlagemon: active ?? null,
    }
  },
}
