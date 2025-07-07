import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { canarchichon, carapouffe, salamiches } from '../src/data/shlagemons'
import { useArenaStore } from '../src/stores/arena'
import { useShlagedexStore } from '../src/stores/shlagedex'

function createTeams() {
  const dex = useShlagedexStore()
  const player = [
    dex.createShlagemon(carapouffe),
    dex.createShlagemon(salamiches),
    dex.createShlagemon(canarchichon),
  ]
  const enemy = [
    dex.createShlagemon(salamiches),
    dex.createShlagemon(canarchichon),
    dex.createShlagemon(carapouffe),
  ]
  return { player, enemy }
}

describe('useArenaStore', () => {
  it('initializes with selected teams', () => {
    setActivePinia(createPinia())
    const arena = useArenaStore()
    const { player, enemy } = createTeams()
    arena.start(player, enemy)
    expect(arena.team).toEqual(player)
    expect(arena.enemyTeam).toEqual(enemy)
    expect(arena.currentIndex).toBe(0)
    expect(arena.result).toBe('none')
    expect(arena.badgeEarned).toBe(false)
  })

  it('chains fights and awards badge on win', () => {
    setActivePinia(createPinia())
    const arena = useArenaStore()
    const { player, enemy } = createTeams()
    arena.start(player, enemy)
    for (let i = 0; i < player.length; i++)
      arena.currentIndex = i
    arena.finish(true)
    expect(arena.currentIndex).toBe(player.length - 1)
    expect(arena.result).toBe('win')
    expect(arena.badgeEarned).toBe(true)
  })

  it('handles defeat correctly', () => {
    setActivePinia(createPinia())
    const arena = useArenaStore()
    const { player, enemy } = createTeams()
    arena.start(player, enemy)
    arena.currentIndex = 1
    arena.finish(false)
    expect(arena.result).toBe('lose')
    expect(arena.badgeEarned).toBe(false)
  })
})
