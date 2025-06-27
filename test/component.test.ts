import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from '../src/components/layout/Header.vue'

describe('component Header.vue', () => {
  it('should render', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
