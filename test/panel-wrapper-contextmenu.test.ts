import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import PanelWrapper from '../src/components/ui/PanelWrapper.vue'

// Mock UI store to avoid full Pinia setup
vi.mock('../src/stores/ui', () => ({
  useUIStore: () => ({ isMobile: ref(false) }),
}))

describe('panel wrapper context menu', () => {
  it('marks content as seen on right click without toggling panel', async () => {
    const badgeClick = vi.fn()
    const wrapper = mount(PanelWrapper, {
      props: { title: 'Title', badge: 1, badgeClick },
      slots: { default: '<div>Hello</div>' },
      global: { stubs: ['UiBadge'] },
    })

    const title = wrapper.find('.panel-wrapper > div')
    await title.trigger('contextmenu')
    expect(badgeClick).toHaveBeenCalledTimes(1)
    expect((wrapper.vm as any).opened).toBe(true)

    await title.trigger('click')
    await wrapper.vm.$nextTick()
    expect(badgeClick).toHaveBeenCalledTimes(1)
    expect((wrapper.vm as any).opened).toBe(false)
  })
})
