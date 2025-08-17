/* eslint-disable import/first */
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const playTypingSfx = vi.fn()
vi.mock('~/stores/audio', () => ({
  useAudioStore: () => ({ playTypingSfx }),
}))

import TypingText from './TypingText.vue'

describe('ui TypingText', () => {
  beforeEach(() => {
    playTypingSfx.mockReset()
  })

  it('types characters at configured speed and plays SFX once per character', async () => {
    vi.useFakeTimers()
    const wrapper = mount(TypingText, { props: { text: 'abc', speed: 10 } })

    expect(wrapper.text()).toBe('a')
    expect(playTypingSfx).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(10)
    expect(wrapper.text()).toBe('ab')
    expect(playTypingSfx).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(10)
    expect(wrapper.text()).toBe('abc')
    expect(playTypingSfx).toHaveBeenCalledTimes(3)

    vi.useRealTimers()
  })

  it('cancels pending timer when text changes', async () => {
    vi.useFakeTimers()
    const wrapper = mount(TypingText, { props: { text: 'ab', speed: 10 } })

    expect(playTypingSfx).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ text: 'x' })
    expect(wrapper.text()).toBe('x')
    expect(playTypingSfx).toHaveBeenCalledTimes(2)

    await vi.runAllTimersAsync()
    expect(playTypingSfx).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })
})
