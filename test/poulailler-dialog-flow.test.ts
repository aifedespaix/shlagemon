import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import DialogBox from '../src/components/dialog/Box.vue'
import PoiDialogFlow from '../src/components/panel/PoiDialogFlow.vue'
import Poulailler from '../src/components/panel/Poulailler.vue'

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    fadeToMusic: vi.fn(),
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

vi.mock('../src/stores/egg', () => ({
  useEggStore: () => ({
    incubator: [],
    startIncubation: vi.fn(),
    hatchEgg: vi.fn(),
    isReady: vi.fn(() => false),
  }),
}))

vi.mock('../src/stores/eggBox', () => ({
  useEggBoxStore: () => ({ eggs: {} }),
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
            Poulailler: {
              title: 'Poulailler',
              exit: 'Quitter',
              intro: 'intro',
              outro: { running: 'running', idle: 'idle' },
              yourEggs: 'Vos œufs',
              incubator: 'Incubateur',
              noEggBox: 'Aucun',
              emptySlot: 'Vide',
              tapToHatch: 'Tap',
              ready: 'Prêt',
              a11y: { showSpecies: 'spec', incubateEgg: 'incubate', eggReady: 'ready', eggProgress: 'progress' },
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
  UiModal: { template: '<div><slot /></div>' },
  EggHatchModal: { template: '<div />' },
  EggMonsModal: { template: '<div />' },
  CharacterImage: { template: '<div />' },
  UiTypingText: {
    props: ['text'],
    emits: ['finished'],
    mounted() {
      this.$emit('finished')
    },
    template: '<p>{{ text }}</p>',
  },
}

function mountPoulailler() {
  return mount(Poulailler, {
    global: {
      plugins: [createI18nInstance()],
      stubs: globalStubs,
      components: { PoiDialogFlow, DialogBox },
    },
  })
}

describe('poulailler dialog flow', () => {
  beforeEach(() => {})

  it('transitions from intro to content to idle outro', async () => {
    const wrapper = mountPoulailler()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    expect(flow.vm.phase).toBe('intro')
    expect(flow.vm.introDialog[0].text).toBe('intro')
    flow.vm.phase = 'content'
    await nextTick()
    expect(flow.vm.phase).toBe('content')
    ;(flow.vm as any).finish()
    await nextTick()
    expect(flow.vm.phase).toBe('outro')
    expect(flow.vm.outroDialog![0].text).toBe('idle')
  })

  it('uses running outro when result is provided', async () => {
    const wrapper = mountPoulailler()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    await wrapper.findComponent(DialogBox).find('button').trigger('click')
    await nextTick()
    ;(flow.vm as any).finish('hatched')
    await nextTick()
    expect(flow.vm.outroDialog![0].text).toBe('running')
  })
})
