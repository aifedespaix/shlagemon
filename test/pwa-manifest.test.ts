import { describe, expect, it } from 'vitest'
import { getPwaManifest } from '../src/pwa/manifest'

const locales = ['fr', 'en'] as const

describe('getPwaManifest', () => {
  for (const locale of locales) {
    it(`returns manifest for ${locale}`, () => {
      const manifest = getPwaManifest(locale)
      expect(manifest.lang).toBe(locale)
      expect(manifest.start_url).toBe(`/${locale}/`)
    })
  }
})
