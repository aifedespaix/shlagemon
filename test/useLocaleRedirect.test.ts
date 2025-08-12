import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { defaultLocale } from '../src/constants/locales'

const originalNavigator = globalThis.navigator

interface SetupOptions {
  storedLocale?: string | null
  storeLocale?: string
  navigatorLanguages?: string[]
  target?: string | Record<string, string>
}

async function setup(options: SetupOptions = {}) {
  const {
    storedLocale = null,
    storeLocale,
    navigatorLanguages,
    target = '/foo',
  } = options

  localStorage.clear()
  if (storedLocale)
    localStorage.setItem('locale', storedLocale)

  if (navigatorLanguages) {
    Object.defineProperty(globalThis, 'navigator', {
      value: { languages: navigatorLanguages },
      configurable: true,
    })
  }

  const pinia = createPinia()
  setActivePinia(pinia)
  if (storeLocale)
    useLocaleStore().setLocale(storeLocale as any)

  const router = createRouter({ history: createWebHistory(), routes: [{ path: '/', component: { template: '<div></div>' } }] })
  const replaceSpy = vi.spyOn(router, 'replace').mockResolvedValue(undefined as any)

  mount({
    template: '<div></div>',
    setup: () => useLocaleRedirect(target as any),
  }, {
    global: { plugins: [router, pinia] },
  })

  await vi.advanceTimersByTimeAsync(250)

  return { replaceSpy }
}

describe('useLocaleRedirect', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    if (originalNavigator) {
      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        configurable: true,
      })
    }
    else {
      delete (globalThis as any).navigator
    }
  })

  it('redirects using stored locale', async () => {
    const { replaceSpy } = await setup({ storedLocale: 'fr' })
    expect(replaceSpy).toHaveBeenCalledWith({ path: '/fr/foo' })
    expect(useLocaleStore().locale).toBe('fr')
  })

  it('redirects using store locale', async () => {
    const { replaceSpy } = await setup({ storeLocale: 'fr' })
    expect(replaceSpy).toHaveBeenCalledWith({ path: '/fr/foo' })
  })

  it('uses navigator languages when no preference', async () => {
    const { replaceSpy } = await setup({ navigatorLanguages: ['fr-FR'] })
    expect(replaceSpy).toHaveBeenCalledWith({ path: '/fr/foo' })
    expect(useLocaleStore().locale).toBe('fr')
  })

  it('falls back to default locale', async () => {
    const { replaceSpy } = await setup({ navigatorLanguages: ['es-ES'] })
    expect(replaceSpy).toHaveBeenCalledWith({ path: `/${defaultLocale}/foo` })
  })

  it('handles locale-specific paths', async () => {
    const { replaceSpy } = await setup({ storedLocale: 'fr', target: { en: '/save/import', fr: '/sauvegarde/importer' } })
    expect(replaceSpy).toHaveBeenCalledWith({ path: '/fr/sauvegarde/importer' })
  })
})
