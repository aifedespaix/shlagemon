import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Battleship from '../src/components/minigame/Battleship.vue'

describe('battleship component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Battleship)
    expect(wrapper.exists()).toBe(true)
  })
})
