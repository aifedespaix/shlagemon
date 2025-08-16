import type { Locale } from '~/constants/locales'

/**
 * Selects the best available localized path.
 *
 * @param paths - Mapping of locale to path.
 * @param preferred - Desired locale to retrieve.
 * @returns The path for the preferred locale or the first available fallback.
 */
export function pickBest(paths: Partial<Record<Locale, string>>, preferred: Locale): string {
  return paths[preferred]
    ?? paths.en
    ?? paths.fr
    ?? '/'
}

export interface AlternateLink {
  hreflang: string
  href: string
}

export interface BuildLocalizedLinksOptions {
  /** Localized paths for the route. */
  paths: Partial<Record<Locale, string>>
  /** Absolute base URL without trailing slash. */
  siteUrl: string
  /** Locale of the current page. */
  currentLocale: Locale
  /** List of supported locales. */
  locales: readonly Locale[]
  /** Default locale used for x-default. */
  defaultLocale: Locale
  /** Indicates the entry is the home page. */
  isHome?: boolean
  /**
   * x-default behavior:
   * - 'root'   => home x-default points to '/'
   * - 'locale' => x-default always points to the default locale
   */
  xDefaultMode?: 'root' | 'locale'
  /** Explicit canonical path overriding the computed one. */
  canonicalPath?: string
}

export interface LocalizedLinks {
  canonical: string
  alternates: AlternateLink[]
}

/**
 * Builds canonical and alternate links for a localized route.
 */
export function buildLocalizedLinks(options: BuildLocalizedLinksOptions): LocalizedLinks {
  const {
    paths,
    siteUrl,
    currentLocale,
    locales,
    defaultLocale,
    isHome = false,
    xDefaultMode = 'root',
    canonicalPath,
  } = options

  const resolvedCanonicalPath = canonicalPath ?? pickBest(paths, currentLocale)
  const canonical = `${siteUrl}${resolvedCanonicalPath}`

  const alternates: AlternateLink[] = locales.map(locale => ({
    hreflang: locale,
    href: `${siteUrl}${pickBest(paths, locale)}`,
  }))

  const xDefaultPath = (xDefaultMode === 'root' && isHome)
    ? '/'
    : pickBest(paths, defaultLocale)
  alternates.push({ hreflang: 'x-default', href: `${siteUrl}${xDefaultPath}` })

  return { canonical, alternates }
}
