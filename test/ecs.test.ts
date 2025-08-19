import { addComponent, addEntity, createWorld } from 'bitecs'
import { describe, expect, it } from 'vitest'
import { Position, Velocity } from '~/ecs/components'
import { createRunner } from '~/ecs/pipeline'
import { movableQuery } from '~/ecs/queries'

describe('ecs components', () => {
  /** Simple deterministic random generator (mulberry32). */
  function createRandom(seed: number) {
    return function () {
      seed |= 0
      seed = seed + 0x6D2B79F5 | 0
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }

  it('given a seeded world when querying movable entities then returns expected ids', () => {
    const rand = createRandom(123)
    const world = createWorld()
    const eid = addEntity(world)
    addComponent(world, Position, eid)
    addComponent(world, Velocity, eid)
    // Seeded values
    Position.x[eid] = rand()
    Position.y[eid] = rand()
    Velocity.x[eid] = rand()
    Velocity.y[eid] = rand()

    const entities = movableQuery(world)
    expect(Array.from(entities)).toEqual([eid])
  })
})

describe('ecs pipeline', () => {
  it('given systems for each phase when runner executes then systems run in fixed order', () => {
    const calls: string[] = []
    const systems = {
      input: [(world: any) => {
        calls.push('input')
        return world
      }],
      physics: [(world: any) => {
        calls.push('physics')
        return world
      }],
      gameplay: [(world: any) => {
        calls.push('gameplay')
        return world
      }],
      post: [(world: any) => {
        calls.push('post')
        return world
      }],
    }
    const run = createRunner(systems)
    run(createWorld())
    expect(calls).toEqual(['input', 'physics', 'gameplay', 'post'])
  })
})
