<script setup lang="ts">
import type { Stoppable } from '@vueuse/shared'
import type { DexShlagemon } from '~/type/shlagemon'
import { cloneDexShlagemon } from '~/utils/clone'
import { delay } from '~/utils/delay'
import { applyCurrentStats, applyStats } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const arena = useArenaStore()
const featureLock = useFeatureLockStore()
const panel = useMainPanelStore()
const savedActive = ref<DexShlagemon | null>(null)
const { t } = useI18n()

const enemyTeam = computed(() => arena.lineup)
const enemyDexTeam = computed(() => arena.lineupDex)
const showDex = ref(false)
const activeSlot = ref<number | null>(null)
const selectedEnemy = computed(() =>
  activeSlot.value !== null ? enemyDexTeam.value[activeSlot.value] : undefined,
)
const showDuel = ref(false)
const infoModal = useDexInfoModalStore()
let nextTimer: Stoppable<[]> | undefined

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

function openEnemy(index: number) {
  infoModal.open(enemyDexTeam.value[index])
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

function quit() {
  arena.reset()
  panel.showVillage()
}

function startBattle() {
  dex.clearEffects()
  const team = arena.selections
    .map(id => dex.shlagemons.find(m => m.id === (id || ''))!)
    .map((mon) => {
      const clone = cloneDexShlagemon(toRaw(mon))
      applyStats(clone)
      applyCurrentStats(clone)
      clone.hpCurrent = clone.hp
      return clone
    })
  const enemies = enemyDexTeam.value.map((m) => {
    const clone = cloneDexShlagemon(toRaw(m))
    clone.hpCurrent = clone.hp
    return clone
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
    nextTimer = useTimeoutFn(proceedNext, 250)
  }
}

function proceedNext() {
  nextTimer?.stop()
  arena.currentIndex += 1
  showDuel.value = true
}

onMounted(() => {
  savedActive.value = dex.activeShlagemon
  featureLock.lockAll()
})
onUnmounted(() => {
  nextTimer?.stop()
  featureLock.unlockAll()
  if (savedActive.value)
    dex.setActiveShlagemon(savedActive.value)
})
</script>

<template>
  <div class="tiny-scrollbar relative h-full w-full flex flex-col items-center overflow-auto">
    <div v-show="!showDuel" class="grid grid-rows-[auto_auto_auto_auto] grid-cols-6 max-w-120 w-full gap-2">
      <button
        v-for="(enemy, i) in enemyTeam"
        :key="enemy.id"
        class="aspect-square border-red-600 rounded-full bg-red-500/40"
        @click="openEnemy(i)"
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
        v-for="(_, i) in enemyTeam"
        :key="i"
        class="aspect-square border-blue-600 rounded-full bg-blue-500/30"
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
        <template v-else>
          <div class="h-full w-full flex-center">
            <div class="i-carbon:touch-1 text-3xl color-blue-600 dark:color-blue-300" />
          </div>
        </template>
      </button>

      <div class="col-span-6 flex flex-col gap-2">
        <UiInfo v-if="playerSelection.some(m => !m)" color="danger" class="text-center text-xs">
          {{ t('components.arena.Panel.selectSix') }}
        </UiInfo>
        <div class="col-span-6 flex flex-col gap-2">
          <UiInfo color="alert" class="text-center text-xs">
            {{ t('components.arena.Panel.autoBattleInfo') }}
          </UiInfo>
          <div class="flex gap-2">
            <UiButton
              type="danger"
              variant="outline"
              @click="quit"
            >
              {{ t('components.arena.Panel.quit') }}
            </UiButton>
            <UiButton
              type="primary"
              class="flex-1"
              :disabled="playerSelection.some(m => !m)"
              @click="startBattle"
            >
              {{ t('components.arena.Panel.fight') }}
            </UiButton>
            <UiTooltip :text="t('components.arena.Panel.autoSelect')" is-button>
              <UiButton
                type="icon"
                class="bottom-0 left-0 z-10 rounded-full"
                @click="autoSelect"
              >
                <div i-carbon-magic-wand />
              </UiButton>
            </UiTooltip>
          </div>
        </div>
        <UiModal v-model="showDex" footer-close @select="onMonSelected">
          <ArenaSelectionModal v-if="selectedEnemy" :mon="selectedEnemy" :selected="arena.selections.filter(Boolean) as string[]" />
        </UiModal>
      </div>
    </div>
    <div v-if="showDuel" class="w-full flex flex-1 flex-col items-center gap-2">
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
