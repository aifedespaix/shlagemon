import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'

import { useLaboratoryStore } from '../src/stores/laboratory'

const hasBadgeMock = vi.fn(() => false)
const earnBadgeMock = vi.fn()
const addBadgeMock = vi.fn()
const isTwaFlag = ref(false)
const debugFlag = ref(false)

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

vi.mock('../src/stores/developer', () => ({
  useDeveloperStore: () => ({
    debug: debugFlag,
    setDebug: (value: boolean) => {
      debugFlag.value = value
    },
    reset: () => {
      debugFlag.value = false
    },
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
    debugFlag.value = false
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
    store.resetResearchProgress()
    expect(store.hitsUntilNextLegendary).toBe(15)
    const result = store.addResearchProgress(14)
    expect(result.added).toBe(14)
    expect(store.hitsUntilNextLegendary).toBe(1)
    store.addResearchProgress(1)
    expect(store.isResearchReady).toBe(true)
    expect(store.hitsUntilNextLegendary).toBe(0)
  })

  it('falls back to a single-hit threshold in debug mode', () => {
    debugFlag.value = true
    const store = useLaboratoryStore()
    expect(store.legendaryBattleThreshold).toBe(1)
    store.resetResearchProgress()
    const { added, reachedThreshold } = store.addResearchProgress(1)
    expect(added).toBe(1)
    expect(reachedThreshold).toBe(true)
  })
})
