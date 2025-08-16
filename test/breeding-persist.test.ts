import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { toast } from '../src/modules/toast'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggBoxStore } from '../src/stores/eggBox'
import { BREEDING_DURATION_MS } from '../src/utils/breeding'

vi.mock('../src/modules/toast', () => ({ toast: { success: vi.fn() } }))
vi.mock('../src/modules/i18n', () => ({ i18n: { global: { t: (k: string) => k } } }))
vi.mock('../src/stores/egg', () => ({
  useEggStore: () => ({ incubator: [], startIncubation: vi.fn() }),
}))

describe('breeding persistence', () => {
  it('restores running job and completes it after hydration', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const startedAt = Date.now() - BREEDING_DURATION_MS - 1000
    const endsAt = startedAt + BREEDING_DURATION_MS
    window.localStorage.setItem('breeding', JSON.stringify({
      byType: {
        feu: {
          type: 'feu',
          rarity: 10,
          parentId: 'salamiches',
          startedAt,
          endsAt,
          status: 'running',
        },
      },
    }))

    const breeding = useBreedingStore()
    const box = useEggBoxStore()
    expect(breeding.getJob('feu')?.status).toBe('completed')
    expect(toast.success).toHaveBeenCalledWith('components.panel.Breeding.toast.finished')
    expect(breeding.collectEgg('feu')).toBe(true)
    expect(box.breeding.length).toBe(1)
  })
})
