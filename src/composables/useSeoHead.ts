import type { Ref } from 'vue'
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
export interface SeoHead {
  /** Canonical URL for the current route. */
  readonly canonicalUrl: Readonly<Ref<string>>
  /** Locale resolved from the active route. */
  readonly currentLocale: Readonly<Ref<Locale>>
  /** Supported locales excluding the current one. */
  readonly alternateLocales: Readonly<Ref<Locale[]>>
}

/**
 * Manage canonical and alternate link tags based on the current route and locale.
 * Must be invoked from a component setup function.
 */
export function useSeoHead(): SeoHead {
  const route = useRoute()

  const currentLocale = computed<Locale>(() => {
    const candidate = route.meta.locale as Locale | undefined
    return availableLocales.includes(candidate as Locale) ? candidate as Locale : defaultLocale
  })
  const baseName = computed(() => String(route.name).replace(`${currentLocale.value}-`, ''))
  const entry = computed(() => localizedRoutes.find(r => r.name === baseName.value))

  const seoLinks = computed(() => {
    if (!entry.value)
      return { canonical: `${SITE_URL}${route.path}`, alternates: [] as AlternateLink[] }

    const paths = entry.value.paths as Record<Locale, string>
    return buildLocalizedLinks({
      paths,
      siteUrl: SITE_URL,
      currentLocale: currentLocale.value,
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

  const alternateLocales = computed(() => availableLocales.filter(l => l !== currentLocale.value))

  return {
    canonicalUrl: computed(() => seoLinks.value.canonical),
    currentLocale,
    alternateLocales,
  }
}

export default useSeoHead
