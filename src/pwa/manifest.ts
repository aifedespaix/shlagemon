import type { ManifestOptions } from 'vite-plugin-pwa'

export const manifest = {
  id: '/',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  display_override: ['window-controls-overlay', 'standalone'],
  launch_handler: { client_mode: 'navigate-existing' },
  orientation: 'any',
  theme_color: '#1865ab',
  background_color: '#1865ab',
  edge_side_panel: { preferred_width: 400 },

  name: 'Shlagémon',
  short_name: 'Shlagémon',
  description: 'Catch all the Shlagemons before they rot the whole world.',

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

  file_handlers: [
    {
      action: '/save/import',
      accept: { 'application/x-shlag': ['.shlag'] },
    },
  ],
} satisfies Partial<ManifestOptions>
