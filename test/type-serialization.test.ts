import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { useShlagedexStore } from '../src/stores/shlagedex'

vi.mock('vue3-toastify', () => ({ toast: vi.fn() }))

describe('shlagedex serialization', () => {
  it('allows JSON serialization of state', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    dex.captureShlagemon(sacdepates)
    expect(() => JSON.stringify(dex.$state)).not.toThrow()
  })
})
