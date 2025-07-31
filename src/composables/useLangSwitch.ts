import type { Locale } from '~/constants/locales'
import { loadLanguageAsync } from '~/modules/i18n'
import { localizedRoutes } from '~/router/localizedRoutes'
import { useLocaleStore } from '~/stores/locale'

/**
 * Provides a helper to switch the application language while
 * preserving the current page when possible.
 */
export function useLangSwitch() {
  const router = useRouter()
  const route = useRoute()
  const store = useLocaleStore()

  /**
   * Switch to the specified locale and return the path of the
   * equivalent page. Query parameters are preserved.
   *
   * @param targetLocale The desired locale (e.g. 'en' or 'fr').
   * @returns Resolved path for navigation or `null` if unknown route.
   */
  async function switchLang(targetLocale: Locale): Promise<string | null> {
    const currentLocale = String(route.meta.locale)
    const currentName = String(route.name)
    const baseName = currentName.replace(`${currentLocale}-`, '')
    const entry = localizedRoutes.find(r => r.name === baseName)
    const path = entry?.paths[targetLocale]
    if (!path)
      return null
    store.setLocale(targetLocale)
    await loadLanguageAsync(targetLocale)
    return router.resolve({ path, query: route.query }).fullPath
  }

  return { switchLang }
}
