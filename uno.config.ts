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

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
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
