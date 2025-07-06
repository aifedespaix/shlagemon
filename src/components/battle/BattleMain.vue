<script setup lang="ts">
import { toast } from 'vue3-toastify'
import AttackCursor from '~/components/battle/AttackCursor.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import CaptureOverlay from '~/components/battle/CaptureOverlay.vue'
import FightKingButton from '~/components/battle/FightKingButton.vue'
import ZoneMonsModal from '~/components/zones/ZoneMonsModal.vue'
import { useBattleEffects } from '~/composables/battleEngine'
import { balls } from '~/data/items/shlageball'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useAudioStore } from '~/stores/audio'
import { useBallStore } from '~/stores/ball'
import { useBattleStore } from '~/stores/battle'
import { useDiseaseStore } from '~/stores/disease'
import { useEventStore } from '~/stores/event'
import { useGameStore } from '~/stores/game'
import { useInventoryStore } from '~/stores/inventory'
import { useMultiExpStore } from '~/stores/multiExp'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { useZoneMonsModalStore } from '~/stores/zoneMonsModal'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { ballHues } from '~/utils/ball'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const game = useGameStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const battle = useBattleStore()
const disease = useDiseaseStore()
const inventory = useInventoryStore()
const ballStore = useBallStore()
const multiExpStore = useMultiExpStore()
const zoneMonsModal = useZoneMonsModalStore()
const events = useEventStore()
const audio = useAudioStore()
const equilibrerank = 2
let nextBattleTimer: number | undefined

const wins = computed(() => progress.getWins(zone.current.id))
const hasAllZoneMons = computed(() => {
  const list = zone.current.shlagemons
  if (!list?.length)
    return true
  return list.every(base => dex.shlagemons.some(mon => mon.base.id === base.id))
})

const captureTooltip = computed(() =>
  hasAllZoneMons.value
    ? 'Vous avez capturé tous les Shlagémon de la zone'
    : 'Vous n\'avez pas capturé tous les Shlagémon de la zone',
)

const winTooltip = computed(() =>
  `Vous avez vaincu ${wins.value.toLocaleString()} Shlagémon dans cette zone`,
)

const playerHp = ref(0)
const enemyHp = ref(0)
const enemy = ref<ReturnType<typeof createDexShlagemon> | null>(null)
const enemyCaptured = computed(() =>
  enemy.value
    ? dex.shlagemons.some(m => m.base.id === enemy.value!.base.id)
    : false,
)
const battleActive = ref(false)
const showCapture = ref(false)
const captureBall = ref(balls[0])
const captureButtonDisabled = computed(() =>
  (inventory.items[ballStore.current] || 0) <= 0 || enemyHp.value <= 0,
)
const captureButtonTooltip = computed(() => {
  if ((inventory.items[ballStore.current] || 0) <= 0)
    return 'Pas de Schlagéball, capture impossible'
  if (enemyHp.value <= 0)
    return 'Impossible de capturer un Shlagémon K.O.'
  return 'Capturer le Shlagémon'
})
const flashPlayer = ref(false)
const flashEnemy = ref(false)
const playerFainted = ref(false)
const enemyFainted = ref(false)
const showAttackCursor = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorClicked = ref(false)
const { playerEffect, enemyEffect, playerVariant, enemyVariant, showEffect } = useBattleEffects()
function startInterval() {
  battle.startLoop(() => tick(), 1000)
}
function stopInterval() {
  battle.stopLoop()
}

function openCapture() {
  const id = ballStore.current
  if (!enemy.value || (inventory.items[id] || 0) <= 0 || enemyHp.value <= 0)
    return
  inventory.remove(id)
  captureBall.value = balls.find(b => b.id === id) || balls[0]
  battleActive.value = false
  stopInterval()
  showCapture.value = true
  audio.playSfx('/audio/sfx/capture-start.ogg')
}

