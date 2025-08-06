import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { croakKing } from '../src/data/items/wearables/croakKing'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleStore } from '../src/stores/battle'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('croak king effect', () => {
  it('leaves shiny enemies at 1 hp', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    player.attack = 1000
    player.isShiny = false
    player.heldItemId = croakKing.id
    enemy.hpCurrent = 50
    enemy.isShiny = true
    battle.attack(player, enemy, true, false)
    expect(enemy.hpCurrent).toBe(1)
  })

  it('has no effect against non-shiny enemies', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    player.attack = 1000
    player.isShiny = true
    player.heldItemId = croakKing.id
    enemy.hpCurrent = 50
    enemy.isShiny = false
    battle.attack(player, enemy, true, false)
    expect(enemy.hpCurrent).toBe(0)
  })
})
