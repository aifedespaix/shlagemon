import { Howl } from 'howler'
import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const musicVolume = ref(0.5)
  const sfxVolume = ref(0.7)
  const isMusicEnabled = ref(true)
  const isSfxEnabled = ref(true)
  const currentMusic = ref<Howl | null>(null)

  function createMusic(src: string) {
    return new Howl({
      src: [src],
      volume: musicVolume.value,
      loop: true,
    })
  }

  function playMusic(track: string) {
    stopMusic()
    if (!isMusicEnabled.value)
      return
    currentMusic.value = createMusic(track)
    currentMusic.value.play()
  }

  function fadeToMusic(track: string) {
    if (currentMusic.value) {
      if (currentMusic.value._src === track)
        return
      const old = currentMusic.value
      const next = createMusic(track)
      next.volume(0)
      next.play()
      next.fade(0, musicVolume.value, 1000)
      old.fade(old.volume(), 0, 1000)
      setTimeout(() => {
        old.stop()
        old.unload()
      }, 1000)
      currentMusic.value = next
    }
    else {
      playMusic(track)
    }
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
    stopMusic,
    playSfx,
  }
}, {
  persist: true,
})