function onCaptureEnd(success: boolean) {
  showCapture.value = false
  if (success && enemy.value) {
    audio.playSfx('/audio/sfx/capture-success.ogg')
    dex.captureEnemy(enemy.value)
    notifyAchievement({ type: 'capture', shiny: enemy.value.isShiny })
    if (dex.activeShlagemon) {
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
      playerHp.value = dex.activeShlagemon.hpCurrent
    }
    enemy.value = null
    clearTimeout(nextBattleTimer)
    nextBattleTimer = window.setTimeout(startBattle, 1000)
  }
  else {
    audio.playSfx('/audio/sfx/capture-fail.ogg')
    battleActive.value = true
    startInterval()
  }
}

function startBattle() {
  clearTimeout(nextBattleTimer)
  const active = dex.activeShlagemon
  if (!active)
    return
  const available = zone.current.shlagemons?.length
    ? zone.current.shlagemons
    : allShlagemons
  const base = available[Math.floor(Math.random() * available.length)]
  const rank = zone.getZoneRank(zone.current.id) * equilibrerank
  const created = createDexShlagemon(base, false, rank)
  const min = Number(zone.current.minLevel ?? 1)
  const zoneMax = Number(zone.current.maxLevel ?? (min + 1))
  const max = Math.max(zoneMax - 1, min)
  const lvl = Math.floor(Math.random() * (max - min + 1)) + min
  created.lvl = lvl
  applyStats(created)
  enemy.value = created
  if (created.isShiny) {
    toast('Vous avez rencontré un Shiny !')
    audio.playSfx('/audio/sfx/shiny.ogg')
  }
  if (active.hpCurrent <= 0)
    active.hpCurrent = active.hp
  playerHp.value = active.hpCurrent
  enemyHp.value = enemy.value.hp
  battleActive.value = true
  startInterval()
}

function attack() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  const { effect, crit } = battle.clickAttack(dex.activeShlagemon, enemy.value)
  showEffect('enemy', effect, crit)
  enemyHp.value = enemy.value.hpCurrent
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  checkEnd()
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
  attack()
}

function tick() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  const { player: resPlayer, enemy: resEnemy } = battle.duel(dex.activeShlagemon, enemy.value)
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
  checkEnd()
}
function checkEnd() {
  if (enemyHp.value <= 0 || playerHp.value <= 0) {
    battleActive.value = false
    stopInterval()
    playerFainted.value = playerHp.value <= 0
    enemyFainted.value = enemyHp.value <= 0
    clearTimeout(nextBattleTimer)
    nextBattleTimer = window.setTimeout(async () => {
      events.emit('battle:end')
      if (dex.activeShlagemon) {
        dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
        playerHp.value = dex.activeShlagemon.hpCurrent
      }
      if (enemyHp.value <= 0 && playerHp.value > 0) {
        const stronger = enemy.value && dex.activeShlagemon
          ? enemy.value.lvl > dex.activeShlagemon.lvl
          : false
        progress.addWin(zone.current.id)
        game.addShlagidolar(zone.rewardMultiplier)
        notifyAchievement({ type: 'battle-win', stronger })
        if (dex.activeShlagemon && enemy.value) {
          const xp = xpRewardForLevel(enemy.value.lvl)
          await dex.gainXp(
            dex.activeShlagemon,
            xp,
            zone.current.maxLevel,
          )
          const holder = multiExpStore.holder
          if (holder) {
            const share = Math.round(xp * 0.5)
            await dex.gainXp(holder, share, zone.current.maxLevel)
          }
        }
      }
      playerFainted.value = false
      enemyFainted.value = false
      startBattle()
    }, 500)
  }
}

watch(
  () => dex.activeShlagemon,
  (mon, prev) => {
    if (!mon)
      return
    playerHp.value = mon.hpCurrent
    if (prev && prev.id !== mon.id) {
      mon.hpCurrent = mon.hp
      if (enemy.value)
        enemy.value.hpCurrent = enemy.value.hp
      enemyHp.value = enemy.value?.hp ?? 0
      stopInterval()
      battleActive.value = false
      playerHp.value = mon.hpCurrent
    }
    if (!battleActive.value)
      startBattle()
  },
  { immediate: true },
)

