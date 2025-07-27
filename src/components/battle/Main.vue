<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import { storeToRefs } from 'pinia'
import { multiExp } from '~/data/items'
import { allShlagemons } from '~/data/shlagemons'
import { createDexShlagemon } from '~/utils/dexFactory'
import { pickRandom } from '~/utils/spawn'

const dex = useShlagedexStore()
const zone = useZoneStore()
const { selectedAt } = storeToRefs(zone)
const progress = useZoneProgressStore()
const wearableItemStore = useWearableItemStore()
const events = useEventStore()
const game = useGameStore()
const audio = useAudioStore()
const battleStats = useBattleStatsStore()
const zoneMonsModal = useZoneMonsModalStore()

const enemy = ref(null as DexShlagemon | null)
const { t } = useI18n()

function createEnemy(): DexShlagemon | null {
  const available = zone.current.shlagemons?.length ? zone.current.shlagemons : allShlagemons
  let pool = available
  const last = progress.lastEncounters[zone.current.id]
  if (last?.length >= 3 && last.every(id => id === last[0])) {
    const filtered = available.filter(b => b.id !== last[0])
    if (filtered.length)
      pool = filtered
  }
  const base = pickRandom(pool)
  progress.registerEncounter(zone.current.id, base.id)
  const min = Number(zone.current.minLevel ?? 1)
  const zoneMax = Number(zone.current.maxLevel ?? (min + 1))
  const max = Math.max(zoneMax - 1, min)
  const lvl = Math.floor(Math.random() * (max - min + 1)) + min
  const created = createDexShlagemon(base, false, lvl)
  if (created.isShiny) {
    audio.playSfx('/audio/sfx/shiny.ogg')
  }
  return created
}

function healShlagemon() {
  if (dex.activeShlagemon)
    dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
}

async function startBattle() {
  healShlagemon()
  enemy.value = createEnemy()
}

onMounted(startBattle)

watch(
  () => dex.activeShlagemon,
  (mon, prev) => {
    if (mon && prev && prev.id !== mon.id)
      mon.hpCurrent = dex.maxHp(mon)
    if (mon && prev?.id !== mon?.id)
      startBattle()
  },
)

watch(
  selectedAt,
  () => {
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
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
    ? t('components.battle.Main.captureTooltip.all')
    : t('components.battle.Main.captureTooltip.missing'),
)

const winTooltip = computed(() =>
  t('components.battle.Main.winTooltip', { n: wins.value.toLocaleString() }),
)

async function handleEnd(result: 'win' | 'lose' | 'draw') {
  const defeated = enemy.value
  events.emit('battle:end')

  if (dex.activeShlagemon)
    dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
  if (!defeated) {
    startBattle()
    return
  }
  if (result === 'win') {
    const stronger = defeated.lvl > (dex.activeShlagemon?.lvl || 0)
    progress.addWin(zone.current.id)
    game.addShlagidolar(zone.rewardMultiplier)
    notifyAchievement({ type: 'battle-win', stronger })
    if (dex.activeShlagemon) {
      const xp = dex.xpGainForLevel(defeated.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, undefined, undefined, zone.current.maxLevel)
      const holder = wearableItemStore.getHolder(multiExp.id)
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), undefined, undefined, zone.current.maxLevel)
    }
  }
  else if (result === 'lose') {
    battleStats.addLoss()
    notifyAchievement({ type: 'battle-loss' })
  }
  enemy.value = null
  startBattle()
}

function onCapture() {
  enemy.value = null
  startBattle()
}
</script>

<template>
  <div class="relative w-full flex flex-col gap-1 overflow-auto p-1">
    <BattleFightKingButton />
    <div class="absolute left-0 top-0 flex items-center gap-2">
      <UiTooltip :text="captureTooltip">
        <UiButton type="icon" class="rounded-tl-0" :aria-label="t('components.battle.Main.zoneMons')" @click="zoneMonsModal.open()">
          <img src="/items/shlageball/shlageball.webp" alt="liste" class="h-6 w-6" :class="{ 'opacity-50': !hasAllZoneMons }">
        </UiButton>
      </UiTooltip>
      <UiTooltip :text="winTooltip">
        <span :class="{ 'font-bold': wins >= progress.fightsBeforeKing }">{{ wins.toLocaleString() }}</span>
      </UiTooltip>
    </div>
    <BattleRound
      v-if="dex.activeShlagemon && enemy"
      :player="dex.activeShlagemon"
      :enemy="enemy"
      @end="handleEnd"
      @capture="onCapture"
    >
      <template #header>
        <BattleHeader :zone-name="zone.current.name" />
      </template>
    </BattleRound>
    <ZoneMonsModal />
    <BattleCaptureLimitModal />
  </div>
</template>
