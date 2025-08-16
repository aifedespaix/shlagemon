import type { Locale } from '~/constants/locales'
import type { AlternateLink } from '~/utils/seo-links'
import { availableLocales, defaultLocale } from '~/constants/locales'
import { SITE_URL } from '~/constants/site'
import { localizedRoutes } from '~/router/localizedRoutes'
import { buildLocalizedLinks } from '~/utils/seo-links'

/**
 * Manage canonical and alternate link tags based on the current route and locale.
 * Must be invoked from a component setup function.
 */
export function useSeoHead() {
  const route = useRoute()

  const locale = computed(() => String(route.meta.locale) as Locale)
  const baseName = computed(() => String(route.name).replace(`${locale.value}-`, ''))
  const entry = computed(() => localizedRoutes.find(r => r.name === baseName.value))

  const seoLinks = computed(() => {
    if (!entry.value)
      return { canonical: `${SITE_URL}${route.path}`, alternates: [] as AlternateLink[] }

    const paths = entry.value.paths as Record<Locale, string>
    return buildLocalizedLinks({
      paths,
      siteUrl: SITE_URL,
      currentLocale: locale.value,
      locales: availableLocales,
      defaultLocale,
      isHome: baseName.value === 'home',
    })
  })

  useHead(() => ({
    link: [
      { rel: 'canonical', href: seoLinks.value.canonical },
      ...seoLinks.value.alternates.map(l => ({ rel: 'alternate', hreflang: l.hreflang, href: l.href })),
    ],
  }))

  return {
    canonicalUrl: computed(() => seoLinks.value.canonical),
  }
}

export default useSeoHead
