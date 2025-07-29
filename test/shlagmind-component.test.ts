import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MasterMind from '../src/components/minigame/MasterMind.vue'

describe('shlagmind component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MasterMind, { props: {} })
    expect(wrapper.exists()).toBe(true)
  })
})
