import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { computeDamage } from '~/utils/combat'
import { useAudioStore } from './audio'
import { useDiseaseStore } from './disease'
import { useShlagedexStore } from './shlagedex'

export interface AttackResult {
  damage: number
  effect: 'super' | 'not' | 'normal'
  crit: 'critical' | 'weak' | 'normal'
}

export const useBattleStore = defineStore('battle', () => {
  const dex = useShlagedexStore()
  const audio = useAudioStore()
  const disease = useDiseaseStore()
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
    const musicBonus = audio.isMusicEnabled ? 1.1 : 1
    const shinyBonus = attacker.isShiny ? 1.15 : 1
    const defBonus = isPlayerDefender ? 1 + dex.bonusPercent / 100 : 1
    const baseAttack = Math.round(attacker.attack * atkBonus * musicBonus * shinyBonus)
    const result = computeDamage(baseAttack, atkType, defType)
    const roundedDamage = Math.max(1, Math.round(result.damage / defBonus))
    let finalDamage = reduced ? Math.round(roundedDamage / 5) : roundedDamage // reduced (case by clicking)
    if (isPlayerAttacker && disease.active)
      finalDamage = 1
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
