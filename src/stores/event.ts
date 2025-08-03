import { defineStore } from 'pinia'

/**
 * Minimal event bus for cross-store communication.
 * Allows any module to subscribe to and emit typed events.
 */

export interface EventMap {
  'battle:end': void
}

export type EventCallback<T = unknown> = (payload?: T) => void

export const useEventStore = defineStore('event', () => {
  const listeners: { [K in keyof EventMap]?: Set<EventCallback<EventMap[K]>> } = {}

  function on<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>) {
    (listeners[event] ||= new Set()).add(cb)
  }

  function off<K extends keyof EventMap>(event: K, cb: EventCallback<EventMap[K]>) {
    listeners[event]?.delete(cb)
  }

  function emit<K extends keyof EventMap>(event: K, payload?: EventMap[K]) {
    listeners[event]?.forEach(cb => cb(payload))
  }

  return { on, off, emit }
})
