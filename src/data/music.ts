import type { ZoneId } from '~/type/zone'

export const zoneTracks: Record<ZoneId, string> = {
  'plaine-kekette': '/audio/musics/villages/village-b.ogg',
  'bois-de-bouffon': '/audio/musics/villages/village-c.ogg',
  'grotte-du-slip': '/audio/musics/villages/village-a.ogg',
  'ravin-fesse-molle': '/audio/musics/villages/village-b.ogg',
  'grotte-nanard': '/audio/musics/villages/village-c.ogg',
  'marais-moudugenou': '/audio/musics/villages/village-a.ogg',
  'forteresse-petmoalfiak': '/audio/musics/villages/village-b.ogg',
  'route-du-nawak': '/audio/musics/villages/village-c.ogg',
  'mont-dracatombe': '/audio/musics/villages/village-a.ogg',
  'catacombes-merdifientes': '/audio/musics/villages/village-b.ogg',
  'route-aguicheuse': '/audio/musics/villages/village-c.ogg',
  'grotte-des-chieurs': '/audio/musics/villages/village-a.ogg',
  'trou-du-bide': '/audio/musics/villages/village-b.ogg',
  'zone-giga-zob': '/audio/musics/villages/village-c.ogg',
  'route-so-dom': '/audio/musics/villages/village-a.ogg',
  'village-veaux-du-gland': '/audio/musics/villages/village-b.ogg',
  'village-boule': '/audio/musics/villages/village-c.ogg',
  'village-paume': '/audio/musics/villages/village-a.ogg',
}

const wildBattleTracks = new Set([
  'plaine-kekette',
  'bois-de-bouffon',
  'chemin-du-slip',
  'ravin-fesse-molle',
  'precipice-nanard',
  'marais-moudugenou',
  'forteresse-petmoalfiak',
  'route-du-nawak',
  'mont-dracatombe',
  'catacombes-merdifientes',
  'route-aguicheuse',
  'vallee-des-chieurs',
])

export function getZoneBattleTrack(id?: string): string | undefined {
  if (!id || !wildBattleTracks.has(id))
    return undefined
  return `/audio/musics/battle/${id}.ogg`
}

export const trainerTracks: Record<string, string> = {
  'bob': '/audio/musics/trainers/trainer-a.ogg',
  'king-plaine-kekette': '/audio/musics/trainers/trainer-b.ogg',
  'king-bois-de-bouffon': '/audio/musics/trainers/trainer-c.ogg',
  'king-grotte-du-slip': '/audio/musics/trainers/trainer-d.ogg',
  'king-ravin-fesse-molle': '/audio/musics/trainers/trainer-a.ogg',
  'king-grotte-nanard': '/audio/musics/trainers/trainer-b.ogg',
  'king-marais-moudugenou': '/audio/musics/trainers/trainer-c.ogg',
  'king-forteresse-petmoalfiak': '/audio/musics/trainers/trainer-d.ogg',
  'king-route-du-nawak': '/audio/musics/trainers/trainer-a.ogg',
  'king-mont-dracatombe': '/audio/musics/trainers/trainer-b.ogg',
  'king-catacombes-merdifientes': '/audio/musics/trainers/trainer-c.ogg',
  'king-route-aguicheuse': '/audio/musics/trainers/trainer-d.ogg',
  'king-grotte-des-chieurs': '/audio/musics/trainers/trainer-a.ogg',
  'king-trou-du-bide': '/audio/musics/trainers/trainer-b.ogg',
  'king-zone-giga-zob': '/audio/musics/trainers/trainer-c.ogg',
  'king-route-so-dom': '/audio/musics/trainers/trainer-d.ogg',
}
