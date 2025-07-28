import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MiniGamePuissance4 from '../src/components/minigame/MiniGamePuissance4.vue'
import { COLS, ROWS } from '../src/composables/useConnectFour'

describe('connect four component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MiniGamePuissance4)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders correct number of cells', () => {
    const wrapper = mount(MiniGamePuissance4)
    const cells = wrapper.findAll('.aspect-square')
    expect(cells.length).toBe(ROWS * COLS)
  })
})
