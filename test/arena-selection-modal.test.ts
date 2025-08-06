import type { DexShlagemon } from '../src/type/shlagemon'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { createI18n } from 'vue-i18n'
import SelectionModal from '../src/components/arena/SelectionModal.vue'
import { shlagemonTypes } from '../src/data/shlagemons-type'

function createMon(id: string, level: number): DexShlagemon {
  return {
    id,
    base: {
      id,
      name: id,
      description: '',
      types: [shlagemonTypes.normal],
      speciality: 'evolution0',
    },
    baseStats: { hp: 10, attack: 10, defense: 10, smelling: 10 },
    captureDate: '',
    captureCount: 1,
    lvl: level,
    xp: 0,
    rarity: 1,
    sex: 'male',
    isShiny: false,
    hpCurrent: 10,
    allowEvolution: true,
    hp: 10,
    attack: 10,
    defense: 10,
    smelling: 10,
  }
}

function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        components: {
          arena: {
            SelectionModal: {
              title: 'Choose a Shlagemon against {name}',
              confirm: 'Confirm',
            },
            EnemyStats: {
              hp: 'HP',
              attack: 'Attack',
              defense: 'Defense',
              smell: 'Smell',
              level: 'lvl {n}',
            },
          },
          shlagemon: { RarityInfo: { tooltip: '' } },
        },
      },
    },
  })
}

const globalStubs = {
  ShlagemonQuickSelect: { name: 'ShlagemonQuickSelect', template: '<div />' },
  ShlagemonImage: true,
  ShlagemonRarityInfo: { name: 'ShlagemonRarityInfo', template: '<div />' },
  RarityInfo: { name: 'RarityInfo', template: '<div />' },
  ShlagemonType: true,
  UiButton: { name: 'UiButton', template: '<button><slot /></button>' },
}

const globalDirectives = { tooltip: () => {} }

function mountModal(props: Record<string, unknown>) {
  return mount(SelectionModal, {
    props,
    global: {
      plugins: [createI18nInstance()],
      stubs: globalStubs,
      directives: globalDirectives,
    },
  })
}

describe('arena selection modal', () => {
  it('keeps modal open until confirmation', async () => {
    const enemy = createMon('enemy', 5)
    const candidate = createMon('candidate', 7)

    const wrapper = mountModal({ mon: enemy, selected: [] })
    ;(wrapper.vm as unknown as { candidate: DexShlagemon | null }).candidate = candidate
    await nextTick()

    expect(wrapper.text()).toContain('lvl 7')
    expect(wrapper.emitted('select')).toBeUndefined()

    ;(wrapper.vm as unknown as { confirm: () => void }).confirm()
    expect(wrapper.emitted('select')?.[0]).toEqual([candidate])
  })

  it('shows the initial selection and updates on change', async () => {
    const enemy = createMon('enemy', 5)
    const first = createMon('first', 6)
    const second = createMon('second', 8)

    const wrapper = mountModal({ mon: enemy, selected: [], initial: first })
    expect(wrapper.text()).toContain('lvl 6')

    await wrapper.setProps({ initial: second })
    await nextTick()
    expect(wrapper.text()).toContain('lvl 8')
  })
})
