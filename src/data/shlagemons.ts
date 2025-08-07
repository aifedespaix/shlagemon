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
    base.name = `data.shlagemons.${key}.name`
    base.description = `data.shlagemons.${key}.description`
    return base
  })

const evolvedIds = new Set<string>()
for (const mon of allShlagemons) {
  const evolutions = mon.evolutions ?? (mon.evolution ? [mon.evolution] : [])
  evolutions.forEach((e) => {
    const id = e.base.id
    if (id)
      evolvedIds.add(id)
  })
}

export const baseShlagemons = allShlagemons.filter(m => !evolvedIds.has(m.id))
