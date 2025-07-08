import type { BaseShlagemon } from '~/type'

export const modules = import.meta.glob<{ default: BaseShlagemon }>('./shlagemons/**/*.ts', { eager: true })

export const allShlagemons: BaseShlagemon[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts'))
  .map(([, m]) => m.default)
