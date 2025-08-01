import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useAudioStore } from '../src/stores/audio'
import { useOdorElixirStore } from '../src/stores/odorElixir'
import { useShlagedexStore } from '../src/stores/shlagedex'

/** Ensure the rarity-100 sound plays when a mon reaches rarity 100. */
describe('rarity 100 sound effect', () => {
  it('plays when applying odor elixir', () => {
    setActivePinia(createPinia())
    const audio = useAudioStore()
    const dex = useShlagedexStore()
    useOdorElixirStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.lvl = 100
    mon.rarity = 99
    const spy = vi.spyOn(audio, 'playSfx')
    dex.applyOdorElixir(mon)
    expect(mon.rarity).toBe(100)
    expect(spy).toHaveBeenCalledWith('rarity-100')
  })
})
