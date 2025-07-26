import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useZoneStore } from '../src/stores/zone'

// Verify that stored value "arena" does not persist when no arena battle is active

describe('main panel hydration', () => {
  it('falls back from arena panel when not in battle', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    // simulate persisted state
    window.localStorage.setItem('mainPanel', JSON.stringify({ current: 'arena' }))

    const zone = useZoneStore()
    const panel = useMainPanelStore()

    const expected = zone.current.type === 'village' ? 'village' : 'battle'
    expect(panel.current).toBe(expected)
  })
})
