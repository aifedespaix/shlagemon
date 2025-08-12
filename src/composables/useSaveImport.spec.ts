import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSaveStore } from '~/stores/save'
import { useSaveImport } from './useSaveImport'

const push = vi.fn()

vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

vi.mock('~/utils/save-code', () => ({
  importSave: vi.fn((text: string) => (text === 'valid' ? { player: { name: 'Ash' } } : null)),
  PERSISTED_STORE_KEYS: ['player'],
}))

describe('useSaveImport', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    push.mockReset()
  })

  it('loads and parses a file', async () => {
    const composable = useSaveImport()
    const file = new File(['valid'], 'save.shlag')
    await composable.loadFromFile(file)
    expect(composable.payload.value).toEqual({ player: { name: 'Ash' } })
    expect(composable.status.value).toBe('loaded')
  })

  it('loads from share target', async () => {
    const composable = useSaveImport()
    const file = new File(['valid'], 'save.shlag')
    const form = new FormData()
    form.append('file', file)
    await composable.loadFromShareTarget(form)
    expect(composable.payload.value).toEqual({ player: { name: 'Ash' } })
  })

  it('validates payload keys', () => {
    const composable = useSaveImport()
    composable.payload.value = { player: {} }
    expect(composable.validate()).toBe(true)
    expect(composable.status.value).toBe('ready')

    composable.payload.value = { unknown: {} }
    expect(composable.validate()).toBe(false)
    expect(composable.status.value).toBe('error')
  })

  it('confirms import and navigates', async () => {
    const composable = useSaveImport()
    const save = useSaveStore() as any
    save.replaceWith = vi.fn()
    save.persist = vi.fn().mockResolvedValue(undefined)
    composable.payload.value = { player: {} }
    await composable.confirmImport()
    expect(save.replaceWith).toHaveBeenCalledWith({ player: {} })
    expect(save.persist).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/')
  })
})
