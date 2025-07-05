import { defineStore } from 'pinia'

export type EventCallback<T = any> = (payload?: T) => void

export const useEventStore = defineStore('event', () => {
  const listeners = new Map<string, Set<EventCallback>>()

  function on<T = any>(event: string, cb: EventCallback<T>) {
    if (!listeners.has(event))
      listeners.set(event, new Set())
    listeners.get(event)!.add(cb as EventCallback)
  }

  function off<T = any>(event: string, cb: EventCallback<T>) {
    listeners.get(event)?.delete(cb as EventCallback)
  }

  function emit<T = any>(event: string, payload?: T) {
    listeners.get(event)?.forEach(cb => cb(payload))
  }

  return { on, off, emit }
})
