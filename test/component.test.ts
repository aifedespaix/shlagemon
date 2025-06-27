import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import Header from '../src/components/layout/Header.vue'

describe('component Header.vue', () => {
  it('should render', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(Header, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
