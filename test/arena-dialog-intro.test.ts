import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDialogStore } from '../src/stores/dialog'

/**
 * Ensures arena intro flag persists across arena dialog resets.
 */
describe('arena welcome intro persistence', () => {
  it('does not reset intro flag', () => {
    setActivePinia(createPinia())
    const dialog = useDialogStore()

    dialog.markDone('arenaWelcomeIntro')
    expect(dialog.isDone('arenaWelcomeIntro')).toBe(true)

    dialog.resetArenaDialogs()
    expect(dialog.isDone('arenaWelcomeIntro')).toBe(true)
    expect(dialog.isDone('arenaWelcome')).toBe(false)
  })
})
