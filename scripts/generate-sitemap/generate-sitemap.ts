import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { localizedRoutes } from '../../src/router/localizedRoutes'

/**
 * Configuration options for sitemap generation.
 */
export interface SitemapOptions {
  /** Output directory where sitemap.xml will be written. */
  outDir: string
  /** Absolute hostname WITHOUT trailing slash, e.g. "https://shlagemon.aife.io" */
  hostname: string
  /**
   * 'root'   => x-default = '/' pour la home, et x-default = defaultLocale pour les pages internes (recommandé si home canonique = '/')
   * 'locale' => x-default = defaultLocale pour TOUTES les pages (y compris la home). À utiliser si la home canonique est localisée (ex: '/en').
   */
  xDefaultMode?: 'root' | 'locale'
  /** Langue par défaut utilisée pour x-default sur les pages internes (ex: 'en'). */
  defaultLocale?: 'fr' | 'en'
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
    hostname,
    xDefaultMode = 'root',
    defaultLocale = 'en',
  } = options

  // --- Consts & types ----------------------------------------------------
  const locales = ['fr', 'en'] as const
  type Locale = (typeof locales)[number]
  type LocalizedPaths = Partial<Record<Locale, string>>

  const rootUrl = `${hostname}/`
  const today = new Date().toISOString().split('T')[0]

  // --- Utilitaires -------------------------------------------------------
  /** Sélectionne la meilleure URL de fallback si une locale manque. */
  const pickBest = (group: LocalizedPaths, pref: Locale): string => {
    return group[pref]
      ?? group.en
      ?? group.fr
      ?? '/' // en dernier recours
  }

  /** Normalise un chemin ('/fr' ok, 'fr' => '/fr') */
  const normPath = (p: string) => (p.startsWith('/') ? p : `/${p}`)

  // --- Agrégation des groupes de routes ---------------------------------
  // Map: "path" => { fr: '/fr/...', en: '/en/...' }
  const pathGroups = new Map<string, LocalizedPaths>()

  // Groupe "home" (doit exister dans localizedRoutes)
  const home = localizedRoutes.find(r => r.name === 'home')
  if (!home) {
    throw new Error('generateSitemap: route "home" introuvable dans localizedRoutes')
  }
  const homeGroup = home.paths as LocalizedPaths

  // On force la home au chemin '/'
  pathGroups.set('/', homeGroup)

  // Ajoute toutes les variantes localisées de chaque route
  for (const route of localizedRoutes) {
    const group = route.paths as LocalizedPaths
    for (const locale of locales) {
      const p = group[locale]
      if (!p) continue
      pathGroups.set(normPath(p), group)
    }
  }

  // Déduplication et tri stable (home en premier, puis alpha)
  const paths = Array.from(new Set(pathGroups.keys()))
    .sort((a, b) => {
      if (a === '/') return -1
      if (b === '/') return 1
      return a.localeCompare(b)
    })

  // --- Construction des entrées URL -------------------------------------
  const urlEntries = paths.map((path) => {
    const group = pathGroups.get(path)!
    const loc = `${hostname}${path}`

    const isHome = path === '/'

    // x-default:
    // - si 'root' et home => '/'
    // - sinon => page dans la langue par défaut (avec fallbacks)
    const xDefaultUrl =
      (xDefaultMode === 'root' && isHome)
        ? rootUrl
        : `${hostname}${pickBest(group, defaultLocale)}`

    // URLs locales (avec fallbacks pour éviter les trous)
    const frUrl = `${hostname}${pickBest(group, 'fr')}`
    const enUrl = `${hostname}${pickBest(group, 'en')}`

    const links = [
      `<xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />`,
      `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`,
    ].join('\n    ')

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
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
