import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useLevelUpAnimation } from '../src/composables/useLevelUpAnimation'

describe('useLevelUpAnimation', () => {
  it('pulses on level increase', async () => {
    vi.useFakeTimers()
    const level = ref(1)
    const { pulsing } = useLevelUpAnimation(level)
    level.value = 2
    await nextTick()
    expect(pulsing.value).toBe(true)
    vi.advanceTimersByTime(600)
    expect(pulsing.value).toBe(false)
  })
})
