import type { Locale } from '~/constants/locales'
import type { UserModule } from '~/types'
import { useHead } from '@unhead/vue'
import { getCurrentInstance, watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { availableLocales, defaultLocale } from '~/constants/locales'
import { useLocaleStore } from '~/stores/locale'

/**
 * Instance i18n globale
 */
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {},
  // Le strict mode n'est pas utile ici, tu peux l'ajouter si tu veux des erreurs en dev.
})

/**
 * Chargement dynamique des fichiers .yml
 */
const localeLoaders = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml', { eager: false, import: 'default' }))
    .map(([path, loader]) => [path.match(/([\w-]*)\.yml$/)?.[1], loader]),
) as Record<Locale, () => Promise<Record<string, string>>>

const loadedLanguages: Locale[] = []

/**
 * Modifie la langue courante dans l'i18n, le store et la balise HTML
 */
function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang
  if (typeof document !== 'undefined')
    document.documentElement.setAttribute('lang', lang)
  // Ajout : update du manifest/lang dans le head
  if (getCurrentInstance()) {
    useHead({
      htmlAttrs: {
        lang,
      },
    })
  }
  return lang
}

/**
 * Charge la locale dynamiquement si pas déjà chargée
 */
export async function loadLanguageAsync(lang: Locale): Promise<Locale> {
  if (!availableLocales.includes(lang))
    lang = defaultLocale
  if (!loadedLanguages.includes(lang)) {
    const loader = localeLoaders[lang]
    if (loader) {
      const messages = await loader()
      i18n.global.setLocaleMessage(lang, messages)
      loadedLanguages.push(lang)
    }
  }
  return setI18nLanguage(lang)
}

/**
 * Installation du plugin i18n dans l'app Vue.
 * Gère le SSR/SSG et le client-side, et charge la bonne langue selon l'URL.
 */
export const install: UserModule = async ({ app, isClient, routePath, router }) => {
  app.use(i18n)
  const localeStore = useLocaleStore()

  // 1. Détecter la locale de l'URL d'abord (toujours prioritaire !)
  let pathLocale: Locale | undefined
  if (isClient)
    pathLocale = window.location.pathname.split('/')[1] as Locale
  else if (routePath)
    pathLocale = routePath.split('/')[1] as Locale

  const locale: Locale
    = (pathLocale && availableLocales.includes(pathLocale)) ? pathLocale : defaultLocale

  localeStore.setLocale(locale)
  await loadLanguageAsync(locale)

  // 2. En client, on écoute les changements de route pour charger dynamiquement la langue
  if (isClient && router) {
    watch(
      () => router.currentRoute.value.path,
      async (newPath) => {
        const lang = newPath.split('/')[1] as Locale
        if (availableLocales.includes(lang) && i18n.global.locale.value !== lang) {
          await loadLanguageAsync(lang)
          localeStore.setLocale(lang)
        }
      },
      { immediate: false },
    )
  }
}
