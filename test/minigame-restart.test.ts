import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import MiniGame from '../src/components/panel/MiniGame.vue'
import { useMiniGameStore } from '../src/stores/miniGame'

const startContent = vi.fn()

vi.mock('../src/components/panel/PoiDialogFlow.vue', () => ({
  default: defineComponent({
    name: 'PoiDialogFlow',
    setup(_, { slots, expose }) {
      expose({ startContent })
      return () => h('div', slots.default && slots.default({}))
    },
  }),
}))

vi.mock('../src/data/minigames', () => ({
  getMiniGame: () => ({
    id: 'test',
    label: 'Test',
    character: { id: 'char', name: 'Char' },
    component: () => Promise.resolve({ default: defineComponent({ template: '<div />' }) }),
    reward: { type: 'money', amount: 0 },
    createIntro: () => [],
    createSuccess: () => [],
    createFailure: () => [],
  }),
}))

vi.mock('../src/stores/mainPanel', () => ({
  useMainPanelStore: () => ({ showVillage: vi.fn() }),
}))

vi.mock('../src/stores/zone', () => ({
  useZoneStore: () => ({ current: { id: 'zone', type: 'sauvage' } }),
}))

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    fadeToMusic: vi.fn(),
    playSfx: vi.fn(),
    playTypingSfx: vi.fn(),
  }),
}))

describe('miniGame restart', () => {
  it('restarts mini-game when phase returns to game', async () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    mini.select('test')

    mount(MiniGame, {
      global: {
        plugins: [
          createI18n({
            legacy: false,
            locale: 'fr',
            messages: {
              fr: {
                components: { panel: { MiniGame: { exit: 'Exit' } } },
              },
            },
          }),
        ],
        stubs: { LayoutTitledPanel: { template: '<div><slot /><slot name="footer" /></div>' } },
      },
    })

    await nextTick()
    mini.play()
    await nextTick()
    expect(startContent).toHaveBeenCalledTimes(1)

    mini.finish('lose')
    await nextTick()
    mini.play()
    await nextTick()
    expect(startContent).toHaveBeenCalledTimes(2)
  })
})
