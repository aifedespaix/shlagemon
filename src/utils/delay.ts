/**
 * Promise-based timeout that optionally resolves with a value.
 */
export function delay<T = void>(ms: number, value?: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value as T), ms))
}
