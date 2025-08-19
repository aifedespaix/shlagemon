/**
 * Seedable pseudo-random number generator based on Mulberry32 algorithm.
 * Provides deterministic sequences for reproducible simulations.
 */
export class PRNG {
  private state: number

  constructor(seed: number) {
    if (!Number.isInteger(seed))
      throw new Error('Seed must be an integer')
    this.state = seed >>> 0
  }

  /**
   * Generates the next pseudo-random number in [0, 1).
   */
  next(): number {
    // Mulberry32 algorithm
    let t = this.state += 0x6D2B79F5
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  /**
   * Returns current internal state for snapshotting.
   */
  getState(): number {
    return this.state >>> 0
  }

  /**
   * Restores the internal state from snapshot.
   */
  setState(state: number): void {
    if (!Number.isInteger(state))
      throw new Error('State must be an integer')
    this.state = state >>> 0
  }
}
