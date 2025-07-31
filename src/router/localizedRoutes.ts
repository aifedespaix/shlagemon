import type { DefineComponent } from 'vue'

export interface LocalizedRoute {
  /**
   * Unique route name without locale suffix.
   */
  name: string
  /**
   * Lazy-loaded component for the route.
   */
  component: () => Promise<DefineComponent>
  /**
   * Path mapping per locale. Must contain an entry for each available locale.
   */
  paths: Record<string, string>
  /**
   * Optional i18n key used for the page title meta.
   */
  i18nKey?: string
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
  },
  {
    name: 'shlagedex',
    component: () => import('~/pages/shlagedex.vue'),
    paths: {
      fr: '/fr/shlagedex',
      en: '/en/shlagedex',
    },
    i18nKey: 'pages.shlagedex.title',
  },
]
export default localizedRoutes
