import type { MaybeRefOrGetter } from 'vue'
import { unref } from 'vue'

/**
 * Options for the {@link usePageHead} composable.
 */
export interface PageHeadOptions {
  /** Page title displayed in the browser tab and metadata. */
  title?: MaybeRefOrGetter<string>
  /** Description used in SEO and social cards. */
  description?: MaybeRefOrGetter<string>
  /** Optional image URL for social previews. */
  image?: MaybeRefOrGetter<string>
  /** Comma separated keywords for search engines. */
  keywords?: MaybeRefOrGetter<string>
}

/**
 * Configure SEO and social metadata for a page.
 *
 * This composable applies sensible defaults using global translations and can
 * be overridden per page by providing {@link PageHeadOptions}.
 */
export function usePageHead(options: PageHeadOptions = {}) {
  const { t } = useI18n()
  const seoHead = useSeoHead()

  const DEFAULT_IMAGE
    = '/thumbnail.jpg'

  useHead(() => {
    const title = unref(options.title) ?? t('App.title')
    const description = unref(options.description) ?? t('App.description')
    const image = unref(options.image) ?? DEFAULT_IMAGE
    const keywords
      = unref(options.keywords)
        ?? 'shlagemon, jeu, pokemon, parodie, capture, combat'

    return {
      title,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        { name: 'author', content: t('App.author') },
        { name: 'theme-color', content: isDark.value ? '#1865ab' : '#ffffff' },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: seoHead.canonicalUrl.value },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: 'Shlagémon' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:site', content: '@AifeTV' },
        { name: 'twitter:creator', content: '@AifeTV' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
          key: 'favicon-svg',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '48x48',
          href: '/favicon.png',
          key: 'favicon-png',
        },
        { rel: 'image_src', href: image, key: 'image-src' },
      ],
    }
  })
}

export default usePageHead
