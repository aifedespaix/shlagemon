import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useMobileTabStore } from '../src/stores/mobileTab'

describe('mobile home button behaviour', () => {
  it('reopens last tab when toggled twice', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const mobile = useMobileTabStore()

    mobile.toggle('dex')
    expect(mobile.current).toBe('dex')

    mobile.toggleGame()
    expect(mobile.current).toBe('game')

    mobile.toggleGame(() => true)
    expect(mobile.current).toBe('dex')
  })

  it('does not reopen tab when predicate returns false', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const mobile = useMobileTabStore()

    mobile.toggle('inventory')
    mobile.toggleGame()

    mobile.toggleGame(() => false)
    expect(mobile.current).toBe('game')
  })
})
