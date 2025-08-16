import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { toast } from '../src/modules/toast'
import { useDojoStore } from '../src/stores/dojo'

vi.mock('../src/modules/toast', () => ({ toast: { success: vi.fn() } }))
vi.mock('../src/modules/i18n', () => ({ i18n: { global: { t: (k: string) => k } } }))
vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({ shlagidolar: 0, addShlagidolar: vi.fn() }),
}))
vi.mock('../src/stores/shlagedex', () => ({
  useShlagedexStore: () => ({ shlagemons: [], setBusy: vi.fn() }),
}))

describe('dojo persistence', () => {
  it('completes due job after hydration', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const startedAt = Date.now() - 60_000 - 1_000
    const endsAt = startedAt + 60_000
    window.localStorage.setItem('dojo', JSON.stringify({
      byMonId: {
        m1: {
          monId: 'm1',
          startedAt,
          endsAt,
          fromRarity: 1,
          points: 1,
          targetRarity: 2,
          paid: 0,
          status: 'running',
        },
      },
    }))

    const dojo = useDojoStore()
    expect(dojo.getJob('m1')?.status).toBe('completed')
    expect(toast.success).toHaveBeenCalledWith('components.panel.Dojo.toast.finished')
  })
})
