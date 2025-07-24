import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleStore } from '../src/stores/battle'
import { useDiseaseStore } from '../src/stores/disease'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('disease damage', () => {
  it('deals 10 damage on click attack when sick', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const disease = useDiseaseStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)
    disease.active.value = true
    const initialHp = enemy.hpCurrent
    const result = battle.clickAttack(player, enemy)
    expect(result.damage).toBe(10)
    expect(enemy.hpCurrent).toBe(initialHp - 10)
  })
})
