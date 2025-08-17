import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import DialogBox from '../src/components/dialog/Box.vue'
import Breeding from '../src/components/panel/Breeding.vue'
import Dojo from '../src/components/panel/Dojo.vue'
import PoiDialogFlow from '../src/components/panel/PoiDialogFlow.vue'
import Poulailler from '../src/components/panel/Poulailler.vue'
import { norman } from '../src/data/characters/norman'
import { useAudioStore } from '../src/stores/audio'

const fadeToMusic = vi.fn()
vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    fadeToMusic,
    playSfx: vi.fn(),
    playTypingSfx: vi.fn(),
  }),
}))

vi.mock('../src/stores/zone', () => ({
  useZoneStore: () => ({ current: { id: 'zone', type: 'sauvage' } }),
}))

vi.mock('../src/stores/mainPanel', () => ({
  useMainPanelStore: () => ({ showVillage: vi.fn() }),
}))

vi.mock('../src/modules/toast', () => ({
  toast: { success: vi.fn() },
}))

// Panel specific store mocks
vi.mock('../src/stores/breeding', () => ({
  useBreedingStore: () => ({
    byType: {},
    getJob: vi.fn(),
    remainingMs: vi.fn(),
    progress: vi.fn(),
    start: vi.fn(),
    collectEgg: vi.fn(),
    completeIfDue: vi.fn(),
  }),
}))

vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({ shlagidolar: 0 }),
}))

vi.mock('../src/stores/dojo', () => ({
  dojoTrainingCost: vi.fn(() => 0),
  useDojoStore: () => ({
    getJob: vi.fn(),
    remainingMs: vi.fn(),
    progressRatio: vi.fn(),
    startTraining: vi.fn(),
    completeIfDue: vi.fn(),
    byMonId: {},
  }),
}))

vi.mock('../src/stores/shlagedex', () => ({
  useShlagedexStore: () => ({ shlagemons: [] }),
}))

vi.mock('../src/stores/egg', () => ({
  useEggStore: () => ({
    incubator: [],
    startIncubation: vi.fn(),
    hatchEgg: vi.fn(),
    isReady: vi.fn(() => false),
  }),
}))

vi.mock('../src/stores/eggBox', () => ({
  useEggBoxStore: () => ({ eggs: {}, breeding: [] }),
}))

vi.mock('../src/stores/eggMonsModal', () => ({
  useEggMonsModalStore: () => ({ open: vi.fn() }),
}))

vi.mock('../src/stores/eggHatchModal', () => ({
  useEggHatchModalStore: () => ({ open: vi.fn() }),
}))

function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'fr',
    messages: {
      fr: {
        ui: { Info: { ok: 'Ok' } },
        components: {
          panel: {
            Breeding: {
              title: 'Breeding',
              exit: 'Exit',
              intro: 'intro',
              outro: { running: 'running', idle: 'idle' },
              during: { typing: '' },
            },
            Dojo: {
              title: 'Dojo',
              exit: 'Exit',
              intro: 'intro',
              outro: { running: 'running', idle: 'idle' },
            },
            Poulailler: {
              title: 'Poulailler',
              exit: 'Exit',
              intro: 'intro',
              outro: { running: 'running', idle: 'idle' },
            },
          },
        },
      },
    },
  })
}

const globalStubs = {
  LayoutTitledPanel: { template: '<div><slot /><slot name="footer" /></div>' },
  UiButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  CharacterImage: { template: '<div />' },
  UiTypingText: {
    props: ['text'],
    emits: ['finished'],
    mounted() { this.$emit('finished') },
    template: '<p>{{ text }}</p>',
  },
}

beforeEach(() => {
  fadeToMusic.mockReset()
})

describe('panel dialog music', () => {
  it.each([
    ['Breeding', Breeding],
    ['Dojo', Dojo],
    ['Poulailler', Poulailler],
  ])('does not play character track in %s panel', async (_, Comp) => {
    mount(Comp, {
      global: {
        plugins: [createI18nInstance()],
        stubs: globalStubs,
        components: { PoiDialogFlow, DialogBox },
      },
    })
    await nextTick()
    expect(fadeToMusic).not.toHaveBeenCalled()
  })

  it('keeps breeding music when the panel opens', async () => {
    const audio = useAudioStore()
    audio.fadeToMusic('/audio/musics/breeding.ogg')
    expect(fadeToMusic).toHaveBeenCalledWith('/audio/musics/breeding.ogg')
    fadeToMusic.mockClear()

    mount(Breeding, {
      global: {
        plugins: [createI18nInstance()],
        stubs: globalStubs,
        components: { PoiDialogFlow, DialogBox },
      },
    })
    await nextTick()
    expect(fadeToMusic).not.toHaveBeenCalled()
  })

  it('plays character track by default in dialog flow', async () => {
    mount(PoiDialogFlow, {
      props: {
        title: 'Mini',
        exitText: 'Exit',
        character: norman,
        createIntro: (start: () => void) => [{
          id: 'intro',
          text: 'hi',
          responses: [{ label: 'ok', type: 'primary', action: start }],
        }],
      },
      global: {
        plugins: [createI18nInstance()],
        stubs: globalStubs,
        components: { DialogBox },
      },
    })
    await nextTick()
    expect(fadeToMusic).toHaveBeenCalled()
    expect(fadeToMusic.mock.calls[0][0]).toContain('/audio/musics/character/')
  })
})
