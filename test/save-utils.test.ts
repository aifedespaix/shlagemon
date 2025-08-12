import type { SavePayload } from '~/utils/save/assertSavePayload'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { assertSavePayload, SAVE_VERSION } from '~/utils/save/assertSavePayload'
import { formatPlaytime } from '~/utils/save/formatPlaytime'
import { safeJsonParse } from '~/utils/save/safeJsonParse'
import { verifyChecksum } from '~/utils/save/verifyChecksum'

describe('formatPlaytime', () => {
  it('formats durations into human readable strings', () => {
    expect(formatPlaytime(0)).toBe('0s')
    expect(formatPlaytime(5_000)).toBe('5s')
    expect(formatPlaytime(65_000)).toBe('1m 5s')
    expect(formatPlaytime(3_600_000)).toBe('1h')
    expect(formatPlaytime(86_400_000 + 3_600_000 + 120_000 + 7_000)).toBe('1d 1h 2m 7s')
  })
})

describe('safeJsonParse', () => {
  it('parses valid JSON files', async () => {
    const file = { text: () => Promise.resolve(JSON.stringify({ foo: 'bar' })) } as unknown as File
    await expect(safeJsonParse(file)).resolves.toEqual({ foo: 'bar' })
  })

  it('rejects invalid JSON files', async () => {
    const file = { text: () => Promise.resolve('{ invalid json') } as unknown as File
    await expect(safeJsonParse(file)).rejects.toThrow('Invalid JSON')
  })
})

describe('assertSavePayload', () => {
  it('validates proper payloads', () => {
    const payload: unknown = { version: SAVE_VERSION, data: {} }
    expect(() => assertSavePayload(payload)).not.toThrow()
  })

  it('throws on unsupported version', () => {
    const payload: unknown = { version: 999, data: {} }
    expect(() => assertSavePayload(payload)).toThrow('Unsupported save version')
  })
})

describe('verifyChecksum', () => {
  it('returns true when checksum matches', async () => {
    const data = { foo: 'bar' }
    const checksum = createHash('sha256').update(JSON.stringify(data)).digest('hex')
    const payload: SavePayload = { version: SAVE_VERSION, data, checksum }
    await expect(verifyChecksum(payload)).resolves.toBe(true)
  })

  it('returns false when checksum does not match', async () => {
    const data = { foo: 'bar' }
    const payload: SavePayload = { version: SAVE_VERSION, data, checksum: 'deadbeef' }
    await expect(verifyChecksum(payload)).resolves.toBe(false)
  })

  it('returns true when checksum is missing', async () => {
    const payload: SavePayload = { version: SAVE_VERSION, data: { foo: 'bar' } }
    await expect(Promise.resolve(verifyChecksum(payload))).resolves.toBe(true)
  })
})
