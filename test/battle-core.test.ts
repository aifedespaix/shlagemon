import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useBattleCore } from '../src/composables/useBattleCore'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

function setup() {
  setActivePinia(createPinia())
  const dex = useShlagedexStore()
  const player = dex.createShlagemon(carapouffe)
  dex.setActiveShlagemon(player)
  const composable = useBattleCore({
    createEnemy: () => dex.createShlagemon(carapouffe),
  })
  composable.startBattle()
  return { ...composable, enemy: composable.enemy.value!, player }
}

describe('useBattleCore', () => {
  it('runs attack', () => {
    const { attack, enemyHp, enemy } = setup()
    const initial = enemyHp.value
    attack()
    expect(enemyHp.value).toBeLessThan(initial)
    expect(enemy.hpCurrent).toBeLessThan(initial)
  })
})
