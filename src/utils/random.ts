/**
 * Utility functions for random operations.
 */

/**
 * Return a shuffled copy of the provided array using the Fisher-Yates algorithm.
 */
export function shuffle<T>(array: T[]): T[] {
  const result = array.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Return `count` random elements from the provided array.
 */
export function sample<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count)
}
