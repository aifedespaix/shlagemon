import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MiniGamePuissance4 from '../src/components/minigame/MiniGamePuissance4.vue'

describe('connect four component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MiniGamePuissance4)
    expect(wrapper.exists()).toBe(true)
  })
})
