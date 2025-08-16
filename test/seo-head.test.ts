import type { RouteRecordRaw } from 'vue-router'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import useSeoHead from '../src/composables/useSeoHead'
import { localizedRoutes } from '../src/router/localizedRoutes'

async function renderHead(path: string, routes: RouteRecordRaw[]) {
  const head = createHead()
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push(path)
  await router.isReady()

  const app = createSSRApp({
    setup() {
      useSeoHead()
      return () => h('div')
    },
  })

  app.use(router)
  app.use(head)

  await renderToString(app)
  const { headTags } = await renderSSRHead(head)
  return headTags
}

describe('useSeoHead', () => {
  it('generates links for home with root x-default', async () => {
    const routes: RouteRecordRaw[] = [
      { path: '/fr', name: 'fr-home', component: { template: '<div />' }, meta: { locale: 'fr' } },
      { path: '/en', name: 'en-home', component: { template: '<div />' }, meta: { locale: 'en' } },
    ]

    const head = await renderHead('/fr', routes)

    expect(head).toContain('<link rel="canonical" href="https://shlagemon.aife.io/fr"')
    expect(head).toContain('<link rel="alternate" hreflang="fr" href="https://shlagemon.aife.io/fr"')
    expect(head).toContain('<link rel="alternate" hreflang="en" href="https://shlagemon.aife.io/en"')
    expect(head).toContain('<link rel="alternate" hreflang="x-default" href="https://shlagemon.aife.io/"')
  })

  it('uses default locale for x-default on internal pages', async () => {
    const routes: RouteRecordRaw[] = [
      { path: '/fr/shlagedex', name: 'fr-shlagedex', component: { template: '<div />' }, meta: { locale: 'fr' } },
      { path: '/en/shlagedex', name: 'en-shlagedex', component: { template: '<div />' }, meta: { locale: 'en' } },
    ]

    const head = await renderHead('/fr/shlagedex', routes)

    expect(head).toContain('<link rel="canonical" href="https://shlagemon.aife.io/fr/shlagedex"')
    expect(head).toContain('<link rel="alternate" hreflang="fr" href="https://shlagemon.aife.io/fr/shlagedex"')
    expect(head).toContain('<link rel="alternate" hreflang="en" href="https://shlagemon.aife.io/en/shlagedex"')
    expect(head).toContain('<link rel="alternate" hreflang="x-default" href="https://shlagemon.aife.io/en/shlagedex"')
  })

  describe('fallback when locale is missing', () => {
    const partialRoute = {
      name: 'partial',
      component: () => Promise.resolve({}),
      paths: { en: '/en/partial' },
    }

    beforeAll(() => {
      localizedRoutes.push(partialRoute as any)
    })

    afterAll(() => {
      localizedRoutes.pop()
    })

    it('falls back to best available locale', async () => {
      const routes: RouteRecordRaw[] = [
        { path: '/en/partial', name: 'en-partial', component: { template: '<div />' }, meta: { locale: 'en' } },
        { path: '/fr/partial', name: 'fr-partial', component: { template: '<div />' }, meta: { locale: 'fr' } },
      ]

      const head = await renderHead('/fr/partial', routes)

      expect(head).toContain('<link rel="canonical" href="https://shlagemon.aife.io/en/partial"')
      expect(head).toContain('<link rel="alternate" hreflang="fr" href="https://shlagemon.aife.io/en/partial"')
      expect(head).toContain('<link rel="alternate" hreflang="en" href="https://shlagemon.aife.io/en/partial"')
      expect(head).toContain('<link rel="alternate" hreflang="x-default" href="https://shlagemon.aife.io/en/partial"')
    })
  })
})
