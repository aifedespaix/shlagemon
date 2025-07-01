import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { toast } from 'vue3-toastify'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'

vi.mock('vue3-toastify', () => ({ toast: vi.fn() }))

const toastMock = vi.mocked(toast)

describe('shlagedex capture', () => {
  it('notifies when rarity increases', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 1
    toastMock.mockClear()
    dex.captureShlagemon(carapouffe)
    expect(mon.rarity).toBe(2)
    expect(toastMock).toHaveBeenCalledWith(
      `${mon.base.name} atteint la rareté ${mon.rarity} !`,
    )
  })
})
