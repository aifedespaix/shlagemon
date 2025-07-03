<script setup lang="ts">
import BattleToast from '~/components/battle/BattleToast.vue'
import CharacterImage from '~/components/character/CharacterImage.vue'
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import Button from '~/components/ui/Button.vue'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { allShlagemons } from '~/data/shlagemons'
import { notifyAchievement } from '~/stores/achievements'
import { useBattleStore } from '~/stores/battle'
import { useGameStore } from '~/stores/game'
import { useMainPanelStore } from '~/stores/mainPanel'
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
let battleInterval: number | undefined
const flashPlayer = ref(false)
const flashEnemy = ref(false)
const playerEffect = ref('')
const enemyEffect = ref('')
const playerVariant = ref<'normal' | 'high' | 'low'>('normal')
const enemyVariant = ref<'normal' | 'high' | 'low'>('normal')

function showEffect(target: 'player' | 'enemy', effect: 'super' | 'not' | 'normal', crit: 'critical' | 'weak' | 'normal') {
  if (effect === 'normal' && crit === 'normal')
    return
  const messages: string[] = []
  if (crit === 'critical')
    messages.push('Coup critique !')
  else if (crit === 'weak')
    messages.push('Coup mou...')
  if (effect === 'super')
    messages.push('C\u2019est super efficace !')
  else if (effect === 'not')
    messages.push('Pas tr\u00E8s efficace...')
  const text = messages.join(' ')
  const variant = effect === 'super' || crit === 'critical'
    ? 'high'
    : effect === 'not' || crit === 'weak'
      ? 'low'
      : 'normal'
  if (target === 'enemy') {
    enemyEffect.value = text
    enemyVariant.value = variant
    setTimeout(() => {
      enemyEffect.value = ''
      enemyVariant.value = 'normal'
    }, 500)
  }
  else {
    playerEffect.value = text
    playerVariant.value = variant
    setTimeout(() => {
      playerEffect.value = ''
      playerVariant.value = 'normal'
    }, 500)
  }
}

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
  if (dex.activeShlagemon.hpCurrent <= 0)
    dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hp
  result.value = 'none'
  stage.value = 'battle'
  playerHp.value = dex.activeShlagemon.hpCurrent
  startBattle()
}

function startBattle() {
  const t = trainer.value
  if (!t || !dex.activeShlagemon)
    return
  stage.value = 'battle'
  const spec = t.shlagemons[enemyIndex.value]
  const base = allShlagemons.find(b => b.id === spec.baseId)
  if (!base)
    return
  enemy.value = createDexShlagemon(base)
  enemy.value.lvl = spec.level
  applyStats(enemy.value)
  enemyHp.value = enemy.value.hp
  battleActive.value = true
  battleInterval = window.setInterval(tick, 1000)
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
    if (battleInterval)
      clearInterval(battleInterval)
    battleInterval = undefined
    if (dex.activeShlagemon)
      dex.activeShlagemon.hpCurrent = playerHp.value

    if (enemyHp.value <= 0 && playerHp.value > 0) {
      if (dex.activeShlagemon && enemy.value) {
        dex.gainXp(
          dex.activeShlagemon,
          xpRewardForLevel(enemy.value.lvl),
          undefined,
          trainerStore.levelUpHealPercent,
        )
      }
      enemyIndex.value += 1
      if (enemyIndex.value < (trainer.value?.shlagemons.length || 0)) {
        setTimeout(startBattle, 500)
        return
      }
      if (trainer.value)
        game.addShlagidiamond(trainer.value.reward)
      result.value = 'win'
      stage.value = 'after'
      return
    }

    // player lost the active Shlagémon
    if (playerHp.value <= 0) {
      result.value = 'lose'
      stage.value = 'after'
      return
    }

    stage.value = 'after'
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
  if (battleInterval)
    clearInterval(battleInterval)
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
      <Button @click="startFight">
        Démarrer le combat
      </Button>
      <Button type="danger" @click="cancelFight">
        Abandonner
      </Button>
    </div>
    <div v-else-if="stage === 'battle'" class="w-full text-center" @click="attack">
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
          <ShlagemonImage
            :id="dex.activeShlagemon.base.id"
            :alt="dex.activeShlagemon.base.name"
            :shiny="dex.activeShlagemon.isShiny"
            class="max-h-32 object-contain"
          />
          <div class="absolute left-0 top-0 text-sm font-bold">
            lvl {{ dex.activeShlagemon.lvl }}
          </div>
          <div class="mt-1 flex items-center gap-1">
            <span class="font-bold">{{ dex.activeShlagemon.base.name }}</span>
            <ShlagemonType v-for="t in dex.activeShlagemon.base.types" :key="t.id" :value="t" size="xs" />
          </div>
          <ProgressBar :value="playerHp" :max="dex.activeShlagemon.hp" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ playerHp }} / {{ dex.activeShlagemon.hp }}
          </div>
        </div>
        <div class="vs font-bold">
          VS
        </div>
        <div v-if="enemy" class="mon relative flex flex-1 flex-col items-center" :class="{ flash: flashEnemy }">
          <BattleToast v-if="enemyEffect" :message="enemyEffect" :variant="enemyVariant" />
          <ShlagemonImage
            :id="enemy.base.id"
            :alt="enemy.base.name"
            :shiny="enemy.isShiny"
            class="max-h-32 object-contain"
          />
          <div class="absolute left-0 top-0 text-sm font-bold">
            lvl {{ enemy.lvl }}
          </div>
          <div class="mt-1 flex items-center gap-1">
            <span class="font-bold">{{ enemy.base.name }}</span>
            <ShlagemonType v-for="t in enemy.base.types" :key="t.id" :value="t" size="xs" />
          </div>
          <ProgressBar :value="enemyHp" :max="enemy.hp" color="bg-red-500" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ enemyHp }} / {{ enemy.hp }}
          </div>
        </div>
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
