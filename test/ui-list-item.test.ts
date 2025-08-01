import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UiListItem from '../src/components/ui/ListItem.vue'

describe('uiListItem', () => {
  it('renders slots and active state', () => {
    const wrapper = mount(UiListItem, {
      props: { active: true },
      slots: {
        default: '<span class="content">content</span>',
        left: '<span class="left">L</span>',
        right: '<span class="right">R</span>',
      },
    })
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.left').exists()).toBe(true)
    expect(wrapper.find('.right').exists()).toBe(true)
    expect(wrapper.classes().some(c => c.includes('ring'))).toBe(true)
  })

  it('handles disabled state', () => {
    const wrapper = mount(UiListItem, { props: { disabled: true } })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })
})
