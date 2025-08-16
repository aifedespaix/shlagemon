import process from 'node:process'
import {
  createLocalFontProcessor,
} from '@unocss/preset-web-fonts/local'
import { presetWind3 } from '@unocss/preset-wind3'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const isVitest = !!process.env.VITEST

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    // Dynamic viewport height with safe area handling
    // Hauteur "avec barre" par défaut (svh), puis on autorise dvh sur écrans plus grands
    ['app-root', 'min-h-[100svh] md:min-h-[100dvh] flex flex-col'],

    // Safe areas (iOS)
    ['safe-top', 'pt-[env(safe-area-inset-top)]'],
    ['safe-bottom', 'pb-[env(safe-area-inset-bottom)]'],
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts(
      isVitest
        ? { provider: 'none', inlineImports: false }
        : {
            fonts: {
              sans: 'DM Sans',
              serif: 'DM Serif Display',
              mono: 'DM Mono',
            },
            processors: createLocalFontProcessor(),
          },
    ),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        // default patterns
        /\.(vue|svelte|[jt]sx|vine\.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // allow scanning of all JS/TS files
        'src/**/*.{js,ts}',
      ],
    },
  },
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
