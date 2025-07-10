import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useTrainerBattleStore } from '../src/stores/trainerBattle'

describe('trainer battle store', () => {
  it('exposes level up heal percent', () => {
    setActivePinia(createPinia())
    const store = useTrainerBattleStore()
    expect(store.levelUpHealPercent).toBe(15)
  })

  it('isActive reflects queue state', () => {
    setActivePinia(createPinia())
    const store = useTrainerBattleStore()
    store.reset()
    expect(store.isActive).toBe(false)
    store.setQueue([{
      id: 'test',
      character: { id: 'test', name: 'Test', gender: 'male' },
      dialogBefore: '',
      dialogAfter: '',
      reward: 1,
      shlagemons: [],
    }])
    expect(store.isActive).toBe(true)
  })
})
