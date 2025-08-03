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
  const evolutions = last?.evolutions ?? (last?.evolution ? [last.evolution] : [])
  const evo = evolutions[0]
  if (evo?.base)
    lineup[lineup.length - 1] = evo.base
  return lineup
}

interface ArenaConfig {
  id: string
  character: typeof profMerdant
  level: number
  badge: Arena['badge']
  zoneId: string
  requiredBadgeId?: string
}

function createArena(config: ArenaConfig): Arena {
  return {
    id: config.id,
    character: config.character,
    level: config.level,
    badge: config.badge,
    requiredBadgeId: config.requiredBadgeId,
    get lineup() {
      return generateArenaLineup(config.zoneId)
    },
  }
}

export const arena20: Arena = createArena({
  id: 'arena20',
  zoneId: 'village-boule',
  character: profMerdant,
  level: 21,
  badge: {
    id: 'badge-merdant',
    name: 'Badge Couillasse',
    levelCap: 39,
    image: '',
  },
})

export const arena40: Arena = createArena({
  id: 'arena40',
  zoneId: 'village-paume',
  character: profMerdant,
  level: 41,
  badge: {
    id: 'badge-sock',
    name: 'Badge Chaussette',
    levelCap: 59,
    image: '',
  },
  requiredBadgeId: 'arena20',
})

export const arena60: Arena = createArena({
  id: 'arena60',
  zoneId: 'village-cassos-land',
  character: profMerdant,
  level: 61,
  badge: {
    id: 'badge-mystic-onion',
    name: 'Badge Oignon Mystique',
    levelCap: 79,
    image: '',
  },
  requiredBadgeId: 'arena40',
})

export const arena80: Arena = createArena({
  id: 'arena80',
  zoneId: 'village-clitoland',
  character: profMerdant,
  level: 81,
  badge: {
    id: 'badge-buttered-toast',
    name: 'Badge Tartine Beurrée',
    levelCap: 99,
    image: '',
  },
  requiredBadgeId: 'arena60',
})

export const arenas: Arena[] = [
  arena20,
  arena40,
  arena60,
  arena80,
]

export function getArena(id: string): Arena | undefined {
  return arenas.find(a => a.id === id)
}

/** Mapping of arena zones by their associated village identifier. */
const arenaByZoneId: Record<string, Arena> = {
  'village-boule': arena20,
  'village-paume': arena40,
  'village-cassos-land': arena60,
  'village-clitoland': arena80,
}

/** Retrieve an arena configuration using a village zone identifier. */
export function getArenaByZoneId(zoneId: string): Arena | undefined {
  return arenaByZoneId[zoneId]
}
