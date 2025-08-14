import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BoxModal from '../src/components/egg/BoxModal.vue'
import { useEggBoxStore } from '../src/stores/eggBox'

vi.mock('../src/stores/eggMonsModal', () => ({
  useEggMonsModalStore: () => ({ open: vi.fn() }),
}))

describe('egg box modal', () => {
  it('skips breeding entries with unknown shlagemon', () => {
    const box = useEggBoxStore()
    box.isModalOpen = true
    box.breeding = [
      {
        id: 'unknown-egg',
        monId: 'missing-mon',
        type: 'feu',
      },
    ] as any

    const wrapper = mount(BoxModal)

    expect(wrapper.vm.breedingEggs).toHaveLength(0)
  })
})
