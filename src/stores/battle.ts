import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computeDamage } from '~/utils/combat'
import { useShlagedexStore } from './shlagedex'

export interface AttackResult {
  damage: number
  effect: 'super' | 'not' | 'normal'
  crit: 'critical' | 'weak' | 'normal'
}

export const useBattleStore = defineStore('battle', () => {
  const dex = useShlagedexStore()
  function attack(
    attacker: DexShlagemon,
    defender: DexShlagemon,
    isPlayerAttacker = false,
    isPlayerDefender = false,
    reduced = false,
  ): AttackResult {
    const atkType = attacker.base.types[0]
    const defType = defender.base.types[0]
    const atkBonus = isPlayerAttacker ? 1 + dex.bonusPercent / 100 : 1
    const defBonus = isPlayerDefender ? 1 + dex.bonusPercent / 100 : 1
    const result = computeDamage(Math.round(attacker.attack * atkBonus), atkType, defType)
    const roundedDamage = Math.max(1, Math.round(result.damage / defBonus))
    const finalDamage = reduced ? Math.round(roundedDamage / 5) : roundedDamage // reduced (case by clicking)
    defender.hpCurrent = Math.max(0, defender.hpCurrent - finalDamage)
    return { ...result, damage: finalDamage }
  }

  function clickAttack(attacker: DexShlagemon, defender: DexShlagemon) {
    return attack(attacker, defender, false, false, true)
  }

  function duel(player: DexShlagemon, enemy: DexShlagemon) {
    const playerResult = attack(player, enemy, true, false)
    let enemyResult: AttackResult | null = null
    if (enemy.hpCurrent > 0)
      enemyResult = attack(enemy, player, false, true)
    return { player: playerResult, enemy: enemyResult }
  }

  return { attack, clickAttack, duel }
})
