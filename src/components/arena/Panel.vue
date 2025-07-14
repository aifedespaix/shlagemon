<script setup lang="ts">
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { useArenaStore } from '~/stores/arena'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useShlagedexStore } from '~/stores/shlagedex'
import { cloneDexShlagemon } from '~/utils/clone'
import { delay } from '~/utils/delay'
import { applyStats, createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const arena = useArenaStore()
const featureLock = useFeatureLockStore()

const enemyTeam = computed(() => arena.lineup)
const showDex = ref(false)
const activeSlot = ref<number | null>(null)
const showDuel = ref(false)
const showEnemy = ref(false)
const enemyDetail = ref<BaseShlagemon | null>(null)
let nextTimer: number | undefined

async function autoSelect() {
  const team = dex.shlagemons
    .slice()
    .sort((a, b) => b.attack - a.attack)
    .slice(0, arena.selections.length)

  for (const [i, mon] of team.entries()) {
    arena.selectPlayer(i, mon.id)
    await delay(100)
  }
}

const playerSelection = computed(() =>
  arena.selections.map(id => dex.shlagemons.find(m => m.id === id) || null),
)

function openDex(i: number) {
  activeSlot.value = i
  showDex.value = true
}

function openEnemy(mon: BaseShlagemon) {
  enemyDetail.value = mon
  showEnemy.value = true
}

function onMonSelected(mon: DexShlagemon) {
  if (activeSlot.value === null)
    return
  arena.selectPlayer(activeSlot.value, mon.id)
  showDex.value = false
}

watch(() => dex.activeShlagemon, (mon) => {
  if (!showDex.value || activeSlot.value === null || !mon)
    return
  arena.selectPlayer(activeSlot.value, mon.id)
  showDex.value = false
})

function startBattle() {
  const team = arena.selections
    .map(id => dex.shlagemons.find(m => m.id === (id || ''))!)
    .map((mon) => {
      const clone = cloneDexShlagemon(toRaw(mon))
      applyStats(clone)
      clone.hpCurrent = clone.hp
      return clone
    })
  const enemies = enemyTeam.value.map((b) => {
    const lvl = arena.arenaData?.level ?? 1
    const coefficientMultiplier = lvl / b.coefficient
    const m = createDexShlagemon(b, false, coefficientMultiplier)
    m.lvl = lvl
    applyStats(m)
    return m
  })
  arena.start(team, enemies)
  arena.currentIndex = 0
  showDuel.value = true
}

function onDuelEnd(win: boolean) {
  if (!win) {
    arena.finish(false)
    showDuel.value = false
    return
  }

  if (arena.currentIndex >= arena.team.length - 1) {
    arena.finish(true)
    showDuel.value = false
  }
  else {
    nextTimer = window.setTimeout(proceedNext, 250)
  }
}

function proceedNext() {
  clearTimeout(nextTimer)
  arena.currentIndex += 1
  showDuel.value = true
}

onMounted(featureLock.lockAll)
onUnmounted(() => {
  clearTimeout(nextTimer)
  featureLock.unlockAll()
})
</script>

<template>
  <div class="tiny-scrollbar eee relative h-full flex flex-col overflow-auto">
    <UiButton
      type="icon"
      class="absolute left-0 top-0 z-10 rounded-none rounded-bl rounded-br rounded-tr"
      @click="autoSelect"
    >
      <div i-carbon-magic-wand />
    </UiButton>
    <div v-show="!showDuel" class="grid grid-cols-6 grid-rows-4 h-full w-full gap-2">
      <button
        v-for="enemy in enemyTeam"
        :key="enemy.id"
        class="border-red-600 rounded-full bg-red-500/40"
        @click="openEnemy(enemy)"
      >
        <ShlagemonImage :id="enemy.id" :alt="enemy.name" class="h-full w-full object-contain" />
      </button>
      <div v-for="enemy in enemyTeam" :key="enemy.id" class="flex-center flex-col gap-1 color-red-600">
        <div class="i-game-icons:crossed-sabres text-2xl" />
        <div class="text-sm">
          VS
        </div>
        <div class="i-carbon:chevron-down text-xl" />
      </div>

      <button
        v-for="(enemy, i) in enemyTeam"
        :key="i"
        class="border-blue-600 rounded-full bg-blue-500/30"
        @click="openDex(i)"
      >
        <template v-if="playerSelection[i]">
          <ShlagemonImage
            :id="playerSelection[i]!.base.id"
            :alt="playerSelection[i]!.base.name"
            :shiny="playerSelection[i]!.isShiny"
            class="h-full w-full object-contain"
          />
        </template>
      </button>

      <div class="col-span-6 flex flex-col gap-2">
        <UiInfo v-if="playerSelection.some(m => !m)" color="danger" class="text-center text-xs">
          Vous devez selectionner 6 Shlagémons pour combattre dans l'arène
        </UiInfo>
        <div class="col-span-6 flex flex-col gap-2">
          <UiInfo color="alert" class="text-center text-xs">
            Le combat est automatique et se déroule sans clics.
          </UiInfo>
          <UiButton
            type="primary"
            class="mx-auto"
            :disabled="playerSelection.some(m => !m)"
            @click="startBattle"
          >
            Combattre
          </UiButton>
          <UiButton
            type="danger"
            variant="outline"
            class="mx-auto"
            @click="quit"
          >
            Abandonner
          </UiButton>
        </div>
        <Modal v-model="showDex" footer-close>
          <h3 v-if="activeSlot !== null" class="mb-2 text-center text-lg font-bold">
            Choisir un Shlagémon contre {{ enemyTeam[activeSlot].name }}
          </h3>
          <ShlagemonQuickSelect
            :selected="arena.selections.filter(Boolean) as string[]"
            @select="onMonSelected"
          />
        </Modal>

        <Modal v-model="showEnemy" footer-close>
          <ArenaEnemyStats v-if="enemyDetail" :mon="enemyDetail" />
        </Modal>
      </div>
    </div>
    <div v-if="showDuel" class="flex flex-1 flex-col items-center gap-2">
      <ArenaDuel
        :player="arena.team[arena.currentIndex]"
        :enemy="arena.enemyTeam[arena.currentIndex]"
        @end="onDuelEnd"
      >
        <template #header>
          <ArenaBattleHeader />
        </template>
      </ArenaDuel>
    </div>
  </div>
</template>

<style scoped>
.grid-row {
  @apply w-full flex gap-2 border  p-2 md:gap-4;
}

.grid-item {
  @apply aspect-square flex-center flex-1 border-2;
}
</style>
