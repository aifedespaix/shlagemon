import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeAll } from 'vitest'
import { i18n, loadLanguageAsync } from '../src/modules/i18n'

config.global.plugins = [...(config.global.plugins || []), i18n]

beforeAll(async () => {
  setActivePinia(createPinia())
  await loadLanguageAsync('fr')
})
