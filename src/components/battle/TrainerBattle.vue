<script setup lang="ts">
import BattleHeader from '~/components/battle/BattleHeader.vue'
import BattleScene from '~/components/battle/BattleScene.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import CharacterImage from '~/components/character/CharacterImage.vue'
import Button from '~/components/ui/Button.vue'
import { useBattleCore } from '~/composables/useBattleCore'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useBattleStatsStore } from '~/stores/battleStats'
import { useDiseaseStore } from '~/stores/disease'
import { useEventStore } from '~/stores/event'
import { useGameStore } from '~/stores/game'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useWearableItemStore } from '~/stores/wearableItem'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const game = useGameStore()
const trainerStore = useTrainerBattleStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const wearableItemStore = useWearableItemStore()
const battleStats = useBattleStatsStore()
const disease = useDiseaseStore()
const events = useEventStore()
const equilibrerank = 2
let nextBattleTimer: number | undefined

const trainer = computed(() => trainerStore.current)
const isZoneKing = computed(() => trainer.value?.id.startsWith('king-'))
const kingLabel = computed(() =>
  trainer.value?.character.gender === 'female' ? 'reine' : 'roi',
)

const stage = ref<'before' | 'battle' | 'after'>('before')
const result = ref<'none' | 'win' | 'lose'>('none')
const enemyIndex = ref(0)

const {
  enemy,
  playerHp,
  enemyHp,
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
  attack: coreAttack,
  stopBattle,
} = useBattleCore({
  createEnemy: () => {
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
    const created = createDexShlagemon(base, false, rank * equilibrerank)
    created.lvl = spec.level
    applyStats(created)
    return created
  },
})
watch(trainer, (t) => {
  if (t) {
    stage.value = 'before'
    enemyIndex.value = 0
    result.value = 'none'
    if (dex.activeShlagemon)
      playerHp.value = dex.activeShlagemon.hpCurrent
  }
})

watch(
  () => dex.activeShlagemon?.hpCurrent,
  (value) => {
    if (typeof value === 'number')
      playerHp.value = value
  },
)

function startFight() {
  if (!trainer.value || !dex.activeShlagemon)
    return
  enemyIndex.value = 0
  if (dex.activeShlagemon.hpCurrent <= 0)
    dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
  result.value = 'none'
  stage.value = 'battle'
  playerHp.value = dex.activeShlagemon.hpCurrent
  startBattle()
}

function startBattle(mon?: typeof enemy.value) {
  clearTimeout(nextBattleTimer)
  coreStartBattle(mon ?? undefined)
}
function finishBattle() {
  clearTimeout(nextBattleTimer)
  nextBattleTimer = window.setTimeout(async () => {
    events.emit('battle:end')
    if (enemyHp.value <= 0 && playerHp.value > 0) {
      if (dex.activeShlagemon && enemy.value) {
        const xp = xpRewardForLevel(enemy.value.lvl)
        await dex.gainXp(
          dex.activeShlagemon,
          xp,
          undefined,
          trainerStore.levelUpHealPercent,
        )
        const holder = wearableItemStore.getHolder('multi-exp')
        if (holder) {
          const share = Math.round(xp * 0.5)
          await dex.gainXp(holder, share, undefined, trainerStore.levelUpHealPercent)
        }
      }
      enemyIndex.value += 1
      if (enemyIndex.value < (trainer.value?.shlagemons.length || 0)) {
        playerFainted.value = false
        enemyFainted.value = false
        startBattle()
        return
      }
      if (trainer.value)
        game.addShlagidiamond(trainer.value.reward)
      result.value = 'win'
      stage.value = 'after'
      playerFainted.value = false
      enemyFainted.value = false
      return
    }

    if (playerHp.value <= 0) {
      battleStats.addLoss()
      notifyAchievement({ type: 'battle-loss' })
      result.value = 'lose'
      stage.value = 'after'
      playerFainted.value = false
      enemyFainted.value = false
      return
    }

    stage.value = 'after'
    playerFainted.value = false
    enemyFainted.value = false
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

function onClickArea(_e: MouseEvent) {
  cursorClicked.value = true
  setTimeout(() => (cursorClicked.value = false), 150)
  attack()
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

onUnmounted(() => {
  stopBattle()
  clearTimeout(nextBattleTimer)
})
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
    <BattleScene
      v-else-if="stage === 'battle'"
      class="w-full flex-1 self-center"
      :show-attack-cursor="showAttackCursor"
      :cursor-x="cursorX"
      :cursor-y="cursorY"
      :cursor-clicked="cursorClicked"
      @click="onClickArea"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <template #header>
        <BattleHeader :trainer="trainer" />
      </template>
      <template #player>
        <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
        <BattleShlagemon
          v-if="dex.activeShlagemon"
          :mon="dex.activeShlagemon"
          :hp="playerHp"
          flipped
          :fainted="playerFainted"
          :effects="dex.effects"
          :disease="disease.active"
          :disease-remaining="disease.remaining"
        />
      </template>
      <template #enemy>
        <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
        <BattleShlagemon
          v-if="enemy" :mon="enemy" :hp="enemyHp" :fainted="enemyFainted" color="bg-red-500"
        />
      </template>
    </BattleScene>

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
