import type { UserModule } from '~/types'
import { zoneTracks } from '~/data/music'
import { useAudioStore } from '~/stores/audio'
import { useZoneStore } from '~/stores/zone'

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  const audio = useAudioStore()
  const zone = useZoneStore()
  if (audio.isMusicEnabled && !audio.currentMusic)
    audio.playMusic(zoneTracks[zone.current.id])
}
