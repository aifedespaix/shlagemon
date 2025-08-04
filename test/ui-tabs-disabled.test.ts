import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import UiTabs from '../src/components/ui/Tabs.vue'

describe('uiTabs disabled behaviour', () => {
  it('switches to first enabled tab when current is disabled', async () => {
    const tabs = ref([
      { label: { text: 'A' }, component: defineComponent({ render: () => h('div') }) },
      { label: { text: 'B' }, component: defineComponent({ render: () => h('div') }) },
    ])
    const wrapper = mount(UiTabs, {
      props: { tabs: tabs.value },
      global: { directives: { tooltip: () => {} } },
    })
    tabs.value = [
      { ...tabs.value[0], disabled: true },
      { ...tabs.value[1] },
    ]
    await wrapper.setProps({ tabs: tabs.value })
    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('aria-selected')).toBe('true')
  })
})
