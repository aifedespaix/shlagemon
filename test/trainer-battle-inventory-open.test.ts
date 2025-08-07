import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useMobileTabStore } from '../src/stores/mobileTab'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('trainer battle inventory panel', () => {
  it('opens inventory tab at start', () => {
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

    const dex = useShlagedexStore()
    dex.createShlagemon(carapouffe)

    const panel = useMainPanelStore()
    const mobile = useMobileTabStore()

    panel.showTrainerBattle()

    expect(mobile.current).toBe('inventory')

    window.matchMedia = originalMatchMedia
  })
})
