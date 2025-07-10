<script setup lang="ts">
import { toast } from 'vue3-toastify'
import BattleCapture from '~/components/battle/BattleCapture.vue'
import BattleHeader from '~/components/battle/BattleHeader.vue'
import BattleScene from '~/components/battle/BattleScene.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import CaptureLimitModal from '~/components/battle/CaptureLimitModal.vue'
import FightKingButton from '~/components/battle/FightKingButton.vue'
import ZoneMonsModal from '~/components/zones/ZoneMonsModal.vue'
import { useBattleCore } from '~/composables/useBattleCore'

import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useAudioStore } from '~/stores/audio'
import { useBattleStatsStore } from '~/stores/battleStats'
import { useDiseaseStore } from '~/stores/disease'
import { useEventStore } from '~/stores/event'
import { useGameStore } from '~/stores/game'
import { useMultiExpStore } from '~/stores/multiExp'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { useZoneMonsModalStore } from '~/stores/zoneMonsModal'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'
import { pickRandomByCoefficient } from '~/utils/spawn'

const dex = useShlagedexStore()
const game = useGameStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const disease = useDiseaseStore()
const multiExpStore = useMultiExpStore()
const battleStats = useBattleStatsStore()
const zoneMonsModal = useZoneMonsModalStore()
const events = useEventStore()
const audio = useAudioStore()
const equilibrerank = 2
let nextBattleTimer: number | undefined

const {
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
  stopBattle,
  startBattle: coreStartBattle,
  attack: coreAttack,
} = useBattleCore({
  createEnemy: () => {
    const active = dex.activeShlagemon
    if (!active)
      return null

    const available = zone.current.shlagemons?.length
      ? zone.current.shlagemons
      : allShlagemons
    let pool = available
    const last = progress.lastEncounters[zone.current.id]
    if (last?.length >= 3 && last.every(id => id === last[0])) {
      const filtered = available.filter(b => b.id !== last[0])
      if (filtered.length)
        pool = filtered
    }
    const base = pickRandomByCoefficient(pool)
    progress.registerEncounter(zone.current.id, base.id)
    const rank = zone.getZoneRank(zone.current.id) * equilibrerank
    const created = createDexShlagemon(base, false, rank)
    const min = Number(zone.current.minLevel ?? 1)
    const zoneMax = Number(zone.current.maxLevel ?? (min + 1))
    const max = Math.max(zoneMax - 1, min)
    const lvl = Math.floor(Math.random() * (max - min + 1)) + min
    created.lvl = lvl
    applyStats(created)
    if (created.isShiny) {
      toast('Vous avez rencontré un Shiny !')
      audio.playSfx('/audio/sfx/shiny.ogg')
    }
    return created
  },
})

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

const enemyCaptured = computed(() =>
  enemy.value
    ? dex.shlagemons.some(m => m.base.id === enemy.value!.base.id)
    : false,
)

async function onCaptureEnd(success: boolean) {
  if (success && enemy.value) {
    audio.playSfx('/audio/sfx/capture-success.ogg')
    dex.captureEnemy(enemy.value)
    notifyAchievement({ type: 'capture', shiny: enemy.value.isShiny })
    if (dex.activeShlagemon) {
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
    coreStartBattle(enemy.value!)
  }
}

function startBattle(mon?: typeof enemy.value) {
  clearTimeout(nextBattleTimer)
  coreStartBattle(mon ?? undefined)
}

function finishBattle() {
  clearTimeout(nextBattleTimer)
  nextBattleTimer = window.setTimeout(async () => {
    const defeatedEnemy = enemy.value
    enemy.value = null
    const playerWon = enemyHp.value <= 0 && playerHp.value > 0
    const playerLost = playerHp.value <= 0 && enemyHp.value > 0
    events.emit('battle:end')
    if (dex.activeShlagemon) {
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
      playerHp.value = dex.activeShlagemon.hpCurrent
    }
    if (playerWon) {
      const stronger = defeatedEnemy && dex.activeShlagemon
        ? defeatedEnemy.lvl > dex.activeShlagemon.lvl
        : false
      progress.addWin(zone.current.id)
      game.addShlagidolar(zone.rewardMultiplier)
      notifyAchievement({ type: 'battle-win', stronger })
      if (dex.activeShlagemon && defeatedEnemy) {
        const xp = xpRewardForLevel(defeatedEnemy.lvl)
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
    else if (playerLost) {
      battleStats.addLoss()
      notifyAchievement({ type: 'battle-loss' })
    }
    playerFainted.value = false
    enemyFainted.value = false
    startBattle()
  }, 500)
}

function attack() {
  if (coreAttack())
    finishBattle()
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
      stopBattle()
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

let lastZoneId = zone.current.id
watch(
  () => zone.selectedAt,
  () => {
    if (dex.activeShlagemon && lastZoneId !== zone.current.id)
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
    lastZoneId = zone.current.id
    stopBattle()
    startBattle()
  },
)

onUnmounted(() => {
  stopBattle()
  clearTimeout(nextBattleTimer)
})
</script>

<template>
  <div class="relative flex flex-col gap-1 overflow-auto p-1">
    <FightKingButton />
    <div class="absolute left-0 top-0 flex items-center gap-2">
      <Tooltip :text="captureTooltip">
        <Button type="icon" class="rounded-tl-0" aria-label="Shlagémons de la zone" @click="zoneMonsModal.open()">
          <img src="/items/shlageball/shlageball.png" alt="liste" class="h-6 w-6" :class="{ 'opacity-50': !hasAllZoneMons }">
        </Button>
      </Tooltip>
      <Tooltip :text="winTooltip">
        <span :class="{ 'font-bold': wins >= progress.fightsBeforeKing }">{{ wins.toLocaleString() }}</span>
      </Tooltip>
    </div>
    <BattleScene
      v-if="dex.activeShlagemon && enemy"
      class="max-w-160 w-full flex-1 self-center"
      :show-attack-cursor="showAttackCursor"
      :cursor-x="cursorX"
      :cursor-y="cursorY"
      :cursor-clicked="cursorClicked"
      @click="onClick"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <template #header>
        <BattleHeader :zone-name="zone.current.name" />
      </template>
      <template #player>
        <BattleShlagemon
          :mon="dex.activeShlagemon"
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
          v-if="enemy"
          class="mon"
          :class="{ flash: flashEnemy }"
          :mon="enemy"
          :hp="enemyHp"
          :fainted="enemyFainted"
          color="bg-red-500"
          show-ball
          :owned="enemyCaptured"
        >
          <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
        </BattleShlagemon>
      </template>
      <template #capture>
        <BattleCapture
          v-if="enemy"
          :enemy="enemy"
          :enemy-hp="enemyHp"
          :stop-battle="stopBattle"
          @finish="onCaptureEnd"
        />
      </template>
    </BattleScene>
    <ShlagemonXpBar
      v-if="dex.activeShlagemon"
      class="max-w-160 w-full self-center"
      :mon="dex.activeShlagemon"
    />
    <ZoneMonsModal />
    <CaptureLimitModal />
  </div>
</template>

<style scoped>
.mon {
  @apply relative flex flex-1 h-full flex-col items-center justify-end;
}
</style>
