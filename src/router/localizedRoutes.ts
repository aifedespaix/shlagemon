import type { AsyncComponentLoader } from 'vue'

export interface LocalizedRoute {
  /**
   * Unique route name without locale suffix.
   */
  name: string
  /**
   * Lazy-loaded component for the route.
   *
   * The function should return a Promise resolving to a Vue component. Using
   * {@link AsyncComponentLoader} aligns the type with Vue Router's expectations
   * and ensures dynamic imports such as `import('~/pages/index.vue')` compile
   * without type errors.
   */
  component: AsyncComponentLoader
  /**
   * Path mapping per locale. Must contain an entry for each available locale.
   */
  paths: Record<string, string>
  /**
   * Optional i18n key used for the page title meta.
   */
  i18nKey?: string
  /**
   * Optional layout name to use for this route.
   */
  layout?: string
}

/**
 * List of localized routes used to build the Vue Router configuration.
 */
export const localizedRoutes: LocalizedRoute[] = [
  {
    name: 'home',
    component: () => import('~/pages/index.vue'),
    paths: {
      fr: '/fr',
      en: '/en',
    },
    i18nKey: 'pages.index.title',
    layout: 'empty',
  },
  {
    name: 'shlagedex',
    component: () => import('~/pages/shlagedex.vue'),
    paths: {
      fr: '/fr/shlagedex',
      en: '/en/shlagedex',
    },
    i18nKey: 'pages.shlagedex.title',
    layout: 'default',
  },
  {
    name: 'privacy-policy',
    component: () => import('~/pages/privacy-policy.vue'),
    paths: {
      fr: '/fr/politique-de-confidentialite',
      en: '/en/privacy-policy',
    },
    i18nKey: 'pages.privacy-policy.title',
    layout: 'default',
  },
  {
    name: 'save-import',
    component: () => import('~/pages/save/ImportPage.vue'),
    paths: {
      fr: '/fr/sauvegarde/importer',
      en: '/en/save/import',
    },
    layout: 'empty',
  },
]
export default localizedRoutes
