import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { i18n, install as installI18n, loadLanguageAsync } from '../src/modules/i18n'
import { useLocaleStore } from '../src/stores/locale'

describe('i18n ssg locale', () => {
  it('uses route meta locale during generation', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    installI18n({
      app: { use: () => {} } as any,
      isClient: false,
      route: { meta: { locale: 'fr' } },
    } as any)

    expect(useLocaleStore().locale).toBe('fr')
    await loadLanguageAsync(useLocaleStore().locale)
    expect(i18n.global.locale.value).toBe('fr')
  })
})
