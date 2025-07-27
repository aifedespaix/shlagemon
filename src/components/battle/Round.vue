<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { multiExp } from '~/data/items'

const props = withDefaults(defineProps<{
  player: DexShlagemon
  enemy: DexShlagemon
  clickAttack?: boolean
  captureEnabled?: boolean
  showXpBar?: boolean
  showEffects?: boolean
  tickDelay?: number
}>(), {
  clickAttack: true,
  captureEnabled: true,
  showXpBar: true,
  showEffects: true,
  tickDelay: 1000,
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

const panel = useMainPanelStore()
const showOwnedBall = computed(() =>
  zone.current.type === 'sauvage' && panel.current === 'battle',
)
const enemyOwned = computed(() => {
  const id = displayedEnemy.value?.base.id
  return id ? dex.capturedBaseIds.has(id) : false
})

const {
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
  tickDelay: props.tickDelay,
})

const showConfetti = ref(false)

function startBattle() {
  dex.setActiveShlagemon(displayedPlayer.value)
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
      const xp = dex.xpGainForLevel(props.enemy.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, undefined, undefined, zone.current.maxLevel)
      const holder = wearableItemStore.getHolder(multiExp.id)
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), undefined, undefined, zone.current.maxLevel)
    }
    emit('capture')
    showConfetti.value = true
    useTimeoutFn(() => (showConfetti.value = false), 800)
  }
  else {
    startBattle()
  }
}

watch(
  () => props.enemy.id,
  (id, oldId) => {
    if (id === oldId)
      return
    const val = props.enemy
    if (!oldId) {
      displayedEnemy.value = val
      startBattle()
      return
    }
    displayedEnemy.value = val
    startBattle()
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
    startBattle()
  }
}

async function onPlayerFaintEnd() {
  if (playerFainted.value)
    handleEnd()
  await nextTick()
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
  if (props.clickAttack)
    showAttackCursor.value = true
}

function onMouseLeave() {
  if (props.clickAttack)
    showAttackCursor.value = false
}

function onClick(_e: MouseEvent) {
  cursorClicked.value = true
  useTimeoutFn(() => (cursorClicked.value = false), 150)
  if (props.clickAttack)
    attack()
}
</script>

<template>
  <div class="w-full flex flex-1 flex-col items-center gap-2">
    <slot name="header" />
    <div class="relative max-w-160 w-full flex flex-1 items-center justify-center gap-4">
      <div v-if="showConfetti" class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="confetti">
          🎉
        </div>
      </div>
      <Transition name="fade-scale" mode="out-in">
        <BattleShlagemon
          :key="displayedPlayer?.id"
          :mon="displayedPlayer"
          :hp="playerHp"
          :fainted="playerFainted"
          :flash="flashPlayer"
          flipped
          :effects="props.showEffects ? dex.effects : []"
          :disease="disease.active"
          :disease-remaining="disease.remaining"
          @faint-end="onPlayerFaintEnd"
        >
          <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
        </BattleShlagemon>
      </Transition>
      <div class="vs font-bold">
        VS
      </div>
      <div
        class="relative h-full w-full flex-1"
        @click="onClick"
        @mousemove="onMouseMove"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <Transition name="fade-scale" mode="out-in">
          <BattleShlagemon
            :key="displayedEnemy?.id"
            :mon="displayedEnemy"
            :hp="enemyHp"
            color="bg-red-500"
            :fainted="enemyFainted"
            :flash="flashEnemy"
            :show-ball="showOwnedBall"
            :owned="enemyOwned"
            @faint-end="onEnemyFaintEnd"
          >
            <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
          </BattleShlagemon>
        </Transition>
        <BattleAttackCursor
          v-if="props.clickAttack && showAttackCursor"
          :x="cursorX"
          :y="cursorY"
          :clicked="cursorClicked"
        />
      </div>
    </div>
    <slot />
    <ShlagemonXpBar
      v-if="props.showXpBar && dex.activeShlagemon"
      class="max-w-160 w-full self-center"
      :mon="dex.activeShlagemon"
    />
  </div>
  <BattleCapture
    v-if="props.captureEnabled"
    :enemy="props.enemy"
    :enemy-hp="enemyHp"
    :stop-battle="stopBattle"
    @finished="onCaptureEnd"
  />
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.confetti {
  animation: confetti-pop 0.8s ease forwards;
  font-size: 3rem;
}

@keyframes confetti-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
