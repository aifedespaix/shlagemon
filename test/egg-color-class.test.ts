import { describe, expect, it } from 'vitest'

import { eggColorClass } from '../src/constants/egg'

describe('eggColorClass', () => {
  it('returns color classes for known egg types', () => {
    expect(eggColorClass('feu')).toBe('text-orange-500 dark:text-orange-400')
    expect(eggColorClass('eau')).toBe('text-blue-500 dark:text-blue-400')
    expect(eggColorClass('plante')).toBe('text-green-500 dark:text-green-400')
    expect(eggColorClass('electrique')).toBe('text-yellow-500 dark:text-yellow-400')
    expect(eggColorClass('psy')).toBe('text-pink-500 dark:text-pink-400')
  })

  it('returns an empty string for unknown types', () => {
    expect(eggColorClass('unknown' as any)).toBe('')
  })
})
