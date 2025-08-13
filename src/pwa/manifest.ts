// src/pwa/manifest.ts

import type { ManifestOptions } from 'vite-plugin-pwa'
import type { Locale } from '~/constants/locales'

const base: Partial<ManifestOptions> = {
  id: '/', // sera surchargé par locale plus bas
  launch_handler: { client_mode: 'navigate-existing' },
  orientation: 'any',
  display: 'standalone',
  display_override: ['window-controls-overlay', 'standalone'],
  theme_color: '#1865ab',
  background_color: '#1865ab',
  edge_side_panel: { preferred_width: 400 },
  icons: [
    { src: '/pwa-64x64.png', sizes: '64x64', type: 'image/png', purpose: 'any' },
    { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/maskable_icon_x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: '/maskable_icon_x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
  screenshots: [
    { src: '/screenshots/battle.jpg', sizes: '1200x800', type: 'image/jpeg' },
    { src: '/screenshots/detail.jpg', sizes: '1200x800', type: 'image/jpeg' },
    { src: '/screenshots/dialog.jpg', sizes: '1200x800', type: 'image/jpeg' },
    { src: '/screenshots/shop.jpg', sizes: '1200x800', type: 'image/jpeg' },
    { src: '/screenshots/with-map.jpg', sizes: '1200x800', type: 'image/jpeg' },
  ],
  handle_links: 'auto',
  protocol_handlers: [],
  categories: ['games', 'idle', 'strategy'],
  dir: 'ltr',

}

export function getPwaManifest(locale: Locale): ManifestOptions {
  // On prépare les champs localisés
  const localData = locale === 'fr'
    ? {
        id: '/fr/',
        name: 'Shlagémon - Ça sent très fort',
        short_name: 'Shlagémon',
        description: 'Attrape tous les Shlagémons pour éviter qu\'ils ne pourrissent la terre entière.',
        lang: 'fr',
        start_url: '/fr/',
        scope: '/fr/',
        file_handlers: [
          {
            action: '/fr/sauvegarde/importer',
            accept: {
              'application/x-shlag': ['.shlag'],
            },
          },
        ],
      }
    : {
        id: '/en/',
        name: 'Shlagemon - It smells very strong',
        short_name: 'Shlagemon',
        description: 'Catch all the Shlagemons before they rot the whole world.',
        lang: 'en',
        start_url: '/en/',
        scope: '/en/',
        file_handlers: [
          {
            action: '/en/save/import',
            accept: {
              'application/x-shlag': ['.shlag'],
            },
          },
        ],
      }

  // On merge proprement, puis on caste la sortie pour garantir le contrat strict PWA
  return {
    ...base,
    ...localData,
  } as ManifestOptions
}
