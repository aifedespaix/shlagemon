import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { useShlagedexStore } from '../src/stores/shlagedex'

vi.mock('../src/modules/toast', () => {
  const fn: any = vi.fn()
  fn.success = vi.fn()
  fn.POSITION = { TOP_CENTER: 'top-center' }
  return { toast: fn }
})

describe('shlagedex serialization', () => {
  it('allows JSON serialization of state', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    dex.captureShlagemon(sacdepates)
    expect(() => JSON.stringify(dex.$state)).not.toThrow()
  })
})
