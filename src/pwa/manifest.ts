import type { ManifestOptions } from 'vite-plugin-pwa'

/**
 * Build localized PWA manifest for the given locale.
 */
export function getPwaManifest(locale: 'fr' | 'en'): ManifestOptions {
  const base: ManifestOptions = {
    short_name: 'Shlagémon',
    theme_color: '#1865ab',
    background_color: '#1865ab',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }

  if (locale === 'fr') {
    return {
      ...base,
      lang: 'fr',
      name: 'Shlagémon - Ça sent très fort',
      description: 'Attrape tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
      start_url: '/',
      scope: '/',
    }
  }

  return {
    ...base,
    lang: 'en',
    name: 'Shlagemon - It smells very strong',
    description: 'Catch all the Shlagemons before they rot the whole world.',
    start_url: '/en',
    scope: '/en/',
  }
}
