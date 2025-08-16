import type { EggType } from '../src/stores/egg'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import Breeding from '../src/components/panel/Breeding.vue'
import { salamiches } from '../src/data/shlagemons/salamiches'
import { useBreedingStore } from '../src/stores/breeding'
import { useGameStore } from '../src/stores/game'
import { useShlagedexStore } from '../src/stores/shlagedex'

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

const stubs = {
  PanelPoiDialogFlow: { template: '<div><slot /><slot name="footer" /></div>' },
  UiButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  UiAdaptiveDisplayer: { template: '<div><slot /></div>' },
  BreedingMonPreview: { props: ['mon', 'eggType'], emits: ['select', 'change'], template: '<div />' },
  BreedingCharacter: { props: ['character', 'typingText'], template: '<div />' },
  BreedingWorking: { props: ['isRunning', 'progress', 'remainingLabel'], template: '<div />' },
  BreedingInfos: { props: ['selected', 'cost', 'durationMin'], template: '<div />' },
  ShlagemonSelectModal: { template: '<div />' },
  UiCurrencyAmount: { template: '<span />' },
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
              intro: 'intro',
              outro: { running: 'outro', idle: 'outro' },
              during: {
                unselected: 'unselected',
                selected: ['selected'],
                completed: ['completed'],
              },
              cta: {
                payAndStart: 'Start',
                collectEgg: 'Collect',
              },
            },
          },
        },
      },
    },
  })
}

describe('breeding panel preselection', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('selects current shlagemon when a job exists', async () => {
    const game = useGameStore()
    const dex = useShlagedexStore()
    const breeding = useBreedingStore()
    game.shlagidolar = 1_000_000

    const mon = dex.createShlagemon(salamiches)
    const type = mon.base.types[0].id as EggType
    expect(breeding.start(mon)).toBe(true)
    const job = breeding.getJob(type)
    if (job)
      job.status = 'completed'

    const wrapper = mount(Breeding, {
      global: {
        plugins: [createI18nInstance()],
        stubs,
      },
    })

    await nextTick()
    expect((wrapper.vm as any).selected?.id).toBe(mon.id)
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
