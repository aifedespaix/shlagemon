import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import type { Locale } from '~/constants/locales'
import { setupLayouts } from 'virtual:generated-layouts'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { availableLocales } from '~/constants/locales'
import { localizedRoutes } from './localizedRoutes'

/**
 * Build `RouteRecordRaw` entries for every locale using the
 * configuration from {@link localizedRoutes}.
 */
export function buildLocalizedRoutes(): RouteRecordRaw[] {
  const records: RouteRecordRaw[] = []

  for (const locale of availableLocales) {
    for (const route of localizedRoutes) {
      const path = route.paths[locale]
      if (!path)
        continue
      const record: RouteRecordRaw = {
        path,
        name: `${locale}-${route.name}`,
        component: route.component,
        meta: {
          locale,
          i18nKey: route.i18nKey,
          layout: route.layout,
        },
      }
      records.push(record)
    }
  }

  return setupLayouts(records)
}

/**
 * Resolve a locale-aware redirect for unmatched routes.
 *
 * When executed in the browser, the user's preferred language is inferred
 * from {@link navigator.language}. If no matching locale can be determined or
 * when running in a non-browser environment, {@link defaultLocale} is used.
 *
 * @param to - Destination route that failed to match.
 * @returns Absolute path prefixed with the resolved locale.
 */
export function redirect(to: RouteLocationNormalized): string {
  const allParam = Array.isArray(to.params.all)
    ? to.params.all.join('/')
    : (to.params.all as string | undefined) ?? ''

  const navigatorLocale
    = typeof navigator !== 'undefined' && typeof navigator.language === 'string'
      ? navigator.language.split('-')[0]
      : undefined

  const locale: Locale = availableLocales.includes(navigatorLocale as Locale)
    ? (navigatorLocale as Locale)
    : defaultLocale

  return allParam ? `/${locale}/${allParam}` : `/${locale}`
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('~/pages/root.vue'),
  },
  ...buildLocalizedRoutes(),
  { path: '/:all(.*)', redirect },
]

/**
 * Application router instance.
 */
export const router = createRouter({
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
