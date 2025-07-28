import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { useAchievementsStore } from '../src/stores/achievements'

describe('achievements progress persistence', () => {
  it('restores counters from storage', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    // simulate saved counters
    window.localStorage.setItem('achievements', JSON.stringify({ counters: { wins: 5 } }))

    const achievements = useAchievementsStore()
    const progress = achievements.getProgress('win-10')
    expect(progress?.value).toBe(5)
  })
})
