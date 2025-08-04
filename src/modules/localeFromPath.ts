import type { Locale } from '~/constants/locales'
import type { UserModule } from '~/types'
import { useLocaleStore } from '~/stores/locale'
import { loadLanguageAsync } from './i18n'

/**
 * Synchronize the locale store with the locale found in the current route.
 *
 * The URL locale always takes precedence over any stored locale. Only the root
 * path `/` relies on the stored or browser locale to redirect accordingly.
 */
export const install: UserModule = ({ router, isClient, head }) => {
  const store = useLocaleStore()

  router.beforeEach(async (to) => {
    const target = to.meta.locale as Locale | undefined
    if (target && target !== store.locale) {
      store.setLocale(target)
      await loadLanguageAsync(target)

      if (!isClient) {
        head?.push({
          htmlAttrs: { lang: target },
          link: [
            {
              rel: 'manifest',
              href: `/${target}/manifest.webmanifest`,
            },
          ],
        })
      }
    }
    return true
  })
}
