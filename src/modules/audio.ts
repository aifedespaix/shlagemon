import type { UserModule } from '~/types'
import { useAudioStore } from '~/stores/audio'

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
  const audio = useAudioStore()
  if (audio.isMusicEnabled && !audio.currentMusic)
    audio.playMusic('/audio/ambient.ogg')
}
