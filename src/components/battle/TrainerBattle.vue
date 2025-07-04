<script setup lang="ts">
import AttackCursor from '~/components/battle/AttackCursor.vue'
import BattleShlagemon from '~/components/battle/BattleShlagemon.vue'
import BattleToast from '~/components/battle/BattleToast.vue'
import CharacterImage from '~/components/character/CharacterImage.vue'
import Button from '~/components/ui/Button.vue'
import { useBattleEffects, useSingleInterval } from '~/composables/battleEngine'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useBattleStore } from '~/stores/battle'
import { useDiseaseStore } from '~/stores/disease'
import { useEventStore } from '~/stores/event'
import { useGameStore } from '~/stores/game'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMultiExpStore } from '~/stores/multiExp'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const game = useGameStore()
const trainerStore = useTrainerBattleStore()
const battle = useBattleStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const progress = useZoneProgressStore()
const multiExpStore = useMultiExpStore()
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
const enemy = ref<ReturnType<typeof createDexShlagemon> | null>(null)
const playerHp = ref(0)
const enemyHp = ref(0)
const battleActive = ref(false)
const flashPlayer = ref(false)
const flashEnemy = ref(false)
const playerFainted = ref(false)
const enemyFainted = ref(false)
const showAttackCursor = ref(false)
const cursorX = ref(0)
const cursorY = ref(0)
const cursorClicked = ref(false)
const { playerEffect, enemyEffect, playerVariant, enemyVariant, showEffect } = useBattleEffects()
const { start: startInterval, clear: stopInterval } = useSingleInterval(() => tick(), 1000)
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

function startBattle() {
  clearTimeout(nextBattleTimer)
  const t = trainer.value
  if (!t || !dex.activeShlagemon)
    return
  stage.value = 'battle'
  const spec = t.shlagemons[enemyIndex.value]
  if (!spec)
    return
  const base = allShlagemons.find(b => b.id === spec.baseId)
  if (!base)
    return
  const rank = t.id.startsWith('king-') ? zone.getZoneRank(zone.current.id) : 1
  const created = createDexShlagemon(base, false, rank * equilibrerank)
  created.lvl = spec.level
  applyStats(created)
  enemy.value = created
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

function onClickArea(_e: MouseEvent) {
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
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = playerHp.value
    playerFainted.value = playerHp.value <= 0
    enemyFainted.value = enemyHp.value <= 0
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
          const holder = multiExpStore.holder
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
}

function finish() {
  if (result.value === 'win') {
    if (trainer.value?.id.startsWith('king-')) {
      progress.defeatKing(zone.current.id)
      notifyAchievement({ type: 'king-defeated' })
    }
    trainerStore.next()
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
  stopInterval()
  clearTimeout(nextBattleTimer)
})
</script>

<template>
  <div v-if="trainer" class="flex flex-col items-center gap-2">
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
    <div
      v-else-if="stage === 'battle'"
      class="w-full text-center"
      @click="onClickArea"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="mb-1 h-12 flex items-center justify-end gap-2 overflow-hidden font-bold">
        <div class="h-full flex flex-col">
          <div>{{ trainer.character.name }}</div>
          <div class="flex gap-2">
            <ImageByBackground v-for="i in trainer.shlagemons.length" :key="i" src="/items/shlageball/shlageball.png" class="h-4 w-4" :class="i <= enemyIndex ? 'saturate-0' : ''" />
          </div>
        </div>
        <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="h-full" />
      </div>
      <div class="flex flex-1 items-center justify-center gap-4">
        <div v-if="dex.activeShlagemon" class="mon relative flex flex-1 flex-col items-center justify-end" :class="{ flash: flashPlayer }">
          <BattleToast v-if="playerEffect" :message="playerEffect" :variant="playerVariant" />
          <BattleShlagemon
            :mon="dex.activeShlagemon"
            :hp="playerHp"
            :fainted="playerFainted"
            :effects="dex.effects"
            :disease="disease.active"
            :disease-remaining="disease.remaining"
          />
        </div>
        <div class="vs font-bold">
          VS
        </div>
        <div v-if="enemy" class="mon relative flex flex-1 flex-col items-center" :class="{ flash: flashEnemy }">
          <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
          <BattleShlagemon :mon="enemy" :hp="enemyHp" :fainted="enemyFainted" color="bg-red-500" />
        </div>
        <AttackCursor v-if="showAttackCursor" :x="cursorX" :y="cursorY" :clicked="cursorClicked" />
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-2 text-center">
      <CharacterImage :id="trainer.character.id" :alt="trainer.character.name" class="h-24" />
      <div v-if="result === 'win'">
        {{ trainer.dialogAfter }}
      </div>
      <div v-else class="text-red-600 font-bold dark:text-red-400">
        Défaite...
      </div>
      <div v-if="result === 'win'" class="font-bold">
        +{{ trainer.reward }} Schlagédiamonds
      </div>
      <Button @click="finish">
        Continuer
      </Button>
    </div>
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
