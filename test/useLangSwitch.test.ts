import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { useLangSwitch } from '../src/composables/useLangSwitch'
import { buildLocalizedRoutes } from '../src/router'
import { useLocaleStore } from '../src/stores/locale'

async function setup(routePath: string) {
  const pinia = createPinia()
  setActivePinia(pinia)
  const router = createRouter({
    history: createWebHistory(),
    routes: buildLocalizedRoutes(),
  })
  await router.push(routePath)
  await router.isReady()
  return {
    pinia,
    router,
    wrapper: mount({
      template: '<div></div>',
      setup: () => useLangSwitch(),
    }, { global: { plugins: [router, pinia] } }),
  }
}

describe('useLangSwitch', () => {
  it('returns equivalent path in other locale', async () => {
    const { wrapper } = await setup('/en/shlagedex')

    const path = await wrapper.vm.switchLang('fr')
    expect(path).toBe('/fr/shlagedex')
    expect(useLocaleStore().locale).toBe('fr')
  }, 10000)
})
