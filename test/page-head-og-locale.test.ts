import type { RouteRecordRaw } from 'vue-router'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import usePageHead from '../src/composables/usePageHead'
import { availableLocales } from '../src/constants/locales'
import { i18n } from '../src/modules/i18n'
import { localizedRoutes } from '../src/router/localizedRoutes'

async function renderHead(path: string, routes: RouteRecordRaw[]) {
  const head = createHead()
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push(path)
  await router.isReady()

  const app = createSSRApp({
    setup() {
      usePageHead()
      return () => h('div')
    },
  })

  app.use(router)
  app.use(head)
  app.use(i18n)

  await renderToString(app)
  const { headTags } = await renderSSRHead(head)
  return headTags
}

describe('oG locale metadata', () => {
  const routes: RouteRecordRaw[] = []
  for (const locale of availableLocales) {
    for (const entry of localizedRoutes) {
      const path = entry.paths[locale]
      routes.push({ path, name: `${locale}-${entry.name}`, component: { template: '<div />' }, meta: { locale } })
    }
  }

  it('renders correct OG locale tags for every route', async () => {
    for (const route of routes) {
      const head = await renderHead(route.path, routes)
      const current = route.meta?.locale as string
      expect(head).toContain(`<meta property="og:locale" content="${current}"`)
      for (const alt of availableLocales.filter(l => l !== current))
        expect(head).toContain(`<meta property="og:locale:alternate" content="${alt}"`)
    }
  })
})
