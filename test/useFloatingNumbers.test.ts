import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useFloatingNumbers } from '../src/composables/useFloatingNumbers'

describe('useFloatingNumbers', () => {
  it('creates entries when hp changes', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => cb(0))
    const hp = ref(100)
    const visible = ref(true)
    const { entries } = useFloatingNumbers(hp, visible)
    hp.value = 80
    await nextTick()
    expect(entries.value.length).toBe(1)
  })

  it('clears when not visible', () => {
    const hp = ref(100)
    const visible = ref(true)
    const { entries } = useFloatingNumbers(hp, visible)
    hp.value = 90
    visible.value = false
    expect(entries.value.length).toBe(0)
  })
})
