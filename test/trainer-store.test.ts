import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useTrainerBattleStore } from '../src/stores/trainerBattle'

describe('trainer battle store', () => {
  it('exposes level up heal percent', () => {
    setActivePinia(createPinia())
    const store = useTrainerBattleStore()
    expect(store.levelUpHealPercent).toBe(15)
  })
})
