import type { Directive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import UiTabs from '../src/components/ui/Tabs.vue'

const tooltipDirective: Directive = {
  mounted(el, binding) {
    el.setAttribute('data-tooltip', String(binding.value))
  },
}

describe('uiTabs icons-only tooltip', () => {
  it('uses label text as tooltip when none provided and icons-only', () => {
    const tabs = [
      {
        label: { text: 'Save', icon: 'i-carbon-save' },
        component: defineComponent({ render: () => h('div') }),
      },
    ] as const

    const wrapper = mount(UiTabs, {
      props: { tabs, iconsOnly: true },
      global: { directives: { tooltip: tooltipDirective } },
    })

    const button = wrapper.find('button')
    expect(button.attributes('data-tooltip')).toBe('Save')
    expect(button.text()).toBe('')
  })
})
