import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Slider from './Slider.vue'

describe('ui Slider', () => {
  it('updates value when using increment and decrement buttons', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 5, min: 0, max: 10 },
    })

    const controls = wrapper.findAll('button').filter(btn => ['−', '+'].includes(btn.text()))
    const minus = controls.find(btn => btn.text() === '−')!
    const plus = controls.find(btn => btn.text() === '+')!

    expect(minus.attributes('type')).toBe('button')
    expect(plus.attributes('type')).toBe('button')

    await minus.trigger('click')
    await plus.trigger('click')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.map(args => args[0])).toEqual([4, 5])
  })
})
