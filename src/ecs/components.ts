import { defineComponent, Types } from 'bitecs'

/**
 * Position of an entity in 2D space.
 *
 * Values are stored as 32-bit floats to allow sub‑tile precision.
 */
export const Position = defineComponent({
  /** Horizontal coordinate. */
  x: Types.f32,
  /** Vertical coordinate. */
  y: Types.f32,
})

/**
 * Velocity of an entity in 2D space.
 *
 * Each component represents the delta applied to Position every tick.
 */
export const Velocity = defineComponent({
  /** Horizontal speed. */
  x: Types.f32,
  /** Vertical speed. */
  y: Types.f32,
})

/**
 * Health points of an entity.
 */
export const Health = defineComponent({
  /** Current health points. */
  current: Types.ui16,
  /** Maximum health points. */
  max: Types.ui16,
})

/**
 * Inputs captured for an entity.
 *
 * Binary flags are represented by unsigned 8-bit integers for performance.
 */
export const InputState = defineComponent({
  /** Movement to the left (1) or not (0). */
  left: Types.ui8,
  /** Movement to the right (1) or not (0). */
  right: Types.ui8,
  /** Movement upward (1) or not (0). */
  up: Types.ui8,
  /** Movement downward (1) or not (0). */
  down: Types.ui8,
  /** Primary action button. */
  action: Types.ui8,
})

/**
 * Team identifier for an entity. Useful for friendly‑fire checks.
 */
export const Team = defineComponent({
  /** Numeric team identifier. */
  id: Types.ui8,
})
