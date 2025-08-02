import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { preyAmulet } from '../src/data/items/wearables/preyAmulet'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleStore } from '../src/stores/battle'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('click attack', () => {
  it('deals fixed 10 damage ignoring items and bonuses', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)

    // boost stats and equip an item that would normally modify damage
    player.attack = 1000
    player.defense = 1000
    player.heldItemId = preyAmulet.id
    enemy.defense = 1000

    const initialHp = enemy.hpCurrent
    const result = battle.clickAttack(player, enemy)
    expect(result.damage).toBe(10)
    expect(enemy.hpCurrent).toBe(initialHp - 10)

    // prey amulet should not prevent the finishing blow
    enemy.hpCurrent = 5
    const result2 = battle.clickAttack(player, enemy)
    expect(result2.damage).toBe(5)
    expect(enemy.hpCurrent).toBe(0)
  })
})
