<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { onMounted, ref, watch } from 'vue'
import BattleCapture from '~/components/battle/BattleCapture.vue'
import BattleScene from '~/components/battle/BattleScene.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
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
  showXpBar?: boolean
  showEffects?: boolean
}>(), {
  clickAttack: true,
  captureEnabled: true,
  showXpBar: true,
  showEffects: true,
})

const emit = defineEmits<{
  (e: 'end', result: 'win' | 'lose' | 'draw'): void
  (e: 'capture'): void
}>()

const dex = useShlagedexStore()
const disease = useDiseaseStore()
const zone = useZoneStore()
const wearableItemStore = useWearableItemStore()

const displayedPlayer = ref(props.player)
const nextPlayer = ref<DexShlagemon | null>(null)
const displayedEnemy = ref(props.enemy)
const nextEnemy = ref<DexShlagemon | null>(null)

const {
  enemy: currentEnemy,
  playerHp,
  enemyHp,
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
  coreStartBattle(displayedEnemy.value)
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
  () => props.enemy,
  (val, old) => {
    if (!old) {
      displayedEnemy.value = val
      startBattle()
      return
    }
    if (enemyFainted.value) {
      nextEnemy.value = val
    }
    else {
      displayedEnemy.value = val
      startBattle()
    }
  },
  { immediate: true },
)

watch(
  () => props.player,
  (val, old) => {
    if (!old) {
      displayedPlayer.value = val
      startBattle()
      return
    }
    if (playerFainted.value) {
      nextPlayer.value = val
    }
    else {
      displayedPlayer.value = val
      startBattle()
    }
  },
  { immediate: true },
)

function attack() {
  coreAttack()
}

function onEnemyFaintEnd() {
  if (enemyFainted.value)
    handleEnd()
  if (nextEnemy.value) {
    displayedEnemy.value = nextEnemy.value
    nextEnemy.value = null
    startBattle()
  }
}

function onPlayerFaintEnd() {
  if (playerFainted.value)
    handleEnd()
  if (nextPlayer.value) {
    displayedPlayer.value = nextPlayer.value
    nextPlayer.value = null
    startBattle()
  }
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
    :show-xp-bar="props.showXpBar"
    @click="onClick"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <template #player>
      <BattleShlagemon
        :mon="displayedPlayer"
        :hp="playerHp"
        :fainted="playerFainted"
        flipped
        :effects="props.showEffects ? dex.effects : []"
        :disease="disease.active"
        :disease-remaining="disease.remaining"
        :class="{ flash: flashPlayer }"
        @faint-end="onPlayerFaintEnd"
      >
        <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
      </BattleShlagemon>
    </template>
    <template #enemy>
      <Transition name="fade" mode="out-in">
        <BattleShlagemon
          :key="displayedEnemy?.id"
          :mon="displayedEnemy"
          :hp="enemyHp"
          color="bg-red-500"
          :fainted="enemyFainted"
          :class="{ flash: flashEnemy }"
          @faint-end="onEnemyFaintEnd"
        >
          <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
        </BattleShlagemon>
      </Transition>
    </template>
    <slot />
  </BattleScene>
  <BattleCapture
    v-if="props.captureEnabled"
    :enemy="props.enemy"
    :enemy-hp="enemyHp"
    :stop-battle="stopBattle"
    @finished="onCaptureEnd"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
