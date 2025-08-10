import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

/** Ensure the AnimatedNumber component can render during SSR without DOM globals. */
describe('animated number ssr', () => {
  it('renders static number when SSR is true', async () => {
    vi.stubEnv('SSR', true)
    try {
      const { default: AnimatedNumber } = await import('../src/components/ui/AnimatedNumber.vue')
      const app = createSSRApp({
        render: () => h(AnimatedNumber, { value: 42 }),
      })
      const html = await renderToString(app)
      expect(html).toContain('42')
    }
    finally {
      vi.unstubAllEnvs()
    }
  })
})
