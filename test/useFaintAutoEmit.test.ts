import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import { useFaintAutoEmit } from '../src/composables/useFaintAutoEmit'

const visibility = ref<'visible' | 'hidden'>('visible')
vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual<typeof import('@vueuse/core')>('@vueuse/core')
  return { ...actual, useDocumentVisibility: () => visibility }
})

describe('useFaintAutoEmit', () => {
  it('triggers on animation end when fainted', () => {
    const fainted = ref(true)
    const { onAnimationEnd, onFaintEnd } = useFaintAutoEmit(fainted)
    const spy = vi.fn()
    onFaintEnd(spy)
    onAnimationEnd()
    expect(spy).toHaveBeenCalled()
  })

  it('triggers when document becomes hidden', async () => {
    const fainted = ref(true)
    const { onFaintEnd } = useFaintAutoEmit(fainted)
    const spy = vi.fn()
    onFaintEnd(spy)
    visibility.value = 'hidden'
    await nextTick()
    expect(spy).toHaveBeenCalled()
  })
})
