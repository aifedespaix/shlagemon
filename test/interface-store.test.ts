import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useInterfaceStore } from '../src/stores/interface'

describe('interface store', () => {
  it('defaults to classic villages view', () => {
    setActivePinia(createPinia())
    const store = useInterfaceStore()
    expect(store.showVillagesOnMap).toBe(false)
  })

  it('updates map preference', () => {
    setActivePinia(createPinia())
    const store = useInterfaceStore()
    store.setShowVillagesOnMap(true)
    expect(store.showVillagesOnMap).toBe(true)
  })
})
