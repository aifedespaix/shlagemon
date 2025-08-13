import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useDialogStore } from '../src/stores/dialog'
import { useMiniGameStore } from '../src/stores/miniGame'
import { usePlayerStore } from '../src/stores/player'
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

  it('should reset player capture level cap', () => {
    setActivePinia(createPinia())
    const player = usePlayerStore()
    const save = useSaveStore()

    player.captureLevelCap = 50
    expect(player.captureLevelCap).toBe(50)

    save.reset()

    expect(player.captureLevelCap).toBe(19)
  })

  it('should reset mini game store', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const save = useSaveStore()

    mini.select('tictactoe')
    mini.finish('win')

    expect(mini.currentId).toBe('tictactoe')
    expect(mini.phase).toBe('success')
    expect(mini.wins).toBe(1)

    save.reset()

    expect(mini.currentId).toBeNull()
    expect(mini.phase).toBe('intro')
    expect(mini.wins).toBe(0)
  })
})
