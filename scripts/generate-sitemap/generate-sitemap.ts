import type { Locale } from '../../src/constants/locales'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { availableLocales, defaultLocale as defaultLocaleConst } from '../../src/constants/locales'
import { SITE_URL } from '../../src/constants/site'
import { localizedRoutes } from '../../src/router/localizedRoutes'
import { buildLocalizedLinks } from '../../src/utils/seo-links'

/**
 * Configuration options for sitemap generation.
 */
export interface SitemapOptions {
  /** Output directory where sitemap.xml will be written. */
  outDir: string
  /** Absolute hostname WITHOUT trailing slash. Defaults to {@link SITE_URL}. */
  hostname?: string
  /**
   * 'root'   => x-default = '/' pour la home, et x-default = defaultLocale pour les pages internes (recommandé si home canonique = '/')
   * 'locale' => x-default = defaultLocale pour TOUTES les pages (y compris la home). À utiliser si la home canonique est localisée (ex: '/en').
   */
  xDefaultMode?: 'root' | 'locale'
  /** Langue par défaut utilisée pour x-default sur les pages internes (ex: 'en'). */
  defaultLocale?: Locale
}

/**
 * Génère un sitemap.xml multilingue avec balises hreflang cohérentes.
 * - Home: x-default = '/' (si xDefaultMode='root')
 * - Pages internes: x-default = URL dans la langue par défaut (defaultLocale)
 * - Fallbacks si une locale manque pour une route donnée
 */
export function generateSitemap(options: SitemapOptions): void {
  const {
    outDir,
    hostname = SITE_URL,
    xDefaultMode = 'root',
    defaultLocale = defaultLocaleConst,
  } = options

  // --- Consts & types ----------------------------------------------------
  const locales = availableLocales
  type LocalizedPaths = Partial<Record<Locale, string>>

  const today = new Date().toISOString().split('T')[0]

  /** Normalise un chemin ('/fr' ok, 'fr' => '/fr') */
  const normPath = (p: string) => (p.startsWith('/') ? p : `/${p}`)

  // --- Agrégation des groupes de routes ---------------------------------
  // Map: "path" => { fr: '/fr/...', en: '/en/...' }
  const pathGroups = new Map<string, LocalizedPaths>()

  // Groupe "home" (doit exister dans localizedRoutes)
  const home = localizedRoutes.find(r => r.name === 'home')
  if (!home)
    throw new Error('generateSitemap: route "home" introuvable dans localizedRoutes')
  const homeGroup = home.paths as LocalizedPaths

  // On force la home au chemin '/'
  pathGroups.set('/', homeGroup)

  // Ajoute toutes les variantes localisées de chaque route
  for (const route of localizedRoutes) {
    const group = route.paths as LocalizedPaths
    for (const locale of locales) {
      const p = group[locale]
      if (!p)
        continue
      pathGroups.set(normPath(p), group)
    }
  }

  // Déduplication et tri stable (home en premier, puis alpha)
  const paths = Array.from(new Set(pathGroups.keys()))
    .sort((a, b) => {
      if (a === '/')
        return -1
      if (b === '/')
        return 1
      return a.localeCompare(b)
    })

  // --- Construction des entrées URL -------------------------------------
  const urlEntries = paths.map((path) => {
    const group = pathGroups.get(path)!
    const isHome = path === '/'

    const currentLocale = locales.find(l => path === `/${l}` || path.startsWith(`/${l}/`)) ?? defaultLocale

    const { canonical, alternates } = buildLocalizedLinks({
      paths: group,
      siteUrl: hostname,
      currentLocale,
      locales,
      defaultLocale,
      isHome,
      xDefaultMode,
      canonicalPath: path,
    })

    const links = alternates
      .map(l => `<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${l.href}" />`)
      .join('\n    ')

    return [
      '  <url>',
      `    <loc>${canonical}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    ${links}`,
      '  </url>',
    ].join('\n')
  }).join('\n')

  // --- XML final ---------------------------------------------------------
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(resolve(outDir, 'sitemap.xml'), xml)
}

export default generateSitemap
