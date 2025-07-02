<script setup lang="ts">
import { toast } from 'vue3-toastify'
import CaptureMenu from '~/components/battle/CaptureMenu.vue'
import ShlagemonType from '~/components/shlagemon/ShlagemonType.vue'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import { allShlagemons } from '~/data/shlagemons'
import { useGameStore } from '~/stores/game'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { computeDamage } from '~/utils/combat'
import { applyStats, createDexShlagemon, xpRewardForLevel } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const game = useGameStore()
const zone = useZoneStore()

const playerHp = ref(0)
const enemyHp = ref(0)
const enemy = ref<ReturnType<typeof createDexShlagemon> | null>(null)
const battleActive = ref(false)
const flashPlayer = ref(false)
const flashEnemy = ref(false)
let battleInterval: number | undefined

function onCapture(success: boolean) {
  if (!success)
    return
  battleActive.value = false
  if (battleInterval)
    clearInterval(battleInterval)
  battleInterval = undefined
  enemy.value = null
  setTimeout(startBattle, 1000)
}

function startBattle() {
  const active = dex.activeShlagemon
  if (!active)
    return
  const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
  enemy.value = createDexShlagemon(base)
  const min = Number(zone.current.minLevel ?? 1)
  const zoneMax = Number(zone.current.maxLevel ?? (min + 1))
  const max = Math.max(zoneMax - 1, min)
  const lvl = Math.floor(Math.random() * (max - min + 1)) + min
  enemy.value.lvl = lvl
  applyStats(enemy.value)
  active.hpCurrent = active.hp
  playerHp.value = active.hpCurrent
  enemyHp.value = enemy.value.hp
  battleActive.value = true
  battleInterval = window.setInterval(tick, 1000)
}

function attack() {
  if (!battleActive.value || !enemy.value || !dex.activeShlagemon)
    return
  const atkType = dex.activeShlagemon.base.types[0]
  const defType = enemy.value.base.types[0]
  const { damage, effect } = computeDamage(
    dex.activeShlagemon.attack,
    atkType,
    defType,
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
  const atkType = dex.activeShlagemon.base.types[0]
  const defType = enemy.value.base.types[0]
  const { damage: dmgToEnemy, effect: eff1 } = computeDamage(
    dex.activeShlagemon.attack,
    atkType,
    defType,
  )
  if (eff1 === 'super')
    toast('C’est super efficace !')
  else if (eff1 === 'not')
    toast('Pas très efficace...')
  enemyHp.value = Math.max(0, enemyHp.value - dmgToEnemy)
  flashEnemy.value = true
  setTimeout(() => (flashEnemy.value = false), 100)
  const atkType2 = enemy.value.base.types[0]
  const defType2 = dex.activeShlagemon.base.types[0]
  const { damage: dmgToPlayer, effect: eff2 } = computeDamage(
    enemy.value.attack,
    atkType2,
    defType2,
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
      game.addShlagidolar(zone.rewardMultiplier)
      if (dex.activeShlagemon && enemy.value) {
        dex.gainXp(
          dex.activeShlagemon,
          xpRewardForLevel(enemy.value.lvl),
          zone.current.maxLevel,
        )
      }
    }
    setTimeout(startBattle, 1000)
  }
}

watch(
  () => dex.activeShlagemon,
  (mon) => {
    if (!mon)
      return
    playerHp.value = mon.hpCurrent
    if (!battleActive.value && battleInterval === undefined)
      startBattle()
  },
  { immediate: true },
)

watch(
  () => zone.current.id,
  () => {
    if (battleInterval)
      clearInterval(battleInterval)
    battleInterval = undefined
    battleActive.value = false
    startBattle()
  },
)

onUnmounted(() => {
  if (battleInterval)
    clearInterval(battleInterval)
})
</script>

<template>
  <div class="battle text-center">
    <div v-if="zone.current.maxLevel" class="mb-1 font-bold">
      {{ zone.current.name }} (lvl {{ zone.current.minLevel }} à {{ zone.current.maxLevel }})
    </div>
    <div v-if="dex.activeShlagemon && enemy" class="flex flex-1 flex-col items-center gap-2">
      <div class="w-full flex flex-1 items-center justify-center gap-4">
        <div class="mon flex flex-1 flex-col items-center justify-end" :class="{ flash: flashPlayer }">
          <img :src="`/shlagemons/${dex.activeShlagemon.base.id}/${dex.activeShlagemon.base.id}.png`" class="max-h-32 object-contain" :alt="dex.activeShlagemon.base.name">
          <div class="name">
            {{ dex.activeShlagemon.base.name }}
          </div>
          <div class="mt-1 flex gap-1">
            <ShlagemonType
              v-for="t in dex.activeShlagemon.base.types"
              :key="t.id"
              :value="t"
            />
          </div>
          <ProgressBar :value="playerHp" :max="dex.activeShlagemon.hp" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ playerHp }} / {{ dex.activeShlagemon.hp }}
          </div>
        </div>
        <div class="vs font-bold">
          VS
        </div>
        <div v-if="enemy" class="mon flex flex-1 flex-col select-none items-center" :class="{ flash: flashEnemy }" @click="attack">
          <img :src="`/shlagemons/${enemy.base.id}/${enemy.base.id}.png`" class="max-h-32 object-contain" :alt="enemy.base.name">
          <div class="name">
            {{ enemy.base.name }} - lvl {{ enemy.lvl }}
          </div>
          <div class="mt-1 flex gap-1">
            <ShlagemonType
              v-for="t in enemy.base.types"
              :key="t.id"
              :value="t"
            />
          </div>
          <ProgressBar :value="enemyHp" :max="enemy.hp" color="bg-red-500" class="mt-1 w-24" />
          <div class="hp text-sm">
            {{ enemyHp }} / {{ enemy.hp }}
          </div>
        </div>
      </div>
      <CaptureMenu :enemy="enemy" @capture="onCapture" />
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
