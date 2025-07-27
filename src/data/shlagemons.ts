import type { BaseShlagemon, Speciality } from '~/type'

export const modules = import.meta.glob<{ default: BaseShlagemon }>('./shlagemons/**/*.ts', { eager: true })

export const allShlagemons: BaseShlagemon[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts'))
  .map(([path, m]) => {
    const base = m.default
    if ((base as any).legendary) {
      ;(base as any).speciality = 'legendary'
      delete (base as any).legendary
    }
    const rel = path
      .replace('./shlagemons/', '')
      .replace(/\.ts$/, '')
    const key = rel.replace(/\//g, '.')
    base.descriptionKey = `data.shlagemons.${key}.description`
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

function findPreEvolution(id: string): BaseShlagemon | undefined {
  return allShlagemons.find((m) => {
    const evos = m.evolutions ?? (m.evolution ? [m.evolution] : [])
    return evos.some(e => e.base.id === id)
  })
}

function evolutionDepth(id: string): number {
  let depth = 0
  let prev = findPreEvolution(id)
  while (prev) {
    depth += 1
    prev = findPreEvolution(prev.id)
  }
  return depth
}

for (const mon of allShlagemons) {
  if (mon.speciality === 'legendary')
    continue
  const depth = evolutionDepth(mon.id)
  const hasEvolution = Boolean(mon.evolution || mon.evolutions?.length)
  let speciality: Speciality
  if (depth === 0 && !hasEvolution)
    speciality = 'unique'
  else if (depth === 0)
    speciality = 'evolution0'
  else if (depth === 1)
    speciality = 'evolution1'
  else
    speciality = 'evolution2'
  mon.speciality = speciality
}

export const baseShlagemons = allShlagemons.filter(m => !evolvedIds.has(m.id))
