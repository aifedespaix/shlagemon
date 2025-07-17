import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { usePlayerStore } from '../src/stores/player'

describe('arena badge', () => {
  it('updates captureLevelCap after earning second arena badge', () => {
    setActivePinia(createPinia())
    const player = usePlayerStore()
    expect(player.captureLevelCap).toBe(19)

    player.earnBadge('arena40')
    expect(player.captureLevelCap).toBe(59)
  })
})
