import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import UiTabs from '../src/components/ui/Tabs.vue'

describe('uiTabs context menu', () => {
  it('marks tab content as seen on right click without switching tabs', async () => {
    const markAllSeen = vi.fn()
    const tabs = ref([
      { label: { text: 'A' }, component: defineComponent({ render: () => h('div') }) },
      { label: { text: 'B' }, component: defineComponent({ render: () => h('div') }), badge: 2, markAllSeen },
    ])
    const wrapper = mount(UiTabs, {
      props: { tabs: tabs.value },
      global: { directives: { tooltip: () => {} } },
    })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('contextmenu')
    expect(markAllSeen).toHaveBeenCalledTimes(1)
    expect(buttons[0].attributes('aria-selected')).toBe('true')
  })
})
