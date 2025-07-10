<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { onMounted, onUnmounted, ref } from 'vue'
import BattleScene from '~/components/battle/BattleScene.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import { useBattleEffects } from '~/composables/battleEngine'
import { useBattleStore } from '~/stores/battle'

const props = defineProps<{ player: DexShlagemon, enemy: DexShlagemon }>()
const emit = defineEmits<{ (e: 'end', win: boolean): void }>()

const battle = useBattleStore()
const playerHp = ref(0)
const enemyHp = ref(0)
const battleActive = ref(false)
const flashPlayer = ref(false)
const flashEnemy = ref(false)
const playerFainted = ref(false)
const enemyFainted = ref(false)
const { playerEffect, enemyEffect, playerVariant, enemyVariant, showEffect } = useBattleEffects()

let loop: number | undefined

function start() {
  playerHp.value = props.player.hpCurrent
  enemyHp.value = props.enemy.hpCurrent
  battleActive.value = true
  loop = window.setInterval(tick, 1000)
}

function stop() {
  if (loop !== undefined) {
    clearInterval(loop)
    loop = undefined
  }
}

function finish() {
  battleActive.value = false
  stop()
  playerFainted.value = playerHp.value <= 0
  enemyFainted.value = enemyHp.value <= 0
  emit('end', enemyHp.value <= 0 && playerHp.value > 0)
}

function tick() {
  if (!battleActive.value)
    return
  const { player: resPlayer, enemy: resEnemy } = battle.duel(props.player, props.enemy)
  showEffect('enemy', resPlayer.effect, resPlayer.crit)
  enemyHp.value = props.enemy.hpCurrent
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  if (resEnemy) {
    showEffect('player', resEnemy.effect, resEnemy.crit)
    playerHp.value = props.player.hpCurrent
    flashPlayer.value = true
    setTimeout(() => (flashPlayer.value = false), 100)
  }
  if (enemyHp.value <= 0 || playerHp.value <= 0)
    finish()
}

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <BattleScene>
    <template #player>
      <BattleShlagemon
        :mon="player"
        :hp="playerHp"
        :fainted="playerFainted"
        flipped
        :class="{ flash: flashPlayer }"
      >
        <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
      </BattleShlagemon>
    </template>
    <template #enemy>
      <BattleShlagemon
        :mon="enemy"
        :hp="enemyHp"
        :fainted="enemyFainted"
        color="bg-red-500"
        :class="{ flash: flashEnemy }"
      >
        <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
      </BattleShlagemon>
    </template>
  </BattleScene>
</template>
