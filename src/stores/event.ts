import { defineStore } from 'pinia'

/**
 * Minimal event bus for cross-store communication.
 * Allows any module to subscribe to and emit typed events.
 */

export interface EventMap {
  'battle:end': void
}

export type EventCallback<T = unknown> = (payload: T) => void

export const useEventStore = defineStore('event', () => {
  const listeners = new Map<
    keyof EventMap,
    Set<EventCallback<EventMap[keyof EventMap]>>
  >()

  function on<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>) {
    if (!listeners.has(event))
      listeners.set(event, new Set())
    listeners.get(event)!.add(cb as EventCallback<EventMap[keyof EventMap]>)
  }

  function off<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>) {
    listeners.get(event)?.delete(cb as EventCallback<EventMap[keyof EventMap]>)
  }

  function emit<K extends keyof EventMap>(event: K, payload?: EventMap[K]) {
    listeners.get(event)?.forEach(cb => cb(payload as EventMap[K]))
  }

  return { on, off, emit }
})
