import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useMobileTabStore } from '../src/stores/mobileTab'

describe('main panel mobile behaviour', () => {
  it('closes mobile panel when entering arena or minigame but not shop', () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any

    const pinia = createPinia()
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const panel = useMainPanelStore()
    const mobile = useMobileTabStore()

    mobile.set('dex')
    panel.showArena()
    expect(mobile.current).toBe('game')

    mobile.set('dex')
    panel.showMiniGame()
    expect(mobile.current).toBe('game')

    mobile.set('dex')
    panel.showShop()
    expect(mobile.current).toBe('dex')

    window.matchMedia = originalMatchMedia
  })
})
