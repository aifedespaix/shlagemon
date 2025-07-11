<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { onMounted, watch } from 'vue'
import BattleScene from '~/components/battle/BattleScene.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import CaptureHandler from '~/components/battle/CaptureHandler.vue'
import { useBattleCore } from '~/composables/useBattleCore'
import { notifyAchievement } from '~/stores/achievements'
import { useDiseaseStore } from '~/stores/disease'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useWearableItemStore } from '~/stores/wearableItem'
import { useZoneStore } from '~/stores/zone'
import { xpRewardForLevel } from '~/utils/dexFactory'

const props = withDefaults(defineProps<{
  player: DexShlagemon
  enemy: DexShlagemon
  clickAttack?: boolean
  captureEnabled?: boolean
}>(), {
  clickAttack: true,
  captureEnabled: true,
})

const emit = defineEmits<{
  (e: 'end', result: 'win' | 'lose' | 'draw'): void
  (e: 'capture'): void
}>()

const dex = useShlagedexStore()
const disease = useDiseaseStore()
const zone = useZoneStore()
const wearableItemStore = useWearableItemStore()

const {
  enemy: currentEnemy,
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
  startBattle: coreStartBattle,
  stopBattle,
  attack: coreAttack,
} = useBattleCore({
  createEnemy: () => props.enemy,
})

function startBattle() {
  coreStartBattle(props.enemy)
}

function emitResult(result: 'win' | 'lose' | 'draw') {
  emit('end', result)
}

function handleEnd() {
  const win = enemyHp.value <= 0 && playerHp.value > 0
  const lose = playerHp.value <= 0 && enemyHp.value > 0
  if (win)
    emitResult('win')
  else if (lose)
    emitResult('lose')
  else
    emitResult('draw')
}

async function onCaptureEnd(success: boolean) {
  if (success && props.enemy) {
    notifyAchievement({ type: 'capture', shiny: props.enemy.isShiny })
    if (dex.activeShlagemon) {
      const xp = xpRewardForLevel(props.enemy.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, zone.current.maxLevel)
      const holder = wearableItemStore.getHolder('multi-exp')
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), zone.current.maxLevel)
    }
    emit('capture')
  }
  else {
    startBattle()
  }
}

watch(
  () => battleActive.value,
  (active, prev) => {
    if (!active && prev && (playerFainted.value || enemyFainted.value))
      handleEnd()
  },
)

watch(
  () => [props.enemy, props.player],
  () => {
    startBattle()
  },
  { immediate: true },
)

function attack() {
  if (coreAttack())
    handleEnd()
}

function onMouseMove(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

function onMouseEnter() {
  showAttackCursor.value = true
}

function onMouseLeave() {
  showAttackCursor.value = false
}

function onClick(_e: MouseEvent) {
  cursorClicked.value = true
  setTimeout(() => (cursorClicked.value = false), 150)
  if (props.clickAttack)
    attack()
}

onMounted(() => {
  currentEnemy.value = props.enemy
  startBattle()
})
</script>

<template>
  <BattleScene
    class="w-full flex-1"
    :show-attack-cursor="showAttackCursor"
    :cursor-x="cursorX"
    :cursor-y="cursorY"
    :cursor-clicked="cursorClicked"
    @click="onClick"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <template #player>
      <BattleShlagemon
        :mon="props.player"
        :hp="playerHp"
        :fainted="playerFainted"
        flipped
        :effects="dex.effects"
        :disease="disease.active"
        :disease-remaining="disease.remaining"
        :class="{ flash: flashPlayer }"
      >
        <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
      </BattleShlagemon>
    </template>
    <template #enemy>
      <BattleShlagemon
        :mon="props.enemy"
        :hp="enemyHp"
        color="bg-red-500"
        :fainted="enemyFainted"
        :class="{ flash: flashEnemy }"
      >
        <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
      </BattleShlagemon>
    </template>
    <slot />
  </BattleScene>
  <CaptureHandler
    v-if="props.captureEnabled"
    :enemy="props.enemy"
    :enemy-hp="enemyHp"
    :stop-battle="stopBattle"
    @finish="onCaptureEnd"
  />
</template>
