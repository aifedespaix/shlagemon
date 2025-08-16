import type { Locale } from '~/constants/locales'
import { availableLocales, defaultLocale } from '~/constants/locales'
import { localizedRoutes } from '~/router/localizedRoutes'

/**
 * Base URL for the deployed application used to build absolute links.
 */
const SITE_URL = 'https://shlagemon.aife.io'

interface AlternateLink {
  hreflang: string
  href: string
}

/**
 * Manage canonical and alternate link tags based on the current route and locale.
 * Must be invoked from a component setup function.
 */
export function useSeoHead() {
  const route = useRoute()

  const locale = computed(() => String(route.meta.locale))
  const baseName = computed(() => String(route.name).replace(`${locale.value}-`, ''))
  const entry = computed(() => localizedRoutes.find(r => r.name === baseName.value))

  const pickBest = (group: Record<Locale, string>, pref: Locale): string =>
    group[pref]
    ?? group.en
    ?? group.fr
    ?? '/'

  const canonicalUrl = computed(() => {
    if (!entry.value)
      return `${SITE_URL}${route.path}`

    const path = pickBest(entry.value.paths as Record<Locale, string>, locale.value as Locale)
    return `${SITE_URL}${path}`
  })

  const alternateLinks = computed<AlternateLink[]>(() => {
    if (!entry.value)
      return []

    const paths = entry.value.paths as Record<Locale, string>
    const isHome = baseName.value === 'home'

    const links = availableLocales.map(loc => ({
      hreflang: loc,
      href: `${SITE_URL}${pickBest(paths, loc)}`,
    }))

    const xDefaultPath = isHome ? '/' : pickBest(paths, defaultLocale)
    links.push({ hreflang: 'x-default', href: `${SITE_URL}${xDefaultPath}` })

    return links
  })

  useHead(() => ({
    link: [
      { rel: 'canonical', href: canonicalUrl.value },
      ...alternateLinks.value.map(l => ({ rel: 'alternate', hreflang: l.hreflang, href: l.href })),
    ],
  }))

  return {
    canonicalUrl,
  }
}

export default useSeoHead
