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

  it('scales damage relative to average', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => cb(0))
    const hp = ref(200)
    const visible = ref(true)
    const { entries } = useFloatingNumbers(hp, visible)
    hp.value = 180
    await nextTick()
    expect(entries.value[0].scale).toBe(1)
    hp.value = 120
    await nextTick()
    expect(entries.value[1].scale).toBeGreaterThan(1)
    hp.value = 110
    await nextTick()
    expect(entries.value[2].scale).toBe(1)
  })
})
