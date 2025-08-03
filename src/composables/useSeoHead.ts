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

  const locale = computed(() => String(route.meta.locale))
  const baseName = computed(() => String(route.name).replace(`${locale.value}-`, ''))
  const entry = computed(() => localizedRoutes.find(r => r.name === baseName.value))

  const canonicalUrl = computed(() => {
    const path = entry.value?.paths[locale.value] ?? route.path
    return `${SITE_URL}${path}`
  })

  const alternateLinks = computed<AlternateLink[]>(() => {
    if (!entry.value)
      return []

    return availableLocales
      .map((loc) => {
        const path = entry.value!.paths[loc]
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
