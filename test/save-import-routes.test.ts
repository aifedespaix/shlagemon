import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { buildLocalizedRoutes } from '../src/router'

function createTestRouter(history: ReturnType<typeof createWebHistory> | ReturnType<typeof createMemoryHistory>) {
  return createRouter({
    history,
    routes: [
      { path: '/', name: 'root', component: { template: '<div></div>' } },
      {
        path: '/save/import',
        name: 'save-import-root',
        component: { template: '<div></div>' },
        meta: { layout: 'empty' },
      },
      ...buildLocalizedRoutes(),
    ],
  })
}

async function assertNavigation(router: ReturnType<typeof createRouter>) {
  await router.push('/save/import')
  await router.isReady()
  expect(router.currentRoute.value.name).toBe('save-import-root')

  await router.push('/en/save/import')
  expect(router.currentRoute.value.name).toBe('en-save-import')

  await router.push('/fr/sauvegarde/importer')
  expect(router.currentRoute.value.name).toBe('fr-save-import')
}

describe('save import routes', () => {
  it('resolve correctly with web history', async () => {
    const router = createTestRouter(createWebHistory())
    await assertNavigation(router)
  }, 10000)

  it('resolve correctly with memory history', async () => {
    const router = createTestRouter(createMemoryHistory())
    await assertNavigation(router)
  }, 10000)
})
