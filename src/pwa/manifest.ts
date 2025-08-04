import type { ManifestOptions } from 'vite-plugin-pwa'
import type { Locale } from '~/constants/locales'

/**
 * Build localized PWA manifest for the given locale.
 */
export function getPwaManifest(locale: Locale): ManifestOptions {
  const base: ManifestOptions = {
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
    screenshots: [
      {
        src: '/screenshots/battle.jpg',
        sizes: '1200x800',
        type: 'image/jpeg',
      },
      {
        src: '/screenshots/detail.jpg',
        sizes: '1200x800',
        type: 'image/jpeg',
      },
      {
        src: '/screenshots/dialog.jpg',
        sizes: '1200x800',
        type: 'image/jpeg',
      },
      {
        src: '/screenshots/shop.jpg',
        sizes: '1200x800',
        type: 'image/jpeg',
      },
      {
        src: '/screenshots/with-map.jpg',
        sizes: '1200x800',
        type: 'image/jpeg',
      },
    ],
  }

  if (locale === 'fr') {
    return {
      ...base,
      lang: 'fr',
      short_name: 'Shlagémon',
      name: 'Shlagémon - Ça sent très fort',
      description: 'Attrape tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
      start_url: '/fr/',
      scope: '/fr/',
    }
  }

  return {
    ...base,
    lang: 'en',
    short_name: 'Shlagemon',
    name: 'Shlagemon - It smells very strong',
    description: 'Catch all the Shlagemons before they rot the whole world.',
    start_url: '/en/',
    scope: '/en/',
  }
}
