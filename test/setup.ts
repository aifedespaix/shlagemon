import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeAll, vi } from 'vitest'
import { i18n, loadLanguageAsync } from '../src/modules/i18n'

vi.mock('@vueuse/core', async (orig) => {
  const mod = await orig()
  return {
    ...mod,
    useTimeoutFn: (fn: (...args: any[]) => void, delay: number) => {
      const id = setTimeout(fn, delay)
      return { start: () => {}, stop: () => clearTimeout(id) }
    },
  }
})

config.global.plugins = [...(config.global.plugins || []), i18n]

beforeAll(async () => {
  setActivePinia(createPinia())
  await loadLanguageAsync('fr')
})
