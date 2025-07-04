import type { AudioSettings } from '~/type'
import { Howl } from 'howler'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, watch } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const settings = reactive<AudioSettings>({
    musicVolume: 0.5,
    sfxVolume: 0.7,
    isMusicEnabled: true,
    isSfxEnabled: true,
  })
  const { musicVolume, sfxVolume, isMusicEnabled, isSfxEnabled } = toRefs(settings)
  const currentMusic = ref<Howl | null>(null)

  const tracks = {
    battle: [
      '/audio/musics/battle/battle-a.ogg',
      '/audio/musics/battle/battle-b.ogg',
      '/audio/musics/battle/battle-c.ogg',
      '/audio/musics/battle/battle-d.ogg',
    ],
    trainers: [
      '/audio/musics/trainers/trainer-a.ogg',
      '/audio/musics/trainers/trainer-b.ogg',
      '/audio/musics/trainers/trainer-c.ogg',
      '/audio/musics/trainers/trainer-d.ogg',
    ],
    villages: [
      '/audio/musics/villages/village-a.ogg',
      '/audio/musics/villages/village-b.ogg',
      '/audio/musics/villages/village-c.ogg',
    ],
  } as const

  function randomTrack(category: keyof typeof tracks) {
    const list = tracks[category]
    return list[Math.floor(Math.random() * list.length)]
  }

  function createMusic(src: string) {
    return new Howl({
      src: [src],
      volume: musicVolume.value,
      loop: true,
    })
  }

  function playMusic(track: string) {
    stopMusic()
    currentMusic.value = createMusic(track)
    if (isMusicEnabled.value)
      currentMusic.value.play()
  }

  function fadeToMusic(track: string) {
    if (!currentMusic.value) {
      playMusic(track)
      return
    }
    if (currentMusic.value._src === track)
      return

    const old = currentMusic.value
    const next = createMusic(track)

    if (isMusicEnabled.value) {
      next.volume(0)
      next.play()
      next.fade(0, musicVolume.value, 1000)
      old.fade(old.volume(), 0, 1000)
      setTimeout(() => {
        old.stop()
        old.unload()
      }, 1000)
    }
    else {
      old.stop()
      old.unload()
    }

    currentMusic.value = next
  }

  function playRandomMusic(category: keyof typeof tracks) {
    playMusic(randomTrack(category))
  }

  function fadeToRandomMusic(category: keyof typeof tracks) {
    fadeToMusic(randomTrack(category))
  }

  function stopMusic() {
    if (!currentMusic.value)
      return
    currentMusic.value.stop()
    currentMusic.value.unload()
    currentMusic.value = null
  }

  function playSfx(effect: string) {
    if (!isSfxEnabled.value)
      return
    const sfx = new Howl({ src: [effect], volume: sfxVolume.value })
    sfx.play()
  }

  watch(musicVolume, (v) => {
    if (currentMusic.value)
      currentMusic.value.volume(v)
  })

  watch(isMusicEnabled, (enabled) => {
    if (!currentMusic.value)
      return
    if (enabled)
      currentMusic.value.play()
    else
      currentMusic.value.pause()
  })

  return {
    musicVolume,
    sfxVolume,
    isMusicEnabled,
    isSfxEnabled,
    currentMusic,
    playMusic,
    fadeToMusic,
    playRandomMusic,
    fadeToRandomMusic,
    stopMusic,
    playSfx,
  }
}, {
  persist: {
    pick: [
      'musicVolume',
      'sfxVolume',
      'isMusicEnabled',
      'isSfxEnabled',
    ],
  },
})
