import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { usePlayerStore } from '../src/stores/player'

describe('arena badge', () => {
  it('updates captureLevelCap after earning second arena badge', () => {
    setActivePinia(createPinia())
    const player = usePlayerStore()
    expect(player.captureLevelCap).toBe(20)

    player.earnBadge('arena40')
    expect(player.captureLevelCap).toBe(40)
  })
})
