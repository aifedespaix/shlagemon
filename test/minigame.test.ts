import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useGameStore } from '../src/stores/game'
import { useMiniGameStore } from '../src/stores/miniGame'
import { getMiniGame } from '../src/data/minigames'

describe('mini game store', () => {
  it('rewards player on victory', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const game = useGameStore()
    mini.select('tictactoe')
    mini.finish(true)
    expect(game.shlagidolar).toBe(getMiniGame('tictactoe')!.reward)
    expect(mini.wins).toBe(1)
  })

  it('no reward on defeat', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    mini.select('tictactoe')
    mini.finish(false)
    expect(mini.wins).toBe(0)
  })
})
