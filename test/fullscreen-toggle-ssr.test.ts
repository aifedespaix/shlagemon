import { describe, expect, it, vi } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { i18n, loadLanguageAsync } from '../src/modules/i18n'

describe('fullscreenToggle SSR', () => {
  it('renders without ReferenceError when SSR is true', async () => {
    vi.stubEnv('SSR', true)
    const originalDocument = globalThis.document
    // @ts-expect-error simulate SSR environment
    globalThis.document = undefined

    try {
      await loadLanguageAsync('fr')
      const { default: FullscreenToggle } = await import('../src/components/ui/FullscreenToggle.vue')
      const app = createSSRApp(FullscreenToggle)
      app.use(i18n)
      const html = await renderToString(app)
      expect(html).toBeTypeOf('string')
    }
    finally {
      globalThis.document = originalDocument
      vi.unstubAllEnvs()
    }
  })
})
