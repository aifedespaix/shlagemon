import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

import AnimatedNumber from '../src/components/ui/AnimatedNumber.vue'

vi.mock('vue-number-animation', () => ({
  default: defineComponent({
    name: 'VueNumberAnimation',
    props: {
      from: Number,
      to: Number,
      duration: Number,
      format: Function,
      autoplay: Boolean,
      easing: String,
    },
    emits: ['finished'],
    template: '<span />',
  }),
}))

describe('animated number duration', () => {
  it('skips animation when updated too quickly', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
    const wrapper = mount(AnimatedNumber, { props: { value: 0, duration: 300 } })
    await nextTick()

    vi.setSystemTime(100)
    await wrapper.setProps({ value: 10 })
    await nextTick()
    let comp = wrapper.findComponent({ name: 'VueNumberAnimation' })
    expect(comp.props('duration')).toBe(0)

    vi.setSystemTime(400)
    await wrapper.setProps({ value: 20 })
    await nextTick()
    comp = wrapper.findComponent({ name: 'VueNumberAnimation' })
    expect(comp.props('duration')).toBeCloseTo(0.3)
    expect(comp.props('from')).toBe(10)
    expect(comp.props('to')).toBe(20)
  })
})
