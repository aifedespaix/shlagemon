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

  let loopId: number | undefined

  function startLoop(handler: () => void, delay = 1000) {
    stopLoop()
    loopId = window.setInterval(handler, delay)
  }

  function stopLoop() {
    if (typeof loopId === 'number') {
      clearInterval(loopId)
      loopId = undefined
    }
  }
  function attack(
    attacker: DexShlagemon,
    defender: DexShlagemon,
    isPlayerAttacker = false,
    isPlayerDefender = false,
    reduced = false,
  ): AttackResult {
    const atkType = attacker.base.types[0]
    const defTypes = defender.base.types
    const atkBonus = isPlayerAttacker ? 1 + dex.bonusPercent / 100 : 1
    const musicBonus = audio.isMusicEnabled ? 1.1 : 1
    const shinyBonus = attacker.isShiny ? 1.15 : 1
    const defBonus = isPlayerDefender ? 1 + dex.bonusPercent / 100 : 1
    const baseAttack = Math.round(attacker.attack * atkBonus * musicBonus * shinyBonus)
    const result = computeDamage(baseAttack, atkType, defTypes)
    // Application des bonus/malus d'attaque et de défense (potions et bonus global)
    const defenseFactor = 100 / (100 + defender.defense)
    const rawDamage = result.damage * defenseFactor / defBonus
    const roundedDamage = Math.max(1, Math.round(rawDamage))
    let finalDamage = reduced ? Math.round(roundedDamage / 5) : roundedDamage // reduced (case by clicking)
    if (disease.active && attacker.id === dex.activeShlagemon?.id)
      finalDamage = 10
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

  return { attack, clickAttack, duel, startLoop, stopLoop }
})
