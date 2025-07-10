import type { DexShlagemon } from '~/type/shlagemon'
import { onUnmounted, ref, watch } from 'vue'
import { useBattleStore } from '~/stores/battle'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useBattleEffects } from './battleEngine'

export interface BattleCoreOptions {
  createEnemy: () => DexShlagemon | null
}

export function useBattleCore(options: BattleCoreOptions) {
  const battle = useBattleStore()
  const dex = useShlagedexStore()
  const {
    playerEffect,
    enemyEffect,
    playerVariant,
    enemyVariant,
    showEffect,
  } = useBattleEffects()

  const enemy = ref<DexShlagemon | null>(null)
  const playerHp = ref(0)
  const enemyHp = ref(0)
  const battleActive = ref(false)
  const flashPlayer = ref(false)
  const flashEnemy = ref(false)
  const playerFainted = ref(false)
  const enemyFainted = ref(false)
  const showAttackCursor = ref(false)
  const cursorX = ref(0)
  const cursorY = ref(0)
  const cursorClicked = ref(false)

  function startInterval() {
    battle.startLoop(() => tick(), 1000)
  }

  function stopInterval() {
    battle.stopLoop()
  }

  function stopBattle() {
    battleActive.value = false
    stopInterval()
  }

  function startBattle(existing?: DexShlagemon | null) {
    const active = dex.activeShlagemon
    enemy.value = existing || options.createEnemy()
    if (!enemy.value || !active)
      return
    if (active.hpCurrent <= 0)
      active.hpCurrent = active.hp
    playerHp.value = active.hpCurrent
    enemyHp.value = enemy.value.hpCurrent
    battleActive.value = true
    startInterval()
  }

  function attack() {
    if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
      return false
    const { effect, crit } = battle.clickAttack(dex.activeShlagemon, enemy.value)
    showEffect('enemy', effect, crit)
    enemyHp.value = enemy.value.hpCurrent
    flashEnemy.value = true
    setTimeout(() => (flashEnemy.value = false), 100)
    return checkEnd()
  }

  function tick() {
    if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
      return false
    const { player: resPlayer, enemy: resEnemy } = battle.duel(
      dex.activeShlagemon,
      enemy.value,
    )
    showEffect('enemy', resPlayer.effect, resPlayer.crit)
    enemyHp.value = enemy.value.hpCurrent
    flashEnemy.value = true
    setTimeout(() => (flashEnemy.value = false), 100)
    if (resEnemy) {
      showEffect('player', resEnemy.effect, resEnemy.crit)
      playerHp.value = dex.activeShlagemon.hpCurrent
      flashPlayer.value = true
      setTimeout(() => (flashPlayer.value = false), 100)
    }
    return checkEnd()
  }

  function checkEnd() {
    if (enemyHp.value <= 0 || playerHp.value <= 0) {
      stopBattle()
      playerFainted.value = playerHp.value <= 0
      enemyFainted.value = enemyHp.value <= 0
      return true
    }
    return false
  }

  watch(
    () => dex.activeShlagemon?.hpCurrent,
    (value) => {
      if (typeof value === 'number')
        playerHp.value = value
    },
  )

  onUnmounted(stopInterval)

  return {
    enemy,
    playerHp,
    enemyHp,
    battleActive,
    flashPlayer,
    flashEnemy,
    playerFainted,
    enemyFainted,
    showAttackCursor,
    cursorX,
    cursorY,
    cursorClicked,
    playerEffect,
    enemyEffect,
    playerVariant,
    enemyVariant,
    showEffect,
    startBattle,
    stopBattle,
    attack,
    tick,
    checkEnd,
  }
}
