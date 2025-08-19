import { defineQuery } from 'bitecs'
import { Health, InputState, Position, Team, Velocity } from './components'

/** Entities that can move (have both Position and Velocity). */
export const movableQuery = defineQuery([Position, Velocity])

/** Entities with health points. */
export const healthQuery = defineQuery([Health])

/** Entities controlled via inputs. */
export const inputQuery = defineQuery([InputState])

/** Entities with team affiliation. */
export const teamQuery = defineQuery([Team])
