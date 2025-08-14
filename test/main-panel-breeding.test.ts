import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import DialogBox from '../src/components/dialog/Box.vue'
import Breeding from '../src/components/panel/Breeding.vue'
import PoiDialogFlow from '../src/components/panel/PoiDialogFlow.vue'
import { useMainPanelStore } from '../src/stores/mainPanel'

vi.mock('../src/components/ui/TypingText.vue', () => ({
  default: {
    name: 'UiTypingText',
    props: ['text'],
    emits: ['finished'],
    mounted() {
      this.$emit('finished')
    },
    template: '<p class="typing">{{ text }}</p>',
  },
}))

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    fadeToMusic: vi.fn(),
    playSfx: vi.fn(),
    playTypingSfx: vi.fn(),
  }),
}))

vi.mock('../src/stores/zone', () => ({
  useZoneStore: () => ({
    current: { id: 'zone', type: 'sauvage' },
  }),
}))

vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({
    shlagidolar: 0,
    addShlagidolar: vi.fn(),
  }),
}))

vi.mock('../src/stores/breeding', () => ({
  useBreedingStore: () => ({
    isRunning: vi.fn(() => false),
    getJob: vi.fn(),
    remainingMs: vi.fn(),
    progress: vi.fn(),
    start: vi.fn(),
    collectEgg: vi.fn(),
    completeIfDue: vi.fn(),
  }),
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
              title: 'Élevage',
              exit: 'Quitter l\'élevage',
              intro: 'intro',
              outro: { running: 'running', idle: 'idle' },
              during: { typing: 'typing' },
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
  UiTypingText: { props: ['text'], template: '<p class="typing">{{ text }}</p>' },
  UiAdaptiveDisplayer: { name: 'UiAdaptiveDisplayer', template: '<div><slot /></div>' },
  UiCurrencyAmount: { template: '<span />' },
  UiModal: { template: '<div><slot /></div>' },
  ShlagemonQuickSelect: { template: '<div />' },
  UiImageByBackground: { props: ['src'], template: '<img :src="src" />' },
}

function mountBreeding() {
  return mount(Breeding, {
    global: {
      plugins: [createI18nInstance(), createPinia()],
      stubs: globalStubs,
      components: { PoiDialogFlow, DialogBox },
    },
  })
}

/** Ensure the breeding panel can be opened through the main panel store. */
describe('main panel breeding', () => {
  it('switches current panel to breeding', () => {
    setActivePinia(createPinia())
    const panel = useMainPanelStore()
    panel.showBreeding()
    expect(panel.current).toBe('breeding')
  })

  it('renders two columns with Norman image and typing animation', async () => {
    const wrapper = mountBreeding()
    const flow = wrapper.findComponent(PoiDialogFlow)
    ;(flow.vm as any).phase = 'content'
    await nextTick()
    const grids = wrapper.findAll('.area-grid')
    expect(grids.length).toBeGreaterThan(1)
    expect(wrapper.html()).toContain('/characters/norman')
    expect(wrapper.find('.typing').exists()).toBe(true)
  })
})
