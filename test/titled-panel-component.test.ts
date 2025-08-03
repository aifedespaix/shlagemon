import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LayoutTitledPanel from '../src/components/layout/TitledPanel.vue'

describe('layoutTitledPanel', () => {
  it('renders footer by default', () => {
    const wrapper = mount(LayoutTitledPanel, {
      props: {
        title: 'Title',
        exitText: 'Exit',
      },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('hides footer when showFooter is false', () => {
    const wrapper = mount(LayoutTitledPanel, {
      props: {
        title: 'Title',
        exitText: 'Exit',
        showFooter: false,
      },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
