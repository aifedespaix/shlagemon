import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useAccessibilityStore } from '../src/stores/accessibility'

describe('accessibility store', () => {
  it('auto hides tooltips by default', () => {
    setActivePinia(createPinia())
    const store = useAccessibilityStore()
    expect(store.autoHideTooltips).toBe(true)
  })

  it('updates auto hide preference', () => {
    setActivePinia(createPinia())
    const store = useAccessibilityStore()
    store.setAutoHideTooltips(false)
    expect(store.autoHideTooltips).toBe(false)
  })
})
