<script setup lang="ts">
import { useGameStore } from '~/stores/game'
import { useSchlagedexStore } from '~/stores/schlagedex'

const dex = useSchlagedexStore()
const game = useGameStore()

const playerHp = ref(0)
const enemyHp = ref(0)
const enemy = ref<ReturnType<typeof dex.createShlagemon> | null>(null)
const battleActive = ref(false)

function startBattle() {
  const active = dex.activeShlagemon
  if (!active)
    return
  enemy.value = dex.createShlagemon(active)
  playerHp.value = active.hp
  enemyHp.value = enemy.value.hp
  battleActive.value = true
}

function attack() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  enemyHp.value = Math.max(0, enemyHp.value - dex.activeShlagemon.attack)
  playerHp.value = Math.max(0, playerHp.value - enemy.value.attack)
  if (enemyHp.value <= 0 || playerHp.value <= 0) {
    battleActive.value = false
    if (enemyHp.value <= 0 && playerHp.value > 0)
      game.addShlagidolar(1)
  }
}

watch(battleActive, (v) => {
  if (v)
    startBattle()
})
</script>

<template>
  <div class="battle text-center" @click="attack">
    <div v-if="dex.activeShlagemon && enemy" class="flex items-center justify-center gap-4">
      <div class="mon flex flex-col items-center">
        <img :src="`/shlagemons/${dex.activeShlagemon.id}/${dex.activeShlagemon.id}.png`" class="max-h-32 object-contain" alt="">
        <div class="name">
          {{ dex.activeShlagemon.name }}
        </div>
        <div class="hp text-sm">
          {{ playerHp }} / {{ dex.activeShlagemon.hp }}
        </div>
      </div>
      <div class="vs font-bold">
        VS
      </div>
      <div v-if="enemy" class="mon flex flex-col items-center">
        <img :src="`/shlagemons/${enemy.id}/${enemy.id}.png`" class="max-h-32 object-contain" alt="">
        <div class="name">
          {{ enemy.name }}
        </div>
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
