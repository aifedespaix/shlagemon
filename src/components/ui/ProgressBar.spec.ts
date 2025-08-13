import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ProgressBar from './ProgressBar.vue'

describe('ui ProgressBar', () => {
  it('reaches zero promptly when value drops to zero', async () => {
    vi.useFakeTimers()
    const originalRaf = globalThis.requestAnimationFrame
    const originalCaf = globalThis.cancelAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16))
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))

    const wrapper = mount(ProgressBar, { props: { value: 100, max: 100 } })

    // Allow initial rAF
    await vi.advanceTimersByTimeAsync(16)

    await wrapper.setProps({ value: 0 })

    // Advance enough time for the bar to drain
    await vi.advanceTimersByTimeAsync(500)

    const bar = wrapper.get('div > div')
    expect(bar.attributes('style')).toContain('scaleX(0)')

    vi.useRealTimers()
    globalThis.requestAnimationFrame = originalRaf
    globalThis.cancelAnimationFrame = originalCaf
    vi.unstubAllGlobals()
  })
})
