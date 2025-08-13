import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useAudioStore } from '../src/stores/audio'
import { useMainPanelStore } from '../src/stores/mainPanel'

/** Ensure panel transitions play enter/leave sound effects. */
describe('main panel sound effects', () => {
  it.each([
    ['showShop', 'shop-enter', 'shop-leave'],
    ['showMiniGame', 'mini-game-enter', 'mini-game-leave'],
    ['showPoulailler', 'mini-game-enter', 'mini-game-leave'],
    ['showArena', 'arena-enter', 'arena-leave'],
  ] as const)(
    'plays %s sounds',
    async (method, enter, leave) => {
      setActivePinia(createPinia())
      const audio = useAudioStore()
      const panel = useMainPanelStore()
      const spy = vi.spyOn(audio, 'playSfx')
      ;(panel[method] as () => void)()
      await nextTick()
      expect(spy).toHaveBeenCalledWith(enter)
      spy.mockClear()
      panel.showVillage()
      await nextTick()
      expect(spy).toHaveBeenCalledWith(leave)
    },
  )
})
