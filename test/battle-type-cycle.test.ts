import type { BaseShlagemon } from '../src/type/shlagemon'

import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'

import { shlagemonTypes } from '../src/data/shlagemons-type'
import { useBattleStore } from '../src/stores/battle'
import { createDexShlagemon } from '../src/utils/dexFactory'

vi.mock('../src/stores/shlagedex', () => ({
  useShlagedexStore: () => ({
    bonusPercent: 0,
    effectiveAttack: (m: any) => m.attack,
    effectiveDefense: (m: any) => m.defense,
    activeShlagemon: null,
    maxHp: () => 9999,
  }),
}))

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({ isMusicEnabled: false }),
}))

vi.mock('../src/stores/disease', () => ({
  useDiseaseStore: () => ({ active: false }),
}))

describe('battle attack type cycle', () => {
  it('cycles through all attacker types in order', () => {
    setActivePinia(createPinia())
    const battle = useBattleStore()
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const attackerBase: BaseShlagemon = {
      id: 'multi',
      name: 'Multi',
      description: 'multi',
      types: [shlagemonTypes.feu, shlagemonTypes.eau, shlagemonTypes.vol],
      speciality: 'evolution0',
    }

    const defenderBase: BaseShlagemon = {
      id: 'def',
      name: 'Def',
      description: 'def',
      types: [shlagemonTypes.sol],
      speciality: 'evolution0',
    }

    const attacker = createDexShlagemon(attackerBase)
    const defender = createDexShlagemon(defenderBase)
    defender.hpCurrent = defender.hp

    const r1 = battle.attack(attacker, defender)
    defender.hpCurrent = defender.hp
    const r2 = battle.attack(attacker, defender)
    defender.hpCurrent = defender.hp
    const r3 = battle.attack(attacker, defender)
    defender.hpCurrent = defender.hp
    const r4 = battle.attack(attacker, defender)

    expect(r1.effect).toBe('not')
    expect(r2.effect).toBe('super')
    expect(r3.effect).toBe('normal')
    expect(r4.effect).toBe('not')
  })
})
