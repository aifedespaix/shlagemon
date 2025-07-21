import type { AudioSettings } from '~/type'
import { Howl } from 'howler'
import { defineStore, skipHydrate } from 'pinia'

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

  const buySfx = [
    '/audio/sfx/buy/buy-a.ogg',
    '/audio/sfx/buy/buy-b.ogg',
    '/audio/sfx/buy/buy-c.ogg',
    '/audio/sfx/buy/buy-d.ogg',
    '/audio/sfx/buy/buy-e.ogg',
  ] as const
  let lastBuyIndex = -1

  const typingSfx = [
    '/audio/sfx/typing/type-1.ogg',
    '/audio/sfx/typing/type-2.ogg',
    '/audio/sfx/typing/type-3.ogg',
    '/audio/sfx/typing/type-4.ogg',
  ] as const
  let lastTypingIndex = -1

  function randomTrack(category: keyof typeof tracks) {
    const list = tracks[category]
    return list[Math.floor(Math.random() * list.length)]
  }

  function createMusic(src: string) {
    const music = new Howl({
      src: [src],
      volume: musicVolume.value,
      loop: true,
      onplayerror: () => {
        music.once('unlock', () => music.play())
      },
    })
    return music
  }

  function playMusic(track: string) {
    stopMusic()
    // Vite auto import path public
    track = track.replace('/public', '')
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
      useTimeoutFn(() => {
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
    if (import.meta.env.VITEST || !isSfxEnabled.value)
      return
    const sfx = new Howl({
      src: [effect],
      volume: sfxVolume.value,
      onplayerror: () => {
        sfx.once('unlock', () => sfx.play())
      },
    })
    sfx.play()
  }

  function playBuySfx() {
    let index = Math.floor(Math.random() * buySfx.length)
    if (index === lastBuyIndex)
      index = (index + 1) % buySfx.length
    lastBuyIndex = index
    playSfx(buySfx[index])
  }

  function playTypingSfx() {
    let index = Math.floor(Math.random() * typingSfx.length)
    if (index === lastTypingIndex)
      index = (index + 1) % typingSfx.length
    lastTypingIndex = index
    playSfx(typingSfx[index])
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
    currentMusic: import.meta.env.SSR ? skipHydrate(currentMusic) : currentMusic,
    playMusic,
    fadeToMusic,
    playRandomMusic,
    fadeToRandomMusic,
    stopMusic,
    playSfx,
    playBuySfx,
    playTypingSfx,
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
