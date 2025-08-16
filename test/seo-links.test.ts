import type { Locale } from '../src/constants/locales'
import { describe, expect, it } from 'vitest'
import { buildLocalizedLinks, pickBest } from '../src/utils/seo-links'

const locales: readonly Locale[] = ['fr', 'en']
const siteUrl = 'https://example.com'

describe('seo-links utilities', () => {
  it('builds canonical and alternates for home', () => {
    const { canonical, alternates } = buildLocalizedLinks({
      paths: { fr: '/fr', en: '/en' },
      siteUrl,
      currentLocale: 'fr',
      locales,
      defaultLocale: 'en',
      isHome: true,
    })

    expect(canonical).toBe(`${siteUrl}/fr`)
    expect(alternates).toEqual([
      { hreflang: 'fr', href: `${siteUrl}/fr` },
      { hreflang: 'en', href: `${siteUrl}/en` },
      { hreflang: 'x-default', href: `${siteUrl}/` },
    ])
  })

  it('falls back when a translation is missing', () => {
    const { canonical, alternates } = buildLocalizedLinks({
      paths: { en: '/en/partial' },
      siteUrl,
      currentLocale: 'fr',
      locales,
      defaultLocale: 'en',
    })

    expect(canonical).toBe(`${siteUrl}/en/partial`)
    expect(alternates).toEqual([
      { hreflang: 'fr', href: `${siteUrl}/en/partial` },
      { hreflang: 'en', href: `${siteUrl}/en/partial` },
      { hreflang: 'x-default', href: `${siteUrl}/en/partial` },
    ])
  })

  it('pickBest returns best available path', () => {
    const paths: Partial<Record<Locale, string>> = { en: '/en/only' }
    expect(pickBest(paths, 'fr')).toBe('/en/only')
  })
})
