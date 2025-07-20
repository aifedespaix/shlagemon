import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MiniGameShlagTaquin from '../src/components/minigame/MiniGameShlagTaquin.vue'

describe('taquin component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MiniGameShlagTaquin)
    expect(wrapper.exists()).toBe(true)
  })
})
