import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MiniGameShlagMind from '../src/components/minigame/MiniGameShlagMind.vue'

describe('shlagmind component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MiniGameShlagMind, { props: {} })
    expect(wrapper.exists()).toBe(true)
  })
})
