import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import DialogBox from '../src/components/dialog/Box.vue'
import Breeding from '../src/components/panel/Breeding.vue'
import PoiDialogFlow from '../src/components/panel/PoiDialogFlow.vue'

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

vi.mock('../src/stores/mainPanel', () => ({
  useMainPanelStore: () => ({
    showVillage: vi.fn(),
  }),
}))

vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({
    shlagidolar: 0,
    addShlagidolar: vi.fn(),
  }),
}))

const getJob = vi.fn(() => null)
vi.mock('../src/stores/breeding', () => ({
  useBreedingStore: () => ({
    byType: {},
    getJob,
    remainingMs: vi.fn(),
    progress: vi.fn(),
    start: vi.fn(),
    startSelected: vi.fn(),
    collectEgg: vi.fn(),
    completeIfDue: vi.fn(),
    ensureSelectionFromJobs: vi.fn(),
    selectedMon: null,
    activeEggType: null,
    typingText: 'Confie moi un de tes Shlagémons, je vais l\'ensemencer avec tendresse et amour !',
    get activeJob() {
      return getJob()
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

const mon = {
  id: 'm1',
  base: { id: 'm1', name: 'm1', description: '', types: [{ id: 'feu' }], speciality: 'evolution0' },
  baseStats: { hp: 1, attack: 1, defense: 1, smelling: 1 },
  captureDate: '',
  captureCount: 1,
  lvl: 1,
  xp: 0,
  rarity: 1,
  sex: 'male',
  isShiny: false,
  hpCurrent: 1,
  allowEvolution: true,
  hp: 1,
  attack: 1,
  defense: 1,
  smelling: 1,
}

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
              intro: 'Bonjour, je peux m\'occuper d\'ensemencer tes Shlagémons, je suis un pro pour faire ça, tu n\'as qu\'à m\'en confier un !',
              outro: {
                running: 'Je m\'occupe tout de suite de la reproduction, tu pourras repasser dans très peu de temps.',
                idle: 'Reviens très vite, j\'ai hâte de m\'occuper de tes Shlagémons.',
              },
              during: {
                unselected: 'Confie moi un de tes Shlagémons, je vais l\'ensemencer avec tendresse et amour !',
                selected: ['Ho ! J\'adore ton {shlagemon_name}, je vais pouvoir l\'ensemencer bien fort celui là !'],
                completed: ['ça y est je lui ai tout mis dedans, il a sorti un oeuf !'],
              },
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
  UiTypingText: { props: ['text'], template: '<p class="typing">{{ text }}</p>' },
  UiAdaptiveDisplayer: { template: '<div><slot /></div>' },
  UiCurrencyAmount: { template: '<span />' },
  UiModal: { template: '<div><slot /></div>' },
  ShlagemonSelectModal: { template: '<div />' },
  UiImageByBackground: { props: ['src'], template: '<img :src="src" />' },
}

function mountBreeding() {
  return mount(Breeding, {
    global: {
      plugins: [createI18nInstance()],
      stubs: globalStubs,
      components: { PoiDialogFlow, DialogBox },
    },
  })
}

describe('breeding dialog flow', () => {
  beforeEach(() => {
    getJob.mockReturnValue(null)
  })

  it('renders intro dialog', async () => {
    const wrapper = mountBreeding()
    await nextTick()
    expect(wrapper.findComponent(DialogBox).text()).toContain(
      'Bonjour, je peux m\'occuper d\'ensemencer tes Shlagémons',
    )
  })

  it('displays typed message during content phase', async () => {
    const wrapper = mountBreeding()
    await nextTick()
    ;(wrapper.findComponent(PoiDialogFlow).vm as any).phase = 'content'
    await nextTick()
    expect(wrapper.text()).toContain(
      'Confie moi un de tes Shlagémons, je vais l\'ensemencer avec tendresse et amour !',
    )
  })

  it('launches breeding and closes intro before showing content', async () => {
    const wrapper = mountBreeding()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    expect(wrapper.findComponent(DialogBox).exists()).toBe(true)
    ;(flow.vm as any).phase = 'content'
    await nextTick()
    expect(wrapper.findComponent(DialogBox).exists()).toBe(false)
    expect(wrapper.text()).toContain(
      'Confie moi un de tes Shlagémons, je vais l\'ensemencer avec tendresse et amour !',
    )
  })

  it('completes a job and shows running outro message', async () => {
    getJob.mockReturnValue({ status: 'running' })
    const wrapper = mountBreeding()
    await nextTick()
    // Skip intro
    ;(wrapper.findComponent(PoiDialogFlow).vm as any).phase = 'content'
    ;(wrapper.vm as any).selected = mon
    await nextTick()
    ;(wrapper.findComponent(PoiDialogFlow).vm as any).finish()
    await nextTick()
    expect(wrapper.findComponent(DialogBox).text()).toContain(
      'Je m\'occupe tout de suite de la reproduction, tu pourras repasser dans très peu de temps.',
    )
  })

  describe('outro dialog', () => {
    it('shows idle outro when no job is running', async () => {
      getJob.mockReturnValue(null)
      const wrapper = mountBreeding()
      ;(wrapper.vm as any).selected = mon
      await nextTick()
      const flow = wrapper.findComponent(PoiDialogFlow)
      ;(flow.vm as any).phase = 'content'
      await nextTick()
      ;(flow.vm as any).finish()
      await nextTick()
      expect(wrapper.findComponent(DialogBox).text()).toContain(
        'Reviens très vite, j\'ai hâte de m\'occuper de tes Shlagémons.',
      )
    })
  })
})
