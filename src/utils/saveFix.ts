import type { DexShlagemon } from '~/type'

/**
 * Supprime les doublons dans le Schlagedex en choisissant le meilleur
 * Schlagémon de chaque base.
 */
export function deduplicateDex(mons: DexShlagemon[], activeId?: string): DexShlagemon[] {
  const groups = new Map<string, DexShlagemon[]>()
  for (const mon of mons) {
    const baseId = mon.base.id
    const arr = groups.get(baseId)
    if (arr)
      arr.push(mon)
    else
      groups.set(baseId, [mon])
  }

  const result: DexShlagemon[] = []
  for (const arr of groups.values()) {
    let best = arr[0]
    for (const mon of arr.slice(1)) {
      if (isBetter(mon, best))
        best = mon
    }

    const keep = arr.find(m => m.id === activeId) ?? best
    if (keep !== best)
      Object.assign(keep, { ...best, id: keep.id })

    result.push(keep)
  }
  return result
}

function isBetter(a: DexShlagemon, b: DexShlagemon): boolean {
  if (a.isShiny !== b.isShiny)
    return a.isShiny
  if (a.rarity !== b.rarity)
    return a.rarity > b.rarity
  if (a.lvl !== b.lvl)
    return a.lvl > b.lvl
  return false
}
