import { availableLocales } from '~/constants/locales'
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

  const canonicalUrl = computed(() => `${SITE_URL}${route.path}`)

  const alternateLinks = computed<AlternateLink[]>(() => {
    const locale = String(route.meta.locale)
    const baseName = String(route.name).replace(`${locale}-`, '')
    const entry = localizedRoutes.find(r => r.name === baseName)
    if (!entry)
      return []

    return availableLocales
      .map((loc) => {
        const path = entry.paths[loc]
        if (!path)
          return null
        return {
          hreflang: loc,
          href: `${SITE_URL}${path}`,
        }
      })
      .filter(Boolean) as AlternateLink[]
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
