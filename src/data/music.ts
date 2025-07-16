import type { ZoneId, ZoneType } from '~/type/zone'

type TrackMap = Record<string, string>

function createTrackMap(glob: Record<string, string>): TrackMap {
  return Object.fromEntries(
    Object.entries(glob).map(([path, url]) => {
      const id = path.split('/').pop()!.replace('.ogg', '')
      return [id, url]
    }),
  )
}

const villageFiles = import.meta.glob('../../public/audio/musics/villages/*.ogg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const battleFiles = import.meta.glob('../../public/audio/musics/battle/*.ogg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const characterFiles = import.meta.glob('../../public/audio/musics/character/*.ogg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const arenaFiles = import.meta.glob('../../public/audio/musics/arenas/*.ogg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const villageTracks = createTrackMap(villageFiles)
const battleTracks = createTrackMap(battleFiles)
const characterTracks = createTrackMap(characterFiles)
const arenaTracks = createTrackMap(arenaFiles)

export function getZoneBattleTrack(id?: string): string | undefined {
  if (!id)
    return undefined
  if (battleTracks[id])
    return battleTracks[id]
  return undefined
}

export function getArenaTrack(id?: string): string | undefined {
  if (!id)
    return undefined
  return arenaTracks[id]
}

export function getCharacterTrack(id?: string): string | undefined {
  if (!id)
    return undefined
  return characterTracks[id]
}

export function getVillageTrack(id?: string): string | undefined {
  if (!id)
    return undefined
  return villageTracks[id]
}

export function getZoneTrack(id: ZoneId, type: ZoneType): string | undefined {
  return type === 'village' ? getVillageTrack(id) : getZoneBattleTrack(id)
}
