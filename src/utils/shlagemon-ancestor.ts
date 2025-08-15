import type { BaseShlagemon } from '~/type'
import { allShlagemons } from '~/data/shlagemons'

/**
 * Determine the identifier of the earliest ancestor for the provided Shlagémon.
 *
 * The search walks backward through the evolution chain by locating any
 * Shlagémon that evolves into the current one. When no previous form is
 * found, the current identifier is returned.
 *
 * @param id - Identifier of the Shlagémon to trace.
 * @returns Identifier of the root ancestor.
 */
export function findRootAncestorId(id: string): string {
  let current: BaseShlagemon | undefined = allShlagemons.find(m => m.id === id)
  if (!current)
    return id

  // Walk backward until no previous evolution is found.
  while (true) {
    const previous = allShlagemons.find((candidate) => {
      const evolutions = candidate.evolutions ?? (candidate.evolution ? [candidate.evolution] : [])
      return evolutions.some(e => e.base.id === current!.id)
    })
    if (!previous)
      return current.id
    current = previous
  }
}
