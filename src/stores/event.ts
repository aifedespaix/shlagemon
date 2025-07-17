import { defineStore } from 'pinia'

export interface EventMap {
  'battle:end': void
}

export type EventCallback<T = any> = (payload: T) => void

export const useEventStore = defineStore('event', () => {
  const listeners = new Map<keyof EventMap, Set<(payload: any) => void>>()

  function on<K extends keyof EventMap>(event: K, cb: (payload: EventMap[K]) => void) {
    if (!listeners.has(event))
      listeners.set(event, new Set())
    listeners.get(event)!.add(cb as (payload: any) => void)
  }

  function off<K extends keyof EventMap>(event: K, cb: (payload: EventMap[K]) => void) {
    listeners.get(event)?.delete(cb as (payload: any) => void)
  }

  function emit<K extends keyof EventMap>(event: K, payload?: EventMap[K]) {
    listeners.get(event)?.forEach(cb => cb(payload as EventMap[K]))
  }

  return { on, off, emit }
})
