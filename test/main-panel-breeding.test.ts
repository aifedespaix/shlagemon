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
    shlagidiamond: 0,
    shlagpur: 0,
    addShlagidolar: vi.fn(),
    addShlagidiamond: vi.fn(),
    addShlagpur: vi.fn(),
  }),
}))

vi.mock('../src/stores/breeding', () => ({
  useBreedingStore: () => ({
    isRunning: vi.fn(() => false),
    getJob: vi.fn(),
    remainingMs: vi.fn(),
    progress: vi.fn(),
    start: vi.fn(),
    startSelected: vi.fn(),
    collectEgg: vi.fn(),
    completeIfDue: vi.fn(),
    ensureSelectionFromJobs: vi.fn(),
    byType: {},
    selectedMon: null,
    activeEggType: null,
    typingText: '',
    get activeJob() {
      return this.getJob?.()
    },
    get isRunningSelected() {
      return this.activeJob?.status === 'running'
    },
    selectedProgressPercent: 0,
    selectedRemainingLabel: '',
    selectedCost: 0,
    durationMin: 0,
    canStartSelected: true,
    canCollectSelected: false,
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
              during: { unselected: 'typing', selected: ['sel'], completed: ['done'] },
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
  ShlagemonSelectModal: { template: '<div />' },
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
    expect(grids.length).toBe(1)
    expect(wrapper.html()).toContain('/characters/norman')
    expect(wrapper.find('.typing').exists()).toBe(true)
  })
})
