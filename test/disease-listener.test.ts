import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDiseaseStore } from '../src/stores/disease'
import { useEventStore } from '../src/stores/event'

describe('disease event listener cleanup', () => {
  it('removes listener on dispose and registers only one on recreate', () => {
    setActivePinia(createPinia())
    const events = useEventStore()
    const firstStore = useDiseaseStore()

    firstStore.start()
    const firstRemaining = firstStore.remaining
    events.emit('battle:end')
    expect(firstStore.remaining).toBe(firstRemaining - 1)

    firstStore.$dispose()
    const remainingAfterDispose = firstStore.remaining
    events.emit('battle:end')
    expect(firstStore.remaining).toBe(remainingAfterDispose)

    const secondStore = useDiseaseStore()
    secondStore.start()
    const secondRemaining = secondStore.remaining
    events.emit('battle:end')

    expect(firstStore.remaining).toBe(remainingAfterDispose)
    expect(secondStore.remaining).toBe(secondRemaining - 1)
  })
})
