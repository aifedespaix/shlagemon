import type { DexShlagemon } from '~/type/shlagemon'

/**
 * In-memory storage used to preserve the HP of Shlagémons during the finale battle.
 *
 * Keys are the unique Dex identifiers while values represent the HP at the time
 * the Shlagémon left the battlefield. All mutations happen in-place to keep the
 * reactive link with Vue stores.
 */
export type FinaleHpMemory = Record<string, number>

/**
 * Clamp a raw HP value into the valid range for the provided maximum.
 *
 * @param value - Current HP value to normalise.
 * @param maxHp - Maximum authorised HP for the Shlagémon.
 */
export function clampFinaleHp(value: number, maxHp: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(maxHp))
    return 0
  const safeMax = Math.max(0, Math.round(maxHp))
  if (safeMax <= 0)
    return 0
  const safeValue = Math.round(value)
  return Math.min(Math.max(safeValue, 0), safeMax)
}

/**
 * Persist the current HP of a Shlagémon inside the finale memory map.
 *
 * @param memory - Shared HP memory map.
 * @param mon - Shlagémon leaving the battlefield.
 * @param maxHp - Maximum HP allowed for the Shlagémon at this moment.
 * @returns The stored HP value.
 */
export function storeFinaleHp(memory: FinaleHpMemory, mon: DexShlagemon, maxHp: number): number {
  const value = clampFinaleHp(mon.hpCurrent, maxHp)
  memory[mon.id] = value
  return value
}

/**
 * Retrieve the HP that should be applied when a Shlagémon re-enters the finale battle.
 *
 * @param memory - Shared HP memory map.
 * @param mon - Shlagémon coming back into battle.
 * @param maxHp - Maximum HP allowed for the Shlagémon at this moment.
 * @returns The HP that should be applied when the Shlagémon is switched in.
 */
export function recallFinaleHp(memory: FinaleHpMemory, mon: DexShlagemon, maxHp: number): number {
  const stored = memory[mon.id]
  if (stored === undefined)
    return clampFinaleHp(maxHp, maxHp)
  return clampFinaleHp(stored, maxHp)
}

/**
 * Clear all stored HP values. The object reference is preserved to maintain reactivity.
 *
 * @param memory - Shared HP memory map.
 */
export function resetFinaleHpMemory(memory: FinaleHpMemory): void {
  for (const key of Object.keys(memory))
    delete memory[key]
}
