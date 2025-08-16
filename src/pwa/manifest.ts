// src/pwa/manifest.ts
import type { ManifestOptions } from 'vite-plugin-pwa'
import type { Locale } from '~/constants/locales'

/**
 * Manifest unique (scope/start_url à la racine).
 * Localisation gérée par l'app (router/i18n), pas par le manifest.
 */
const base: ManifestOptions = {
  id: '/',
  start_url: '/',          // ✅ unique & offline-friendly
  scope: '/',              // ✅ SW couvre toute l'app
  display: 'standalone',
  display_override: ['window-controls-overlay', 'standalone'],
  launch_handler: { client_mode: 'navigate-existing' },
  orientation: 'any',
  theme_color: '#1865ab',
  background_color: '#1865ab',
  edge_side_panel: { preferred_width: 400 },

  // Choisis un nom/desc neutres (une seule langue possible dans le manifest)
  name: 'Shlagémon',
  short_name: 'Shlagémon',
  description: 'Catch all the Shlagemons before they rot the whole world.',

  // L’UI sera traduite par l’app ; "lang" ici est purement informatif
  lang: 'en',
  dir: 'ltr',

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

  // File associations à la racine : tu dispatches vers /fr ou /en dans l’app
  file_handlers: [
    {
      action: '/save/import',
      accept: { 'application/x-shlag': ['.shlag'] },
    },
  ],
}

export function getPwaManifest(_locale: Locale): ManifestOptions {
  // On renvoie le manifest unique ; la locale est gérée par l’app au boot.
  return base
}
