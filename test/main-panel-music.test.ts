import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useAudioStore } from '../src/stores/audio'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useUIStore } from '../src/stores/ui'

/** Ensure POI panels trigger their dedicated background music. */
describe('main panel music', () => {
  it.each([
    ['showShop', '/audio/musics/shop.ogg'],
    ['showPoulailler', '/audio/musics/poulailler.ogg'],
    ['showDojo', '/audio/musics/dojo.ogg'],
    ['showBreeding', '/audio/musics/breeding.ogg'],
  ] as const)('plays %s track', async (method, track) => {
    setActivePinia(createPinia())
    const panel = useMainPanelStore()
    useUIStore()
    const audio = useAudioStore()
    const spy = vi.spyOn(audio, 'fadeToMusic')
    ;(panel[method] as () => void)()
    await nextTick()
    expect(spy).toHaveBeenCalledWith(track)
  })
})
