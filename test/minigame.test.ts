import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useGameStore } from '../src/stores/game'
import { useInventoryStore } from '../src/stores/inventory'
import { useMiniGameStore } from '../src/stores/miniGame'

describe('mini game store', () => {
  it('rewards player on victory', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const game = useGameStore()
    const inventory = useInventoryStore()
    mini.select('tictactoe')
    mini.finish(true)
    expect(inventory.items['oeuf-herbe']).toBe(1)
    expect(game.shlagidolar).toBe(0)
    expect(mini.wins).toBe(1)
  })

  it('no reward on defeat', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const inventory = useInventoryStore()
    mini.select('tictactoe')
    mini.finish(false)
    expect(inventory.items['oeuf-herbe']).toBeUndefined()
    expect(mini.wins).toBe(0)
  })
})
