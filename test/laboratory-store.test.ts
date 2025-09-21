import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'

import { useLaboratoryStore } from '../src/stores/laboratory'

const hasBadgeMock = vi.fn(() => false)
const earnBadgeMock = vi.fn()
const addBadgeMock = vi.fn()
const isTwaFlag = ref(false)

vi.mock('../src/stores/player', () => ({
  usePlayerStore: () => ({
    hasBadge: hasBadgeMock,
    earnBadge: earnBadgeMock,
  }),
}))

vi.mock('../src/stores/badgeBox', () => ({
  useBadgeBoxStore: () => ({
    addBadge: addBadgeMock,
  }),
}))

vi.mock('../src/stores/pwaEnvironment', () => ({
  usePwaEnvironmentStore: () => ({
    isTwa: computed(() => isTwaFlag.value),
  }),
}))

describe('laboratory store mobile adjustments', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    hasBadgeMock.mockClear()
    earnBadgeMock.mockClear()
    addBadgeMock.mockClear()
    hasBadgeMock.mockReturnValue(false)
    isTwaFlag.value = false
  })

  it('uses the default desktop legendary threshold when not in the mobile app', () => {
    const store = useLaboratoryStore()
    expect(store.legendaryBattleThreshold).toBe(25)
    expect(store.shlagpurRewardPerAsteroid).toBe(1)
  })

  it('scales shlagpur rewards according to asteroid size on desktop', () => {
    const store = useLaboratoryStore()
    expect(store.calculateShlagpurReward(1)).toBe(1)
    expect(store.calculateShlagpurReward(5)).toBe(5)
    expect(store.calculateShlagpurReward(2.4)).toBe(2)
    expect(store.calculateShlagpurReward(0)).toBe(1)
    expect(store.calculateShlagpurReward(10)).toBe(5)
  })

  it('switches to the mobile thresholds when the TWA flag is active', () => {
    isTwaFlag.value = true
    const store = useLaboratoryStore()
    expect(store.legendaryBattleThreshold).toBe(15)
    expect(store.shlagpurRewardPerAsteroid).toBe(3)
  })

  it('applies the mobile reward multiplier when scaling shlagpur gains', () => {
    isTwaFlag.value = true
    const store = useLaboratoryStore()
    expect(store.calculateShlagpurReward(1)).toBe(3)
    expect(store.calculateShlagpurReward(5)).toBe(15)
  })

  it('computes hits until the next legendary using the active threshold', () => {
    isTwaFlag.value = true
    const store = useLaboratoryStore()
    store.resetScore()
    expect(store.hitsUntilNextLegendary).toBe(15)
    store.addScore(14)
    expect(store.hitsUntilNextLegendary).toBe(1)
  })

  it('caps research progress at the active threshold and reports changes', () => {
    const store = useLaboratoryStore()
    store.resetScore()
    expect(store.addScore(10)).toBe(true)
    expect(store.score).toBe(10)
    expect(store.addScore(100)).toBe(true)
    expect(store.score).toBe(store.legendaryBattleThreshold)
    expect(store.addScore(1)).toBe(false)
    expect(store.score).toBe(store.legendaryBattleThreshold)
    store.clampScore(5)
    expect(store.score).toBe(5)
  })
})
