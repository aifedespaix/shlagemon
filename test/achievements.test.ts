import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { notifyAchievement, useAchievementsStore } from '../src/stores/achievements'
import { useGameStore } from '../src/stores/game'

describe('achievements', () => {
  it('unlocks win and money achievements', async () => {
    setActivePinia(createPinia())
    const achievements = useAchievementsStore()
    const game = useGameStore()
    notifyAchievement({ type: 'battle-win', stronger: false })
    game.addShlagidolar(200)
    await nextTick()
    expect(achievements.unlockedList.some(a => a.id === 'win-1')).toBe(true)
    expect(achievements.unlockedList.some(a => a.id === 'money-100')).toBe(true)
  })
})
