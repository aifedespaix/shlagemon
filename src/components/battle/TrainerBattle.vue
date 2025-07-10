<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BattleHeader from '~/components/battle/BattleHeader.vue'
import BattleRound from '~/components/battle/BattleRound.vue'
import CharacterImage from '~/components/character/CharacterImage.vue'
import Button from '~/components/ui/Button.vue'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useBattleStatsStore } from '~/stores/battleStats'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useWearableItemStore } from '~/stores/wearableItem'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const trainerStore = useTrainerBattleStore()
const battleStats = useBattleStatsStore()
const wearableItemStore = useWearableItemStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const panel = useMainPanelStore()

const trainer = computed(() => trainerStore.current)
const isZoneKing = computed(() => trainer.value?.id.startsWith('king-'))
const kingLabel = computed(() => trainer.value?.character.gender === 'female' ? 'reine' : 'roi')

const stage = ref<'before' | 'battle' | 'after'>('before')
const result = ref<'none' | 'win' | 'lose'>('none')
const enemyIndex = ref(0)
const enemy = ref(null as DexShlagemon | null)
const equilibrerank = 2

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
  const mon = createDexShlagemon(base, false, rank * equilibrerank)
  mon.lvl = spec.level
  applyStats(mon)
  return mon
}

function startFight() {
  if (!trainer.value || !dex.activeShlagemon)
    return
  enemyIndex.value = 0
  if (dex.activeShlagemon.hpCurrent <= 0)
    dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
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
  if (!enemy.value)
    return
  if (type === 'win') {
    if (dex.activeShlagemon) {
      const xp = xpRewardForLevel(enemy.value.lvl)
      await dex.gainXp(dex.activeShlagemon, xp, undefined, trainerStore.levelUpHealPercent)
      const holder = wearableItemStore.getHolder('multi-exp')
      if (holder)
        await dex.gainXp(holder, Math.round(xp * 0.5), undefined, trainerStore.levelUpHealPercent)
    }
    const finished = nextBattle()
    if (finished) {
      if (trainer.value)
        progress.defeatKing(zone.current.id)
      result.value = 'win'
      stage.value = 'after'
    }
  }
  else if (type === 'lose') {
    battleStats.addLoss()
    notifyAchievement({ type: 'battle-loss' })
    result.value = 'lose'
    stage.value = 'after'
  }
  else if (type === 'capture') {
    // capturing not allowed in trainer battles, ignore
    enemy.value = createEnemy()
  }
  else {
    enemy.value = createEnemy()
  }
}

function finish() {
  if (result.value === 'win') {
    if (trainer.value?.id.startsWith('king-')) {
      progress.defeatKing(zone.current.id)
      notifyAchievement({ type: 'king-defeated' })
    }
    trainerStore.next()
    zone.setZone(zone.current.id)
    panel.showBattle()
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
</script>

<template>
  <div class="relative flex flex-col gap-1 overflow-auto p-1">
    <div v-if="stage === 'before'" class="flex flex-col items-center gap-2 text-center">
      <template v-if="isZoneKing">
        <div class="font-bold capitalize">
          {{ kingLabel }} de la zone
        </div>
        <div class="font-bold">
          {{ trainer.character.name }}
        </div>
      </template>
      <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="h-24" />
      <div>{{ trainer.dialogBefore }}</div>
      <div class="flex gap-2">
        <Button type="primary" @click="startFight">
          <div class="i-mdi:sword" />
          Démarrer le combat
        </Button>
        <Button type="danger" @click="cancelFight">
          <div class="i-mdi:close" />
          Abandonner
        </Button>
      </div>
    </div>
    <BattleRound
      v-else-if="stage === 'battle' && dex.activeShlagemon && enemy"
      :player="dex.activeShlagemon"
      :enemy="enemy"
      :capture-enabled="false"
      @end="onEnd"
    >
      <template #header>
        <BattleHeader :trainer="trainer" :defeated="enemyIndex" />
      </template>
    </BattleRound>

    <div v-else class="flex flex-col items-center gap-2 text-center">
      <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="h-24" />
      <div v-if="result === 'win'">
        {{ trainer.dialogAfter }}
      </div>
      <div v-else class="text-red-600 font-bold dark:text-red-400">
        Défaite...
      </div>
      <div v-if="result === 'win'" class="font-bold">
        +{{ trainer.reward }} Shlagédiamonds
      </div>
      <Button @click="finish">
        Continuer
      </Button>
    </div>
  </div>
</template>
