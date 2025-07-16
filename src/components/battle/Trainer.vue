<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import { EQUILIBRE_RANK } from '~/constants/battle'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useBattleStatsStore } from '~/stores/battleStats'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useGameStore } from '~/stores/game'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const trainerStore = useTrainerBattleStore()
const battleStats = useBattleStatsStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const panel = useMainPanelStore()
const featureLock = useFeatureLockStore()
const game = useGameStore()
const mobile = useMobileTabStore()

const trainer = computed(() => trainerStore.current)
const isZoneKing = computed(() => trainer.value?.id.startsWith('king-'))
const kingLabel = computed(() => trainer.value?.character.gender === 'female' ? 'reine' : 'roi')

const stage = ref<'before' | 'battle' | 'after'>('before')
const result = ref<'none' | 'win' | 'lose'>('none')
const enemyIndex = ref(0)
const enemy = ref(null as DexShlagemon | null)

function createEnemy(): DexShlagemon | null {
  const t = trainer.value
  if (!t || !dex.activeShlagemon)
    return null
  const spec = t.shlagemons[enemyIndex.value]
  if (!spec)
    return null
  const base = allShlagemons.find(b => b.id === spec.baseId)
  if (!base)
    return null
  const rank = t.id.startsWith('king-') ? zone.getZoneRank(zone.current.id) : 1
  return createDexShlagemon(base, false, rank * EQUILIBRE_RANK, spec.level)
}

function startFight() {
  if (!trainer.value || !dex.activeShlagemon)
    return
  enemyIndex.value = 0
  if (dex.activeShlagemon.hpCurrent <= 0)
    dex.activeShlagemon.hpCurrent = dex.maxHp(dex.activeShlagemon)
  result.value = 'none'
  stage.value = 'battle'
  enemy.value = createEnemy()
}

watch(trainer, (t) => {
  if (t) {
    stage.value = 'before'
    enemyIndex.value = 0
    result.value = 'none'
  }
})

function nextBattle() {
  enemyIndex.value += 1
  if (enemyIndex.value < (trainer.value?.shlagemons.length || 0)) {
    enemy.value = createEnemy()
    return false
  }
  return true
}

async function onEnd(type: 'capture' | 'win' | 'lose' | 'draw') {
  const defeated = enemy.value
  enemy.value = null
  if (!defeated) {
    enemy.value = createEnemy()
    return
  }
  if (type === 'win') {
    if (dex.activeShlagemon) {
      const missing = dex.maxHp(dex.activeShlagemon) - dex.activeShlagemon.hpCurrent
      if (missing > 0) {
        const heal = Math.round(missing * trainerStore.winHealPercent / 100)
        dex.healActive(heal)
      }
    }
    const finished = nextBattle()
    if (finished) {
      if (trainer.value)
        progress.defeatKing(zone.current.id)
      result.value = 'win'
      stage.value = 'after'
      return
    }
  }
  else if (type === 'lose') {
    battleStats.addLoss()
    notifyAchievement({ type: 'battle-loss' })
    result.value = 'lose'
    stage.value = 'after'
    return
  }
  enemy.value = createEnemy()
}

function finish() {
  if (result.value === 'win') {
    if (trainer.value?.reward)
      game.addShlagidiamond(trainer.value.reward)
    if (trainer.value?.id.startsWith('king-')) {
      progress.defeatKing(zone.current.id)
      notifyAchievement({ type: 'king-defeated' })
    }
    trainerStore.next()
    zone.setZone(zone.current.id)
    panel.showBattle()
    if (trainer.value?.id.startsWith('king-'))
      mobile.set('zones')
  }
  else if (result.value === 'lose') {
    stage.value = 'before'
    enemyIndex.value = 0
    result.value = 'none'
  }
}

function cancelFight() {
  panel.showBattle()
}

onMounted(featureLock.lockAll)
onUnmounted(featureLock.unlockAll)
</script>

<template>
  <div class="relative flex flex-col gap-1 overflow-auto p-1">
    <div v-if="stage === 'before'" class="h-full flex flex-col items-center gap-2 text-center">
      <template v-if="isZoneKing">
        <div class="font-bold capitalize">
          {{ kingLabel }} de la zone
        </div>
        <div class="font-bold">
          {{ trainer.character.name }}
        </div>
      </template>
      <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="min-h-24 flex-1" />
      <div>{{ trainer.dialogBefore }}</div>
      <div class="flex gap-2">
        <UiButton type="primary" @click="startFight">
          <div class="i-mdi:sword" />
          Démarrer le combat
        </UiButton>
        <UiButton type="danger" @click="cancelFight">
          <div class="i-mdi:close" />
          Abandonner
        </UiButton>
      </div>
    </div>
    <template v-else-if="stage === 'battle' && dex.activeShlagemon && enemy">
      <BattleRound

        :player="dex.activeShlagemon"
        :enemy="enemy"
        :capture-enabled="false"
        @end="onEnd"
      >
        <template #header>
          <BattleHeader :trainer="trainer" :defeated="enemyIndex" />
        </template>
      </BattleRound>
    </template>

    <div v-else class="h-full flex flex-col items-center gap-2 text-center">
      <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="min-h-24 flex-1" />
      <div v-if="result === 'win'">
        {{ trainer.dialogAfter }}
      </div>
      <div v-else class="text-red-600 font-bold dark:text-red-400">
        {{ trainer.dialogDefeat || 'Défaite...' }}
      </div>
      <div v-if="result === 'win'" class="font-bold">
        +{{ trainer.reward }} Shlagédiamonds
      </div>
      <UiButton @click="finish">
        Continuer
      </UiButton>
    </div>
  </div>
</template>
