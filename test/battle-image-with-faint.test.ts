import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BattleMonImageWithFaint from '../src/components/battle/mon/ImageWithFaint.vue'

describe('battleMonImageWithFaint', () => {
  it('applies flip class on wrapper', () => {
    const wrapper = mount(BattleMonImageWithFaint, {
      props: { id: 'a', alt: 'a', flipped: true },
      global: {
        stubs: { ShlagemonImage: { template: '<div />' } },
      },
    })
    expect(wrapper.classes()).toContain('-scale-x-100')
  })

  it('retains flip when fainted', () => {
    const wrapper = mount(BattleMonImageWithFaint, {
      props: { id: 'a', alt: 'a', flipped: true, fainted: true },
      global: {
        stubs: { ShlagemonImage: { template: '<div />', name: 'ShlagemonImage' } },
      },
    })
    expect(wrapper.classes()).toContain('-scale-x-100')
    expect(wrapper.find('.faint').exists()).toBe(true)
  })
})
