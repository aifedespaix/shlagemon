// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
  },
  {
    files: ['package.json'],
    rules: {
      'pnpm/json-enforce-catalog': 'off',
    },
  },
)
