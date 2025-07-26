import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { useMobileTabStore } from '../src/stores/mobileTab'

describe('mobile tab persistence', () => {
  it('restores current tab from storage', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    // simulate previously saved tab
    window.localStorage.setItem('mobileTab', JSON.stringify({ current: 'dex' }))

    const tab = useMobileTabStore()
    expect(tab.current).toBe('dex')
  })
})
