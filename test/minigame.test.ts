import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useGameStore } from '../src/stores/game'
import { useMiniGameStore } from '../src/stores/miniGame'

describe('mini game store', () => {
  it('rewards and levels up when score is sufficient', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const game = useGameStore()
    mini.level = 1
    mini.score = mini.scoreToWin(1)
    mini.finish()
    expect(game.shlagidolar).toBe(100)
    expect(mini.level).toBe(2)
    expect(mini.wins).toBe(1)
  })

  it('resets level when score is too low', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    mini.level = 3
    mini.score = 0
    mini.finish()
    expect(mini.level).toBe(1)
  })
})
