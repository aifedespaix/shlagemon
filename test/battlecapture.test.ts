import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import BattleCapture from '../src/components/battle/Capture.vue'
import { shlageball } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBallStore } from '../src/stores/ball'
import { useInventoryStore } from '../src/stores/inventory'
import { usePlayerStore } from '../src/stores/player'
import { useShlagedexStore } from '../src/stores/shlagedex'
import * as captureUtils from '../src/utils/capture'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('battleCapture', () => {
  it('updates store on successful capture', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const ball = useBallStore()
    const inventory = useInventoryStore()
    const player = usePlayerStore()

    ball.current = shlageball.id
    inventory.add(shlageball.id)
    player.captureLevelCap = 100

    const enemy = createDexShlagemon(carapouffe)
    const captureSpy = vi.spyOn(dex, 'captureEnemy')
    vi.spyOn(captureUtils, 'tryCapture').mockReturnValue(true)

    const wrapper = mount(BattleCapture, {
      props: { enemy, enemyHp: enemy.hp, stopBattle: vi.fn() },
      global: { plugins: [pinia], stubs: ['Tooltip', 'ImageByBackground', 'ShlagemonImage'] },
    })

    await wrapper.get('button').trigger('click')
    vi.runOnlyPendingTimers()
    vi.runOnlyPendingTimers()
    expect(captureSpy).toHaveBeenCalledWith(enemy)
    expect(dex.shlagemons.some(m => m.base.id === enemy.base.id)).toBe(true)
    vi.useRealTimers()
  })
})
