import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { install as localeFromPath } from '../src/modules/localeFromPath'
import { buildLocalizedRoutes } from '../src/router'
import { useLocaleStore } from '../src/stores/locale'

function setup(path: string) {
  const pinia = createPinia()
  setActivePinia(pinia)
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'root', component: { template: '<div></div>' } },
      ...buildLocalizedRoutes(),
    ],
  })
  localeFromPath({ router, isClient: true } as any)
  router.push(path)
  return router.isReady().then(() => router)
}

describe('router locale', () => {
  it('updates store locale from URL', async () => {
    await setup('/fr/shlagedex')
    expect(useLocaleStore().locale).toBe('fr')
  }, 10000)
})
