import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computeDamage } from '~/utils/combat'

export interface AttackResult {
  damage: number
  effect: 'super' | 'not' | 'normal'
}

export const useBattleStore = defineStore('battle', () => {
  function attack(attacker: DexShlagemon, defender: DexShlagemon): AttackResult {
    const atkType = attacker.base.types[0]
    const defType = defender.base.types[0]
    const result = computeDamage(attacker.attack, atkType, defType)
    defender.hpCurrent = Math.max(0, defender.hpCurrent - result.damage)
    return result
  }

  function duel(player: DexShlagemon, enemy: DexShlagemon) {
    const playerResult = attack(player, enemy)
    let enemyResult: AttackResult | null = null
    if (enemy.hpCurrent > 0)
      enemyResult = attack(enemy, player)
    return { player: playerResult, enemy: enemyResult }
  }

  return { attack, duel }
})
