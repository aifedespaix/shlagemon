<script setup lang="ts">
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { starters } from '~/data/shlagemons'
import { useGameStore } from '~/stores/game'
import { useSchlagedexStore } from '~/stores/schlagedex'
import { createDexShlagemon, xpForLevel } from '~/utils/dexFactory'

const dex = useSchlagedexStore()
const game = useGameStore()

const playerHp = ref(0)
const enemyHp = ref(0)
const enemy = ref<ReturnType<typeof createDexShlagemon> | null>(null)
const battleActive = ref(false)
const flashPlayer = ref(false)
const flashEnemy = ref(false)
let battleInterval: number | undefined

function startBattle() {
  const active = dex.activeShlagemon
  if (!active)
    return
  const base = starters[Math.floor(Math.random() * starters.length)]
  enemy.value = createDexShlagemon(base)
  playerHp.value = active.hp
  enemyHp.value = enemy.value.hp
  battleActive.value = true
  battleInterval = window.setInterval(tick, 1000)
}

function attack() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  enemyHp.value = Math.max(0, enemyHp.value - dex.activeShlagemon.attack)
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  checkEnd()
}

function tick() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  enemyHp.value = Math.max(0, enemyHp.value - dex.activeShlagemon.attack)
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  playerHp.value = Math.max(0, playerHp.value - enemy.value.attack)
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
    if (enemyHp.value <= 0 && playerHp.value > 0) {
      game.addShlagidolar(1)
      if (dex.activeShlagemon && enemy.value)
        dex.gainXp(dex.activeShlagemon, xpForLevel(enemy.value.lvl))
    }
    setTimeout(startBattle, 1000)
  }
}

watch(
  () => dex.activeShlagemon,
  (mon) => {
    if (mon && !battleActive.value && battleInterval === undefined)
      startBattle()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (battleInterval)
    clearInterval(battleInterval)
})
</script>

<template>
  <div class="battle text-center" @click="attack">
    <div v-if="dex.activeShlagemon && enemy" class="flex items-center justify-center gap-4">
      <div class="mon flex flex-col items-center" :class="{ flash: flashPlayer }">
        <img :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`" class="max-h-32 object-contain" alt="">
        <div class="name">
          {{ dex.activeShlagemon.name }}
        </div>
        <ProgressBar :value="playerHp" :max="dex.activeShlagemon.hp" class="mt-1 w-24" />
        <div class="hp text-sm">
          {{ playerHp }} / {{ dex.activeShlagemon.hp }}
        </div>
      </div>
      <div class="vs font-bold">
        VS
      </div>
      <div v-if="enemy" class="mon flex flex-col items-center" :class="{ flash: flashEnemy }">
        <img :src="`/shlagemons/${enemy.id}/${enemy.id}.png`" class="max-h-32 object-contain" alt="">
        <div class="name">
          {{ enemy.name }} - lvl {{ enemy.lvl }}
        </div>
        <ProgressBar :value="enemyHp" :max="enemy.hp" color="bg-red-500" class="mt-1 w-24" />
        <div class="hp text-sm">
          {{ enemyHp }} / {{ enemy.hp }}
        </div>
      </div>
    </div>
    <div class="mt-2 text-sm">
      Shlagidolar : {{ game.shlagidolar }}
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
