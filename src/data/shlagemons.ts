import type { BaseShlagemon } from '~/type'

export const modules = import.meta.glob<{ default: BaseShlagemon }>('./shlagemons/**/*.ts', { eager: true })

export const allShlagemons: BaseShlagemon[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts'))
  .map(([path, m]) => {
    const base = m.default
    const rel = path
      .replace('./shlagemons/', '')
      .replace(/\.ts$/, '')
    const key = rel.replace(/\//g, '.')
    base.descriptionKey = `data.shlagemons.${key}.description`
    return base
  })
