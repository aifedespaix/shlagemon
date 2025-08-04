import { describe, expect, it } from 'vitest'
import { getPwaManifest } from '../src/pwa/manifest'

const locales = ['fr', 'en'] as const

describe('getPwaManifest', () => {
  for (const locale of locales) {
    it(`returns manifest for ${locale}`, () => {
      const manifest = getPwaManifest(locale)

      expect(manifest.lang).toBe(locale)
      expect(manifest.start_url).toBe(`/${locale}/`)

      if (locale === 'fr') {
        expect(manifest.short_name).toBe('Shlagémon')
        expect(manifest.name).toBe('Shlagémon - Ça sent très fort')
        expect(manifest.description).toBe(
          'Attrape tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
        )
      }
      else {
        expect(manifest.short_name).toBe('Shlagemon')
        expect(manifest.name).toBe('Shlagemon - It smells very strong')
        expect(manifest.description).toBe(
          'Catch all the Shlagemons before they rot the whole world.',
        )
      }
    })
  }
})
