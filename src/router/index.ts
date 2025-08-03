import type { RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { availableLocales, defaultLocale } from '~/constants/locales'
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
      if (import.meta.env.SSG && locale === defaultLocale && route.name === 'home')
        record.alias = '/'
      records.push(record)
    }
  }

  return setupLayouts(records)
}

export const routes: RouteRecordRaw[] = [
  ...(!import.meta.env.SSG
    ? [
        {
          path: '/',
          name: 'root',
          component: () => import('~/pages/root.vue'),
        },
      ]
    : []),
  ...buildLocalizedRoutes(),
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
