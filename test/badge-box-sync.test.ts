import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { getArena } from '../src/data/arenas'
import { useBadgeBoxStore } from '../src/stores/badgeBox'
import { usePlayerStore } from '../src/stores/player'

describe('badge box sync', () => {
  it('adds missing player badges into the box', () => {
    setActivePinia(createPinia())
    const player = usePlayerStore()
    const badgeBox = useBadgeBoxStore()
    const arena = getArena('arena20')
    expect(arena).toBeDefined()

    player.earnBadge('arena20')
    expect(badgeBox.badges).toHaveLength(0)

    badgeBox.syncWithPlayerBadges()

    expect(badgeBox.badges).toEqual([arena!.badge])
  })

  it('does not duplicate badges already in the box', () => {
    setActivePinia(createPinia())
    const player = usePlayerStore()
    const badgeBox = useBadgeBoxStore()
    const arena = getArena('arena20')
    expect(arena).toBeDefined()

    player.earnBadge('arena20')
    badgeBox.addBadge(arena!.badge)

    badgeBox.syncWithPlayerBadges()

    expect(badgeBox.badges).toHaveLength(1)
  })
})
