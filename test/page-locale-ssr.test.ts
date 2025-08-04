import { createPinia, setActivePinia } from 'pinia'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { i18n, install as installI18n, loadLanguageAsync } from '../src/modules/i18n'
import { install as localeFromPath } from '../src/modules/localeFromPath'
import { buildLocalizedRoutes } from '../src/router'
import { useLocaleStore } from '../src/stores/locale'

beforeAll(() => {
  vi.stubEnv('SSG', 'true')
  vi.stubEnv('SSR', 'true')
})

afterAll(() => {
  vi.unstubAllEnvs()
})

async function setup(path: string) {
  const pinia = createPinia()
  setActivePinia(pinia)
  const router = createRouter({ history: createMemoryHistory(), routes: buildLocalizedRoutes() })
  installI18n({ app: { use: () => {} } as any, isClient: false, router } as any)
  localeFromPath({ router, isClient: false } as any)
  await router.push(path)
  await router.isReady()
  await loadLanguageAsync(useLocaleStore().locale)
  return router
}

describe('SSR locale pages', () => {
  it('renders /fr/** in French', async () => {
    const router = await setup('/fr')
    expect(i18n.global.locale.value).toBe('fr')
    const key = router.currentRoute.value.meta.i18nKey as string
    expect(i18n.global.t(key)).toBe('Shlagémon - Ça sent très fort')
  }, 10000)

  it('renders /en/** in English', async () => {
    const router = await setup('/en')
    expect(i18n.global.locale.value).toBe('en')
    const key = router.currentRoute.value.meta.i18nKey as string
    expect(i18n.global.t(key)).toBe('Shlagemon - It smells very strong')
  })

  it('renders / as English page like /en/', async () => {
    const router = await setup('/')
    const key = router.currentRoute.value.meta.i18nKey as string
    expect(i18n.global.t(key)).toBe('Shlagemon - It smells very strong')
  })
})
