import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MiniGameShlagCards from '../src/components/minigame/MiniGameShlagCards.vue'

describe('shlagcards component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MiniGameShlagCards, { props: { vsAI: true } })
    expect(wrapper.exists()).toBe(true)
  })
})
