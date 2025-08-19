import { addComponent, addEntity, createWorld } from 'bitecs'
import { describe, expect, it } from 'vitest'
import { Health, InputState, Position, Team, Velocity } from '~/ecs/components'
import { createRunner } from '~/ecs/pipeline'
import { healthQuery, inputQuery, movableQuery, teamQuery } from '~/ecs/queries'

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

describe('ecs queries', () => {
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

  it('given a seeded world when querying health entities then returns expected ids', () => {
    const rand = createRandom(456)
    const world = createWorld()
    const eid = addEntity(world)
    addComponent(world, Health, eid)
    Health.current[eid] = Math.floor(rand() * 100)
    Health.max[eid] = Health.current[eid] + Math.floor(rand() * 50)
    addEntity(world) // entity without health

    const entities = healthQuery(world)
    expect(Array.from(entities)).toEqual([eid])
  })

  it('given a seeded world when querying input entities then returns expected ids', () => {
    const rand = createRandom(789)
    const world = createWorld()
    const eid = addEntity(world)
    addComponent(world, InputState, eid)
    InputState.left[eid] = rand() > 0.5 ? 1 : 0
    InputState.right[eid] = rand() > 0.5 ? 1 : 0
    InputState.up[eid] = rand() > 0.5 ? 1 : 0
    InputState.down[eid] = rand() > 0.5 ? 1 : 0
    InputState.action[eid] = rand() > 0.5 ? 1 : 0
    addEntity(world) // entity without input state

    const entities = inputQuery(world)
    expect(Array.from(entities)).toEqual([eid])
  })

  it('given a seeded world when querying team entities then returns expected ids', () => {
    const rand = createRandom(101112)
    const world = createWorld()
    const eid = addEntity(world)
    addComponent(world, Team, eid)
    Team.id[eid] = Math.floor(rand() * 8)
    addEntity(world) // entity without team

    const entities = teamQuery(world)
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
