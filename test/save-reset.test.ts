import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDialogStore } from '../src/stores/dialog'
import { useSaveStore } from '../src/stores/save'

describe('useSaveStore.reset', () => {
  it('should reset dialog store', () => {
    setActivePinia(createPinia())
    const dialog = useDialogStore()
    const save = useSaveStore()

    dialog.markDone('foo')
    expect(dialog.isDone('foo')).toBe(true)

    save.reset()

    expect(dialog.isDone('foo')).toBe(false)
  })
})
