import type { Locale } from '~/constants/locales'
import { availableLocales, defaultLocale } from '~/constants/locales'

/**
 * Redirects the user to a locale-specific version of a target path.
 *
 * Locale detection priority:
 * 1. Explicit preference stored in localStorage under the `locale` key.
 * 2. Locale already present in the Pinia store.
 * 3. Browser preferred languages.
 *
 * The resolved locale is written back to the store for global consistency
 * before performing a client-side redirect to `/${locale}${targetPath}`.
 *
 * @param targetPath - Path to append after the locale prefix (must start with '/').
 * @returns Object containing a `isRedirecting` flag for optional UI feedback.
 */
export function useLocaleRedirect(targetPath: string) {
  if (!targetPath.startsWith('/'))
    throw new Error('targetPath must start with "/"')

  const router = useRouter()
  const store = useLocaleStore()
  const preferredLanguages = usePreferredLanguages()
  const isRedirecting = ref(true)
  const storedLocale = useLocalStorage<Locale | null>('locale', null, { writeDefaults: false })

  function isLocale(value: string | null): value is Locale {
    return value !== null && availableLocales.includes(value as Locale)
  }

  onMounted(async () => {
    let targetLocale: Locale | undefined

    const stored = storedLocale.value
    if (isLocale(stored))
      targetLocale = stored

    if (!targetLocale && isLocale(store.locale) && store.locale !== defaultLocale)
      targetLocale = store.locale

    if (!targetLocale) {
      const navLanguages = preferredLanguages.value.map(language => language.toLowerCase())
      targetLocale = navLanguages.some(language => language.startsWith('fr')) ? 'fr' : defaultLocale
    }

    if (targetLocale !== store.locale)
      store.setLocale(targetLocale)

    setTimeout(async () => {
      const path = targetPath === '/' ? '' : targetPath
      await router.replace({ path: `/${targetLocale}${path}` })
      isRedirecting.value = false
    }, 200)
  })

  return { isRedirecting }
}
