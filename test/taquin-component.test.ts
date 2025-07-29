import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Taquin from '../src/components/minigame/Taquin.vue'

describe('taquin component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Taquin)
    expect(wrapper.exists()).toBe(true)
  })
})
