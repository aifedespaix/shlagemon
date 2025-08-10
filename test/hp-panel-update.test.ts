import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import BattleMonHPPanel from '../src/components/battle/mon/HPPanel.vue'

// Verify that HP values update immediately even under rapid successive changes.
describe('battleMonHPPanel', () => {
  it('displays the latest HP without lag', async () => {
    const wrapper = mount(BattleMonHPPanel, {
      props: { value: 100, max: 200 },
      global: {
        stubs: {
          UiProgressBar: true,
        },
      },
    })

    // Simulate rapid HP drops before the DOM flushes.
    wrapper.setProps({ value: 90 })
    wrapper.setProps({ value: 80 })
    await nextTick()
    expect(wrapper.text()).toContain('80')
  })
})
