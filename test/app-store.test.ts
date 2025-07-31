import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useAppStore } from '../src/stores/app'

describe('app store', () => {
  it('toggles readiness', () => {
    setActivePinia(createPinia())
    const app = useAppStore()
    expect(app.isReady).toBe(false)
    app.setReady()
    expect(app.isReady).toBe(true)
  })
})
