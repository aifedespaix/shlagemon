import { useThrottleFn } from '@vueuse/core'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { useBattleCore } from '../src/composables/useBattleCore'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    playSfx: vi.fn(),
    isMusicEnabled: false,
  }),
}))

describe('throttled click attacks', () => {
  it('ignores rapid successive clicks to keep the UI responsive', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)
    const core = useBattleCore({ createEnemy: () => enemy })
    core.startBattle(enemy)
    const initialHp = enemy.hpCurrent
    const throttled = useThrottleFn(core.attack, 50, false, true)

    throttled()
    throttled()
    expect(enemy.hpCurrent).toBe(initialHp - 10)

    vi.advanceTimersByTime(50)
    throttled()
    expect(enemy.hpCurrent).toBe(initialHp - 20)

    vi.useRealTimers()
  })
})
