import type { SfxId } from '~/data/sfx'
import type { AudioSettings } from '~/type'
import { Howl } from 'howler'
import { defineStore, skipHydrate } from 'pinia'
import { preloadSfx } from '~/data/sfx'

function getTrackSrc(howl: Howl): string | undefined {
  return (howl as unknown as { _src?: string })._src
}

/**
 * Audio store handling music and sound effects playback.
 *
 * When running on the server, audio assets are not loaded and any attempt to
 * play sounds becomes a no-op so the store remains fully serializable.
 */
export const useAudioStore = defineStore('audio', () => {
  const settings = reactive<AudioSettings>({
    musicVolume: 0.5,
    sfxVolume: 0.7,
    isMusicEnabled: true,
    isSfxEnabled: true,
  })
  const { musicVolume, sfxVolume, isMusicEnabled, isSfxEnabled } = toRefs(settings)
  const isServer = import.meta.env.SSR
  const currentMusic = ref<Howl | null>(null)
  const sfxMap: Record<SfxId, Howl> = isServer ? ({} as Record<SfxId, Howl>) : preloadSfx()

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

  const buySfx: SfxId[] = [
    'buy-buy-a',
    'buy-buy-b',
    'buy-buy-c',
    'buy-buy-d',
    'buy-buy-e',
  ]
  let lastBuyIndex = -1

  const typingSfx: SfxId[] = [
    'typing-type-1',
    'typing-type-2',
    'typing-type-3',
    'typing-type-4',
  ]
  let lastTypingIndex = -1

  function randomTrack(category: keyof typeof tracks) {
    const list = tracks[category]
    return list[Math.floor(Math.random() * list.length)]
  }

  function createMusic(src: string) {
    if (import.meta.env.VITEST || isServer) {
      const stub = {
        _src: src,
        play: () => {},
        pause: () => {},
        stop: () => {},
        unload: () => {},
        volume: () => {},
        fade: () => {},
        once: () => {},
      }
      return stub as unknown as Howl
    }
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
    if (isServer)
      return
    stopMusic()
    // Vite auto import path public
    track = track.replace('/public', '')
    currentMusic.value = createMusic(track)
    if (!import.meta.env.VITEST && isMusicEnabled.value)
      currentMusic.value.play()
  }

  let fadeTimer: ReturnType<typeof setTimeout> | null = null
  let fadingOut: Howl | null = null

  function fadeToMusic(track: string) {
    if (isServer)
      return
    if (!currentMusic.value) {
      playMusic(track)
      return
    }

    if (getTrackSrc(currentMusic.value) === track)
      return

    if (fadeTimer) {
      clearTimeout(fadeTimer)
      if (fadingOut) {
        fadingOut.stop()
        fadingOut.unload()
        fadingOut = null
      }
      fadeTimer = null
    }

    const old = currentMusic.value
    const next = createMusic(track)

    if (import.meta.env.VITEST) {
      old.stop()
      old.unload()
      currentMusic.value = next
      return
    }

    if (isMusicEnabled.value) {
      next.volume(0)
      next.play()
      next.fade(0, musicVolume.value, 1000)
      old.fade(old.volume(), 0, 1000)
      fadingOut = old
      fadeTimer = setTimeout(() => {
        fadingOut?.stop()
        fadingOut?.unload()
        fadingOut = null
        fadeTimer = null
      }, 1000)
    }
    else {
      old.stop()
      old.unload()
    }

    currentMusic.value = next
  }

  function playRandomMusic(category: keyof typeof tracks) {
    if (isServer)
      return
    playMusic(randomTrack(category))
  }

  function fadeToRandomMusic(category: keyof typeof tracks) {
    if (isServer)
      return
    fadeToMusic(randomTrack(category))
  }

  function stopMusic() {
    if (isServer || !currentMusic.value)
      return
    currentMusic.value.stop()
    currentMusic.value.unload()
    currentMusic.value = null
    if (fadeTimer) {
      clearTimeout(fadeTimer)
      fadeTimer = null
    }
  }

  function playSfx(id: SfxId, options: { loop?: boolean } = {}) {
    if (isServer || import.meta.env.VITEST || !isSfxEnabled.value)
      return undefined
    const sound = sfxMap[id]
    if (!sound)
      return undefined
    const soundId = sound.play()
    sound.volume(sfxVolume.value, soundId)
    if (options.loop)
      sound.loop(true, soundId)
    return soundId
  }

  function stopSfx(id: SfxId, soundId?: number) {
    if (isServer)
      return
    const sound = sfxMap[id]
    if (!sound)
      return
    if (typeof soundId === 'number')
      sound.stop(soundId)
    else
      sound.stop()
    sound.loop(false)
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

  watch(sfxVolume, (v) => {
    Object.values(sfxMap).forEach(s => s.volume(v))
  })

  watch(isMusicEnabled, (enabled) => {
    if (!currentMusic.value)
      return
    if (enabled)
      currentMusic.value.play()
    else
      currentMusic.value.pause()
  })

  watch(isSfxEnabled, (enabled) => {
    if (!enabled)
      Object.values(sfxMap).forEach(s => s.stop())
  })

  return {
    musicVolume,
    sfxVolume,
    isMusicEnabled,
    isSfxEnabled,
    currentMusic: isServer ? skipHydrate(currentMusic) : currentMusic,
    playMusic,
    fadeToMusic,
    playRandomMusic,
    fadeToRandomMusic,
    stopMusic,
    playSfx,
    stopSfx,
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
