import type { RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { availableLocales } from '~/constants/locales'
import { localizedRoutes } from './localizedRoutes'

const isSSR = import.meta.env.SSR

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

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: isSSR
      ? () => import('~/pages/index.vue') // SSG/SSR : contenu réel de l'index
      : () => import('~/pages/root.vue'), // Client only : redirection pour i18n paths
  },
  {
    path: '/save/import',
    name: 'save-import-root',
    component: isSSR
      ? () => import('~/pages/save/ImportPage.vue')
      : () => import('~/pages/save/ImportRoot.vue'),
    meta: { layout: 'empty' },
  },
  ...buildLocalizedRoutes(),
  { path: '/:all(.*)', name: 'not-found', component: () => import('~/pages/404.vue') },
]

export const router = createRouter({
  history: import.meta.env.SSR
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
