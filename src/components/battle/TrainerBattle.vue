<script setup lang="ts">
import { toast } from 'vue3-toastify'
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import Button from '~/components/ui/Button.vue'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { allShlagemons } from '~/data/shlagemons'
import { typeEffectiveness } from '~/data/typeEffectiveness'
import { useGameStore } from '~/stores/game'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useTrainerBattleStore } from '~/stores/trainerBattle'
import { computeDamage } from '~/utils/combat'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const game = useGameStore()
const trainerStore = useTrainerBattleStore()

const trainer = computed(() => trainerStore.current)

const stage = ref<'before' | 'battle' | 'after'>('before')
const enemyIndex = ref(0)
const enemy = ref<ReturnType<typeof createDexShlagemon> | null>(null)
const playerHp = ref(0)
const enemyHp = ref(0)
const battleActive = ref(false)
let battleInterval: number | undefined
const flashPlayer = ref(false)
const flashEnemy = ref(false)

watch(trainer, (t) => {
  if (t) {
    stage.value = 'before'
    enemyIndex.value = 0
    if (dex.activeShlagemon)
      playerHp.value = dex.activeShlagemon.hpCurrent
  }
})

function startFight() {
  if (!trainer.value || !dex.activeShlagemon)
    return
  stage.value = 'battle'
  dex.activeShlagemon.hpCurrent = dex.activeShlagemon.hpCurrent || dex.activeShlagemon.hp
  playerHp.value = dex.activeShlagemon.hpCurrent
  startBattle()
}

function startBattle() {
  const t = trainer.value
  if (!t || !dex.activeShlagemon)
    return
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
  const atkType = dex.activeShlagemon.base.types[0]?.name
  const defType = enemy.value.base.types[0]?.name
  const { damage, effect } = computeDamage(
    dex.activeShlagemon.attack,
    atkType,
    defType,
    typeEffectiveness,
  )
  if (effect === 'super')
    toast('C’est super efficace !')
  else if (effect === 'not')
    toast('Pas très efficace...')
  enemyHp.value = Math.max(0, enemyHp.value - damage)
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  checkEnd()
}

function tick() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  const atkType = dex.activeShlagemon.base.types[0]?.name
  const defType = enemy.value.base.types[0]?.name
  const { damage: dmgToEnemy, effect: eff1 } = computeDamage(
    dex.activeShlagemon.attack,
    atkType,
    defType,
    typeEffectiveness,
  )
  if (eff1 === 'super')
    toast('C’est super efficace !')
  else if (eff1 === 'not')
    toast('Pas très efficace...')
  enemyHp.value = Math.max(0, enemyHp.value - dmgToEnemy)
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  const atkType2 = enemy.value.base.types[0]?.name
  const defType2 = dex.activeShlagemon.base.types[0]?.name
  const { damage: dmgToPlayer, effect: eff2 } = computeDamage(
    enemy.value.attack,
    atkType2,
    defType2,
    typeEffectiveness,
  )
  if (eff2 === 'super')
    toast('C’est super efficace !')
  else if (eff2 === 'not')
    toast('Pas très efficace...')
  playerHp.value = Math.max(0, playerHp.value - dmgToPlayer)
  dex.activeShlagemon.hpCurrent = playerHp.value
  flashPlayer.value = true
  setTimeout(() => (flashPlayer.value = false), 100)
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
      if (dex.activeShlagemon && enemy.value)
        dex.gainXp(dex.activeShlagemon, xpRewardForLevel(enemy.value.lvl))
      enemyIndex.value += 1
      if (enemyIndex.value < (trainer.value?.shlagemons.length || 0)) {
        setTimeout(startBattle, 1000)
        return
      }
      if (trainer.value)
        game.addShlagidiamond(trainer.value.reward)
    }
    stage.value = 'after'
  }
}

function finish() {
  trainerStore.next()
}

onUnmounted(() => {
  if (battleInterval)
    clearInterval(battleInterval)
})
</script>

<template>
  <div v-if="trainer" class="flex flex-col items-center gap-2">
    <div v-if="stage === 'before'" class="flex flex-col items-center gap-2 text-center">
      <img :src="trainer.image" alt="trainer" class="h-24 object-contain">
      <div>{{ trainer.dialogBefore }}</div>
      <Button @click="startFight">
        Démarrer le combat
      </Button>
    </div>
    <div v-else-if="stage === 'battle'" class="w-full text-center" @click="attack">
      <div class="flex flex-1 items-center justify-center gap-4">
        <div v-if="dex.activeShlagemon" class="mon flex flex-1 flex-col items-center justify-end" :class="{ flash: flashPlayer }">
          <img :src="`/shlagemons/${dex.activeShlagemon.base.id}/${dex.activeShlagemon.base.id}.png`" class="max-h-32 object-contain" :alt="dex.activeShlagemon.base.name">
          <div class="mt-1 flex gap-1">
            <ShlagemonType v-for="t in dex.activeShlagemon.base.types" :key="t.id" :value="t" />
          </div>
          <ProgressBar :value="playerHp" :max="dex.activeShlagemon.hp" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ playerHp }} / {{ dex.activeShlagemon.hp }}
          </div>
        </div>
        <div class="vs font-bold">
          VS
        </div>
        <div v-if="enemy" class="mon flex flex-1 flex-col items-center" :class="{ flash: flashEnemy }">
          <img :src="`/shlagemons/${enemy.base.id}/${enemy.base.id}.png`" class="max-h-32 object-contain" :alt="enemy.base.name">
          <div class="mt-1 flex gap-1">
            <ShlagemonType v-for="t in enemy.base.types" :key="t.id" :value="t" />
          </div>
          <div>{{ enemy.base.name }} - lvl {{ enemy.lvl }}</div>
          <ProgressBar :value="enemyHp" :max="enemy.hp" color="bg-red-500" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ enemyHp }} / {{ enemy.hp }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-2 text-center">
      <img :src="trainer.image" alt="trainer" class="h-24 object-contain">
      <div>{{ trainer.dialogAfter }}</div>
      <div v-if="playerHp > 0" class="font-bold">
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