watch(
  () => dex.activeShlagemon?.hpCurrent,
  (value) => {
    if (typeof value === 'number')
      playerHp.value = value
  },
)

watch(
  () => zone.current.id,
  () => {
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
    stopInterval()
    battleActive.value = false
    startBattle()
  },
)

onUnmounted(() => {
  stopInterval()
  clearTimeout(nextBattleTimer)
})
</script>

<template>
  <div class="relative flex flex-col text-center">
    <FightKingButton />
    <div v-if="zone.current.maxLevel" class="relative mb-1 flex items-center justify-center gap-1 font-bold">
      <div class="absolute left-0 flex gap-2">
        <Tooltip :text="captureTooltip">
          <Button type="icon" aria-label="Shlagémons de la zone" @click="zoneMonsModal.open()">
            <img src="/items/shlageball/shlageball.png" alt="liste" class="h-6 w-6" :class="{ 'opacity-50': !hasAllZoneMons }">
          </Button>
        </Tooltip>
        <Tooltip :text="winTooltip">
          <span :class="{ 'font-bold': wins >= progress.fightsBeforeKing }">{{ wins.toLocaleString() }}</span>
        </Tooltip>
      </div>

      {{ zone.current.name }} (lvl {{ zone.current.minLevel }} à {{ zone.current.maxLevel }})
    </div>
    <div v-if="dex.activeShlagemon && enemy" class="flex flex-1 flex-col items-center gap-2">
      <div class="w-full flex flex-1 items-center justify-center gap-4">
        <div class="mon relative flex flex-1 flex-col items-center justify-end" :class="{ flash: flashPlayer }">
          <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
          <BattleShlagemon
            :mon="dex.activeShlagemon"
            :hp="playerHp"
            :fainted="playerFainted"
            flipped
            :effects="dex.effects"
            :disease="disease.active"
            :disease-remaining="disease.remaining"
          />
        </div>
        <div class="vs font-bold">
          VS
        </div>
        <div
          v-if="enemy"
          class="mon relative flex flex-1 flex-col select-none items-center"
          :class="{ flash: flashEnemy }"
          @click="onClick"
          @mousemove="onMouseMove"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
          <BattleShlagemon
            :mon="enemy"
            :hp="enemyHp"
            :fainted="enemyFainted"
            color="bg-red-500"
            show-ball
            :owned="enemyCaptured"
          />
        </div>
        <AttackCursor v-if="showAttackCursor" :x="cursorX" :y="cursorY" :clicked="cursorClicked" />
      </div>
      <Button
        class="absolute right-50% top-8 aspect-square h-12 w-12 flex flex-col translate-x-1/2 cursor-pointer items-center gap-2 rounded-full text-xs"
        :class="{ ' cursor-not-allowed saturate-0': captureButtonDisabled }"
        :disabled="captureButtonDisabled"
        @click="openCapture"
      >
        <Tooltip :text="captureButtonTooltip">
          <ImageByBackground
            src="/items/shlageball/shlageball.png"
            alt="capture"
            class="h-8 w-8 cursor-pointer"
            :style="{ filter: `hue-rotate(${ballHues[ballStore.current]})` }"
          />
        </Tooltip>
      </Button>
      <CaptureOverlay
        v-if="showCapture && enemy"
        :target="enemy"
        :ball="captureBall"
        @finish="onCaptureEnd"
      />
    </div>
    <ZoneMonsModal />
  </div>
</template>

<style scoped>
.flash {
  animation: flash 0.1s ease-in;
}

@keyframes flash {
  from {
    filter: brightness(2);
  }
  to {
    filter: brightness(1);
  }
}
</style>
