import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { createI18n } from 'vue-i18n'

import DialogBox from '../src/components/dialog/Box.vue'
import Dojo from '../src/components/panel/Dojo.vue'
import PoiDialogFlow from '../src/components/panel/PoiDialogFlow.vue'

vi.mock('../src/modules/toast', () => ({
  toast: { success: vi.fn() },
}))

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

vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({ shlagidolar: 0, addShlagidolar: vi.fn() }),
}))

vi.mock('../src/stores/shlagedex', () => ({
  useShlagedexStore: () => ({ shlagemons: [] }),
}))

const running = ref(false)
vi.mock('../src/stores/dojo', () => ({
  dojoTrainingCost: vi.fn(() => 0),
  useDojoStore: () => ({
    getJob: vi.fn((id: string) => (running.value ? { monId: id } : null)),
    remainingMs: vi.fn(() => 0),
    progressRatio: vi.fn(() => 0),
    startTraining: vi.fn(() => ({ ok: true })),
    completeIfDue: vi.fn(() => false),
    byMonId: {},
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
            Dojo: {
              title: 'Dojo',
              exit: 'Quitter',
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
  UiAdaptiveDisplayer: { template: '<div><slot /></div>' },
  UiCurrencyAmount: { template: '<span />' },
  UiModal: { template: '<div><slot /></div>' },
  ShlagemonQuickSelect: { template: '<div />' },
  UiNumberInput: { props: ['modelValue'], emits: ['update:modelValue', 'input'], template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value); $emit(\'input\', $event.target.value)" />' },
  ShlagemonImage: { template: '<div />' },
  CharacterImage: { template: '<div />' },
  UiTypingText: {
    props: ['text'],
    emits: ['finished'],
    mounted() {
      this.$emit('finished')
    },
    template: '<p class="typing">{{ text }}</p>',
  },
}

function mountDojo() {
  return mount(Dojo, {
    global: {
      plugins: [createI18nInstance()],
      stubs: globalStubs,
      components: { PoiDialogFlow, DialogBox },
    },
  })
}

const mon = {
  id: 'm1',
  base: { id: 'm1', name: 'm1', types: [] },
  rarity: 1,
}

describe('dojo dialog flow', () => {
  beforeEach(() => {
    running.value = false
  })

  it('transitions from intro to content to idle outro', async () => {
    const wrapper = mountDojo()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    expect(flow.vm.phase).toBe('intro')
    expect(flow.vm.introDialog[0].text).toBe('intro')
    flow.vm.phase = 'content'
    await nextTick()
    expect(flow.vm.phase).toBe('content')
    expect(wrapper.findComponent(DialogBox).exists()).toBe(false)
    ;(wrapper.vm as any).selected = mon
    await nextTick()
    ;(flow.vm as any).finish()
    await nextTick()
    expect(flow.vm.phase).toBe('outro')
    expect(flow.vm.outroDialog![0].text).toBe('idle')
  })

  it('shows running outro when a job is active', async () => {
    running.value = true
    const wrapper = mountDojo()
    await nextTick()
    const flow = wrapper.findComponent(PoiDialogFlow)
    await wrapper.findComponent(DialogBox).find('button').trigger('click')
    await nextTick()
    ;(wrapper.vm as any).selected = mon
    await nextTick()
    ;(flow.vm as any).finish()
    await nextTick()
    expect(flow.vm.outroDialog![0].text).toBe('running')
  })
})
