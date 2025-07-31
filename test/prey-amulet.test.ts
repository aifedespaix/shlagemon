import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { preyAmulet } from '../src/data/items/wearables/preyAmulet'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleStore } from '../src/stores/battle'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('prey amulet effect', () => {
  it('never lets attacks reduce enemy below 1 hp', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    player.attack = 1000
    player.heldItemId = preyAmulet.id
    enemy.hpCurrent = 50
    battle.attack(player, enemy, true, false)
    expect(enemy.hpCurrent).toBe(1)
    battle.attack(player, enemy, true, false)
    expect(enemy.hpCurrent).toBe(1)
  })
})
