import type { Locale } from '~/constants/locales'
import type { UserModule } from '~/types'
import { useHead } from '@unhead/vue'
import { getCurrentInstance } from 'vue'
import { createI18n } from 'vue-i18n'
import { defaultLocale } from '~/constants/locales'
import { useLocaleStore } from '~/stores/locale'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml', { eager: true, import: 'default' }))
    .map(([path, messages]) => [path.match(/([\w-]*)\.yml$/)?.[1], messages]),
) as Record<Locale, Record<string, string>>

// availableLocales constant is defined in ~/constants/locales and
// should match the set of translation files present in `/locales`.

const loadedLanguages: Locale[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang
  if (typeof document !== 'undefined')
    document.documentElement.setAttribute('lang', lang)
  if (getCurrentInstance()) {
    useHead({
      htmlAttrs: {
        lang,
      },
      link: [
        {
          rel: 'manifest',
          href: `/${lang}/manifest.webmanifest`,
        },
      ],
    })
  }
  return lang
}

export async function loadLanguageAsync(lang: Locale): Promise<Locale> {
  if (!loadedLanguages.includes(lang)) {
    const messages = localesMap[lang]
    if (messages)
      i18n.global.setLocaleMessage(lang, messages)
    loadedLanguages.push(lang)
  }
  return setI18nLanguage(lang)
}

export const install: UserModule = ({ app, isClient, routePath }) => {
  app.use(i18n)
  const localeStore = useLocaleStore()

  if (!isClient) {
    const routeLocale = routePath?.split('/')[1] as Locale | undefined
    if (routeLocale)
      localeStore.setLocale(routeLocale)
  }
  else if (!localStorage.getItem('locale')) {
    const navigatorLanguage = navigator.language.toLowerCase()
    const fallback = navigatorLanguage.startsWith('fr') ? 'fr' : defaultLocale
    localeStore.setLocale(fallback)
  }

  console.log('locale : ', localeStore.locale)
  loadLanguageAsync(localeStore.locale)
}
