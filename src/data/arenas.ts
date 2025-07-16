import type { Arena, BaseShlagemon } from '~/type'
import type { Zone } from '~/type/zone'
import { profMerdant } from './characters/prof-merdant'
import { zonesData } from './zones'

function topShlagemons(zone: Zone, count = 2): BaseShlagemon[] {
  const unique = (zone.shlagemons ?? [])
    .reduce<Record<string, BaseShlagemon>>((acc, mon) => {
      acc[mon.id] = mon
      return acc
    }, {})

  return Object.values(unique)
    .sort((a, b) => b.coefficient - a.coefficient)
    .slice(0, count)
}

function generateArenaLineup(zoneId: string): BaseShlagemon[] {
  const index = zonesData.findIndex(z => z.id === zoneId)
  const previous: Zone[] = []
  for (let i = index - 1; i >= 0 && previous.length < 4; i--) {
    const z = zonesData[i]
    if (z.type === 'sauvage')
      previous.push(z)
  }
  previous.reverse()
  const lineup = previous.flatMap((z, i) => topShlagemons(z, i < 2 ? 1 : 2))
  const last = lineup[lineup.length - 1]
  if (last?.evolution?.base)
    lineup[lineup.length - 1] = last.evolution.base
  return lineup
}

interface ArenaConfig {
  id: string
  character: typeof profMerdant
  level: number
  badge: Arena['badge']
  zoneId: string
}

function createArena(config: ArenaConfig): Arena {
  return {
    id: config.id,
    character: config.character,
    level: config.level,
    badge: config.badge,
    get lineup() {
      return generateArenaLineup(config.zoneId)
    },
  } as unknown as Arena
}

export const arena20: Arena = createArena({
  id: 'arena20',
  zoneId: 'village-boule',
  character: profMerdant,
  level: 21,
  badge: {
    id: 'badge-merdant',
    name: 'Badge Merdant',
    levelCap: 40,
    image: '',
  },
})

export const arena40: Arena = createArena({
  id: 'arena40',
  zoneId: 'village-paume',
  character: profMerdant,
  level: 41,
  badge: {
    id: 'badge-suce',
    name: 'Badge Suce',
    levelCap: 60,
    image: '',
  },
})

export const arena60: Arena = createArena({
  id: 'arena60',
  zoneId: 'village-paume',
  character: profMerdant,
  level: 61,
  badge: {
    id: 'badge-fiak',
    name: 'Badge Fiak',
    levelCap: 80,
    image: '',
  },
})

export const arenas: Arena[] = [
  arena20,
  arena40,
  arena60,
]

export function getArena(id: string): Arena | undefined {
  return arenas.find(a => a.id === id)
}
