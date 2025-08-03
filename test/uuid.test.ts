import { describe, expect, it } from 'vitest'
import { generateUuid } from '~/utils/uuid'

describe('generateUuid', () => {
  it('returns a RFC4122 v4 UUID', () => {
    const uuid = generateUuid()
    const pattern = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
    expect(uuid).toMatch(pattern)
  })

  it('generates unique values', () => {
    const first = generateUuid()
    const second = generateUuid()
    expect(first).not.toBe(second)
  })
})
