import type { RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
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
      records.push({
        path,
        name: `${locale}-${route.name}`,
        component: route.component,
        meta: {
          locale,
          i18nKey: route.i18nKey,
        },
      })
    }
  }

  return setupLayouts(records)
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('~/pages/root.vue'),
  },
  ...buildLocalizedRoutes(),
]

/**
 * Application router instance.
 */
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
