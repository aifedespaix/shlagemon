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
    mini.finish('win')
    expect(inventory.items['oeuf-herbe']).toBe(1)
    expect(game.shlagidolar).toBe(0)
    expect(mini.wins).toBe(1)
  })

  it('no reward on defeat', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const inventory = useInventoryStore()
    mini.select('tictactoe')
    mini.finish('lose')
    expect(inventory.items['oeuf-herbe']).toBeUndefined()
    expect(mini.wins).toBe(0)
  })

  it('grants water egg on battleship victory', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const inventory = useInventoryStore()
    mini.select('battleship')
    mini.finish('win')
    expect(inventory.items['oeuf-eau']).toBe(1)
  })

  it('grants fire egg on connect four victory', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const inventory = useInventoryStore()
    mini.select('connectfour')
    mini.finish('win')
    expect(inventory.items['oeuf-feu']).toBe(1)
  })

  it('grants psy egg on shlagcards victory', () => {
    setActivePinia(createPinia())
    const mini = useMiniGameStore()
    const inventory = useInventoryStore()
    mini.select('shlagcards')
    mini.finish('win')
    expect(inventory.items['oeuf-psy']).toBe(1)
  })
})
