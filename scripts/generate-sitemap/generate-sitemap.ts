import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { localizedRoutes } from '../../src/router/localizedRoutes'

/** Locale codes supported by the application. */
const locales = ['fr', 'en'] as const

/**
 * Configuration options for sitemap generation.
 */
export interface SitemapOptions {
  /** Output directory for the sitemap. */
  outDir: string
  /** Base URL of the website without trailing slash. */
  hostname: string
}

/**
 * Generate a `sitemap.xml` file with correct `hreflang` links.
 *
 * The sitemap includes one entry per localized page and ensures that:
 * - each page references its language alternatives,
 * - `x-default` points to the site root,
 * - unused XML namespaces are omitted.
 */
export function generateSitemap(options: SitemapOptions): void {
  const { outDir, hostname } = options
  const rootUrl = `${hostname}/`
  const today = new Date().toISOString().split('T')[0]

  type Locale = typeof locales[number]
  type LocalizedPaths = Record<Locale, string>

  // Map every path to its group of localized alternatives.
  const pathGroups = new Map<string, LocalizedPaths>()
  const homeGroup = localizedRoutes.find(route => route.name === 'home')!.paths as LocalizedPaths

  // Root path uses the home group's localized links.
  pathGroups.set('/', homeGroup)

  for (const route of localizedRoutes) {
    const group = route.paths as LocalizedPaths
    for (const locale of locales)
      pathGroups.set(group[locale], group)
  }

  const urlEntries = Array.from(pathGroups.keys()).sort().map((path) => {
    const group = pathGroups.get(path)!
    const loc = `${hostname}${path}`
    const links = [
      ...locales.map(locale => `<xhtml:link rel="alternate" hreflang="${locale}" href="${hostname}${group[locale]}" />`),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${rootUrl}" />`,
    ]
      .join('\n    ')

    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    ${links}\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" `
    + `xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
    + `${urlEntries}\n`
    + `</urlset>\n`

  writeFileSync(resolve(outDir, 'sitemap.xml'), xml)
}

export default generateSitemap
