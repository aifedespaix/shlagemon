import { afterEach, describe, expect, it } from 'vitest'
import { defaultLocale } from '../src/constants/locales'
import { redirect } from '../src/router'

const originalNavigator = globalThis.navigator

afterEach(() => {
  if (originalNavigator) {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      configurable: true,
    })
  }
  else {
    delete (globalThis as any).navigator
  }
})

describe('redirect', () => {
  it('uses navigator language when available', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { language: 'fr-FR' },
      configurable: true,
    })

    const path = redirect({ params: { all: 'foo' } } as any)
    expect(path).toBe('/fr/foo')
  })

  it('falls back to default locale for unsupported language', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { language: 'es-ES' },
      configurable: true,
    })

    const path = redirect({ params: { all: 'bar' } } as any)
    expect(path).toBe(`/${defaultLocale}/bar`)
  })

  it('falls back to default locale when navigator missing', () => {
    delete (globalThis as any).navigator

    const path = redirect({ params: {} } as any)
    expect(path).toBe(`/${defaultLocale}`)
  })
})
