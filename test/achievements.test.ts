import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { rouxPasCool } from '../src/data/shlagemons/01-05/rouxPasCool'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { canarchicon } from '../src/data/shlagemons/30-35/canarchicon'
import sperectum from '../src/data/shlagemons/evolutions/sperectum'
import { notifyAchievement, useAchievementsStore } from '../src/stores/achievements'
import { useGameStore } from '../src/stores/game'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneProgressStore } from '../src/stores/zoneProgress'

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

  it('unlocks zone achievements', async () => {
    setActivePinia(createPinia())
    const achievements = useAchievementsStore()
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()

    dex.createShlagemon(sacdepates)
    dex.createShlagemon(rouxPasCool)
    dex.createShlagemon(canarchicon)
    dex.createShlagemon(sperectum)
    await nextTick()
    expect(achievements.unlockedList.some(a => a.id === 'zone-plaine-kekette-complete')).toBe(true)

    for (let i = 0; i < 10; i++)
      progress.addWin('plaine-kekette')
    await nextTick()
    expect(achievements.unlockedList.some(a => a.id === 'zone-plaine-kekette-win-10')).toBe(true)
  })
})
