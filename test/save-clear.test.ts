import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useSaveStore } from '../src/stores/save'
import { PERSISTED_STORE_KEYS } from '../src/utils/save-code'

describe('useSaveStore.clearPersisted', () => {
  it('removes all persisted keys from localStorage', () => {
    setActivePinia(createPinia())
    const save = useSaveStore()
    for (const key of PERSISTED_STORE_KEYS)
      window.localStorage.setItem(key, 'foo')

    save.clearPersisted()

    for (const key of PERSISTED_STORE_KEYS)
      expect(window.localStorage.getItem(key)).toBeNull()
  })
})
