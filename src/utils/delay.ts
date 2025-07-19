import { promiseTimeout } from '@vueuse/shared'

/**
 * Promise-based timeout that optionally resolves with a value.
 */
export function delay<T = void>(ms: number, value?: T): Promise<T> {
  return promiseTimeout(ms).then(() => value as T)
}
