import type { UserModule } from '~/types'
import { getZoneTrack } from '~/data/music'

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  const audio = useAudioStore()
  const zone = useZoneStore()
  if (audio.isMusicEnabled && !audio.currentMusic) {
    const track = getZoneTrack(zone.current.id, zone.current.type)
    if (track)
      audio.playMusic(track)
  }
}
