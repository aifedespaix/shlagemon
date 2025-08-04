import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useAudioStore } from '../src/stores/audio'

/** Ensure audio store can be serialized during SSR. */
describe('audio store SSR serialization', () => {
  it('serializes pinia state', () => {
    const original = import.meta.env.SSR
    import.meta.env.SSR = true
    try {
      const pinia = createPinia()
      setActivePinia(pinia)
      useAudioStore()
      expect(() => JSON.stringify(pinia.state.value)).not.toThrow()
    }
    finally {
      import.meta.env.SSR = original
      setActivePinia(createPinia())
    }
  })
})
