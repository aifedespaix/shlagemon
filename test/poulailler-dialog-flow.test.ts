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

const mockEggStore = {
  incubator: [] as any[],
  startIncubation: vi.fn(),
  hatchEgg: vi.fn(),
  isReady: vi.fn(() => false),
}

vi.mock('../src/stores/egg', () => ({
  useEggStore: () => mockEggStore,
}))

const mockEggBoxStore = { eggs: {}, breeding: [] as any[] }

vi.mock('../src/stores/eggBox', () => ({
  useEggBoxStore: () => mockEggBoxStore,
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
  beforeEach(() => {
    mockEggBoxStore.breeding = []
    mockEggStore.incubator = []
    mockEggStore.isReady.mockReturnValue(false)
    mockEggStore.hatchEgg.mockReset()
  })

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

  it('uses running outro when eggs are incubating', async () => {
    mockEggStore.incubator.push({ id: 1 } as any)
    const wrapper = mountPoulailler()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    await wrapper.findComponent(DialogBox).find('button').trigger('click')
    await nextTick()
    ;(flow.vm as any).finish()
    await nextTick()
    expect(flow.vm.outroDialog![0].text).toBe('running')
  })

  it('hatching a ready egg does not exit the panel', async () => {
    mockEggStore.incubator.push({ id: 1, type: 'feu', hatchesAt: 0 } as any)
    mockEggStore.isReady.mockReturnValue(true)
    mockEggStore.hatchEgg.mockReturnValue({} as any)
    const wrapper = mountPoulailler()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    flow.vm.phase = 'content'
    await nextTick()
    ;(wrapper.vm as any).hatch(1)
    await nextTick()
    expect(flow.vm.phase).toBe('content')
    expect(mockEggStore.hatchEgg).toHaveBeenCalledWith(1)
  })

  it('ignores breeding eggs with unknown mon id', () => {
    mockEggBoxStore.breeding.push({ id: 'egg1', monId: 'missing-mon', type: 'feu', rarity: 1 })
    const wrapper = mountPoulailler()
    expect((wrapper.vm as any).breedingEggs.length).toBe(0)
  })
})
