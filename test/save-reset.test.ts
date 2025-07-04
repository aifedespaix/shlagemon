import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDialogStore } from '../src/stores/dialog'
import { useSaveStore } from '../src/stores/save'
import { useZoneProgressStore } from '../src/stores/zoneProgress'

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

  it('should reset zone progress store', () => {
    setActivePinia(createPinia())
    const progress = useZoneProgressStore()
    const save = useSaveStore()

    progress.addWin('foo')
    expect(progress.getWins('foo')).toBe(1)

    save.reset()

    expect(progress.getWins('foo')).toBe(0)
  })
})
