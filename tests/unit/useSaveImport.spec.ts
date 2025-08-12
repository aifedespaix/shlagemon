import { createHash } from 'node:crypto'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSaveImport } from '~/composables/useSaveImport'
import { useSaveStore } from '~/stores/save'
import { assertSavePayload, SAVE_VERSION } from '~/utils/save/assertSavePayload'
import { safeJsonParse } from '~/utils/save/safeJsonParse'
import { verifyChecksum } from '~/utils/save/verifyChecksum'

const routerPush = vi.fn()

class TextFile extends File {
  private readonly content: string
  constructor(content: string, name: string) {
    super([], name)
    this.content = content
  }

  async text(): Promise<string> {
    return this.content
  }
}

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: routerPush }),
}))

vi.mock('~/utils/save-code', () => ({
  importSave: vi.fn((text: string) => (text === 'valid' ? { player: { name: 'Ash' } } : null)),
  PERSISTED_STORE_KEYS: ['player'],
}))

describe('safeJsonParse', () => {
  it('parses valid JSON', async () => {
    const file = new TextFile('{"foo":"bar"}', 'test.json')
    await expect(safeJsonParse(file)).resolves.toEqual({ foo: 'bar' })
  })

  it('throws for invalid JSON', async () => {
    const file = new TextFile('{ invalid', 'test.json')
    await expect(safeJsonParse(file)).rejects.toThrow('Invalid JSON')
  })
})

describe('assertSavePayload', () => {
  it('accepts a valid payload', () => {
    const payload: unknown = { version: SAVE_VERSION, data: {} }
    expect(() => assertSavePayload(payload)).not.toThrow()
  })

  it('rejects unsupported versions', () => {
    const payload: unknown = { version: 999, data: {} }
    expect(() => assertSavePayload(payload)).toThrow('Unsupported save version')
  })
})

describe('verifyChecksum', () => {
  it('resolves true for matching checksum', async () => {
    const data = { foo: 'bar' }
    const checksum = createHash('sha256').update(JSON.stringify(data)).digest('hex')
    const payload = { version: SAVE_VERSION, data, checksum }
    await expect(verifyChecksum(payload)).resolves.toBe(true)
  })

  it('resolves false for mismatched checksum', async () => {
    const payload = { version: SAVE_VERSION, data: { foo: 'bar' }, checksum: 'deadbeef' }
    await expect(verifyChecksum(payload)).resolves.toBe(false)
  })

  it('resolves true when checksum is missing', async () => {
    const payload = { version: SAVE_VERSION, data: { foo: 'bar' } }
    await expect(Promise.resolve(verifyChecksum(payload))).resolves.toBe(true)
  })
})

describe('useSaveImport', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    routerPush.mockReset()
  })

  it('loads and validates a file', async () => {
    const composable = useSaveImport()
    const file = new TextFile('valid', 'save.shlag')
    await composable.loadFromFile(file)
    expect(composable.payload.value).toEqual({ player: { name: 'Ash' } })
    expect(composable.status.value).toBe('loaded')
    expect(composable.validate()).toBe(true)
    expect(composable.status.value).toBe('ready')
  })

  it('handles invalid file content', async () => {
    const composable = useSaveImport()
    const file = new TextFile('invalid', 'save.shlag')
    await composable.loadFromFile(file)
    expect(composable.payload.value).toBeNull()
    expect(composable.status.value).toBe('error')
    expect(composable.error.value).toBe('Invalid save file')
  })

  it('loads from share target data', async () => {
    const composable = useSaveImport()
    const file = new TextFile('valid', 'save.shlag')
    const form = new FormData()
    form.append('file', file)
    await composable.loadFromShareTarget(form)
    expect(composable.payload.value).toEqual({ player: { name: 'Ash' } })
  })

  it('applies payload on confirmation', async () => {
    const composable = useSaveImport()
    const save = useSaveStore() as any
    save.replaceWith = vi.fn()
    save.persist = vi.fn().mockResolvedValue(undefined)
    composable.payload.value = { player: {} } as any
    await composable.confirmImport()
    expect(save.replaceWith).toHaveBeenCalledWith({ player: {} })
    expect(save.persist).toHaveBeenCalled()
    expect(routerPush).toHaveBeenCalledWith('/')
  })

  it('throws if confirming without payload', async () => {
    const composable = useSaveImport()
    await expect(composable.confirmImport()).rejects.toThrow('Cannot import without payload')
  })
})
