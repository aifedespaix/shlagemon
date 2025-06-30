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
    return {
      ...parsed,
      shlagemons: parsed.shlagemons.map((mon: any) => ({
        ...mon,
        base: mon.base ?? baseMap[mon.baseId],
        baseId: mon.baseId ?? mon.base?.id,
      })),
      activeShlagemon: parsed.activeShlagemon
        ? {
            ...parsed.activeShlagemon,
            base: parsed.activeShlagemon.base
              ?? baseMap[parsed.activeShlagemon.baseId],
            baseId: parsed.activeShlagemon.baseId
              ?? parsed.activeShlagemon.base?.id,
          }
        : null,
    }
  },
}
