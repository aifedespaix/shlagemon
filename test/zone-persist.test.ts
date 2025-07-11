import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { useZoneStore } from '../src/stores/zone'

describe('zone persistence', () => {
  it('restores current zone from storage', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    setActivePinia(pinia)

    // simulate previously saved zone
    window.localStorage.setItem('zone', JSON.stringify({ currentId: 'village-boule' }))

    const zone = useZoneStore()
    expect(zone.current.id).toBe('village-boule')
  })
})
