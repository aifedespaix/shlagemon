import type { IWorld } from 'bitecs'

/** Ordered system phases. */
export const SYSTEM_ORDER = ['input', 'physics', 'gameplay', 'post'] as const

/** Type representing the name of a system phase. */
export type SystemPhase = typeof SYSTEM_ORDER[number]

/** A system operates on a world and returns it. */
export type System = (world: IWorld) => IWorld

/**
 * Create a runner that executes systems in the fixed order.
 *
 * @param systems Map of systems keyed by their phase.
 */
export function createRunner(systems: Partial<Record<SystemPhase, System[]>>) {
  return (world: IWorld) => {
    for (const phase of SYSTEM_ORDER) {
      for (const system of systems[phase] ?? [])
        world = system(world)
    }
    return world
  }
}
