<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import { computed, onMounted, ref, watch } from 'vue'
import BattleHeader from '~/components/battle/BattleHeader.vue'
import BattleRound from '~/components/battle/BattleRound.vue'
import CaptureLimitModal from '~/components/battle/CaptureLimitModal.vue'
import FightKingButton from '~/components/battle/FightKingButton.vue'
import ZoneMonsModal from '~/components/zones/ZoneMonsModal.vue'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useAudioStore } from '~/stores/audio'
import { useBattleStatsStore } from '~/stores/battleStats'
import { useEventStore } from '~/stores/event'
import { useGameStore } from '~/stores/game'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useWearableItemStore } from '~/stores/wearableItem'
import { useZoneStore } from '~/stores/zone'
import { useZoneMonsModalStore } from '~/stores/zoneMonsModal'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'
import { pickRandomByCoefficient } from '~/utils/spawn'

const dex = useShlagedexStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const wearableItemStore = useWearableItemStore()
const events = useEventStore()
const game = useGameStore()
const audio = useAudioStore()
const battleStats = useBattleStatsStore()
const zoneMonsModal = useZoneMonsModalStore()

const enemy = ref(null as DexShlagemon | null)
let nextBattleTimer: number | undefined
const equilibrerank = 2

function createEnemy(): DexShlagemon | null {
  const active = dex.activeShlagemon
  if (!active)
    return null
  const available = zone.current.shlagemons?.length ? zone.current.shlagemons : allShlagemons
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
    audio.playSfx('/audio/sfx/shiny.ogg')
  }
  return created
}

function startBattle() {
  enemy.value = createEnemy()
}

onMounted(startBattle)

watch(
  () => dex.activeShlagemon,
  (mon, prev) => {
    if (mon && prev && prev.id !== mon.id)
      mon.hpCurrent = mon.hp
    if (mon && !enemy.value)
      startBattle()
  },
)

watch(
  () => zone.selectedAt,
  () => {
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
    startBattle()
  },
)

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

function resetTimers() {
  clearTimeout(nextBattleTimer)
}

async function handleEnd(result: 'capture' | 'win' | 'lose' | 'draw') {
  const defeated = enemy.value
  enemy.value = null
  events.emit('battle:end')
  if (dex.activeShlagemon)
    dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
  if (!defeated) {
    startBattle()
    return
  }
  if (result === 'capture') {
    dex.captureEnemy(defeated)
    notifyAchievement({ type: 'capture', shiny: defeated.isShiny })
    if (dex.activeShlagemon) {
      const xp = xpRewardForLevel(defeated.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, zone.current.maxLevel)
      const holder = wearableItemStore.getHolder('multi-exp')
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), zone.current.maxLevel)
    }
  }
  else if (result === 'win') {
    const stronger = defeated.lvl > (dex.activeShlagemon?.lvl || 0)
    progress.addWin(zone.current.id)
    game.addShlagidolar(zone.rewardMultiplier)
    notifyAchievement({ type: 'battle-win', stronger })
    if (dex.activeShlagemon) {
      const xp = xpRewardForLevel(defeated.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, zone.current.maxLevel)
      const holder = wearableItemStore.getHolder('multi-exp')
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), zone.current.maxLevel)
    }
  }
  else if (result === 'lose') {
    battleStats.addLoss()
    notifyAchievement({ type: 'battle-loss' })
  }
  resetTimers()
  nextBattleTimer = window.setTimeout(startBattle, 1000)
}
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
    <div class="w-full flex items-center justify-center gap-2 overflow-hidden font-bold">
      <div class="flex flex-col items-center justify-center p-x-20">
        <div class="overflow-ellipsis w-full overflow-hidden text-ellipsis whitespace-nowrap text-center" :title="zone.current.name">
          {{ zone.current.name }}
        </div>
        <div v-if="zone.current.maxLevel" class="whitespace-nowrap text-xs">
          {{ zone.current.minLevel }} - {{ zone.current.maxLevel }}
        </div>
      </div>
    </div>
    <BattleRound
      v-if="dex.activeShlagemon && enemy"
      :player="dex.activeShlagemon"
      :enemy="enemy"
      @end="handleEnd"
    >
      <template #header>
        <BattleHeader :zone-name="zone.current.name" />
      </template>
    </BattleRound>
    <ZoneMonsModal />
    <CaptureLimitModal />
  </div>
</template>
