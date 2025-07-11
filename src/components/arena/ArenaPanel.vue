<script setup lang="ts">
import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { computed, onUnmounted, ref, toRaw, watch } from 'vue'
import { toast } from 'vue3-toastify'
import ArenaBattleHeader from '~/components/arena/ArenaBattleHeader.vue'
import ArenaDuel from '~/components/arena/ArenaDuel.vue'
import ArenaEnemyStats from '~/components/arena/ArenaEnemyStats.vue'
import Modal from '~/components/modal/Modal.vue'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import ShlagemonQuickSelect from '~/components/shlagemon/ShlagemonQuickSelect.vue'
import Button from '~/components/ui/Button.vue'
import { useArenaStore } from '~/stores/arena'
import { useDialogStore } from '~/stores/dialog'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { applyStats, createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const arena = useArenaStore()
const dialog = useDialogStore()
const panel = useMainPanelStore()

const enemyTeam = computed(() => arena.lineup)
const showDex = ref(false)
const activeSlot = ref<number | null>(null)
const showDuel = ref(false)
const showEnemy = ref(false)
const enemyDetail = ref<BaseShlagemon | null>(null)
const duelResult = ref<'win' | 'lose' | null>(null)
let nextTimer: number | undefined

const hasNextDuel = computed(() =>
  arena.currentIndex < arena.team.length - 1,
)

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
      const clone = structuredClone(toRaw(mon))
      applyStats(clone)
      clone.hpCurrent = clone.hp
      return clone
    })
  const enemies = enemyTeam.value.map((b) => {
    const m = createDexShlagemon(b)
    const lvl = arena.arenaData?.level ?? 1
    m.lvl = lvl
    applyStats(m)
    return m
  })
  arena.start(team, enemies)
  arena.currentIndex = 0
  duelResult.value = null
  showDuel.value = true
}

function onDuelEnd(win: boolean) {
  duelResult.value = win ? 'win' : 'lose'
  if (!win) {
    arena.finish(false)
    // keep the duel open so the player can choose what to do
    return
  }

  if (arena.currentIndex >= arena.team.length - 1) {
    arena.finish(true)
    nextTimer = window.setTimeout(closeVictory, 500)
  }
  else {
    nextTimer = window.setTimeout(proceedNext, 250)
  }
}

function proceedNext() {
  clearTimeout(nextTimer)
  duelResult.value = null
  arena.currentIndex += 1
  showDuel.value = true
}

function closeVictory() {
  clearTimeout(nextTimer)
  showDuel.value = false
  toast.success('Victoire !')
}

function retry() {
  const data = arena.arenaData
  if (!data)
    return
  dialog.resetArenaDialogs()
  arena.reset()
  arena.setArena(data)
  duelResult.value = null
  showDuel.value = false
}

function quit() {
  arena.reset()
  dialog.resetArenaDialogs()
  panel.showVillage()
}

onUnmounted(() => clearTimeout(nextTimer))
</script>

<template>
  <div class="tiny-scrollbar overflow-auto">
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
        <Info v-if="playerSelection.some(m => !m)" color="danger" class="text-center text-xs">
          Vous devez selectionner 6 Shlagémons pour combattre dans l'arène
        </Info>
        <div class="col-span-6 flex flex-col gap-2">
          <Info color="alert" class="text-center text-xs">
            Le combat est automatique et se déroule sans clics.
          </Info>
          <Button
            type="primary"
            class="mx-auto"
            :disabled="playerSelection.some(m => !m)"
            @click="startBattle"
          >
            Combattre
          </Button>
          <Button
            type="danger"
            variant="outline"
            class="mx-auto"
            @click="quit"
          >
            Abandonner
          </Button>
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
    <div v-if="showDuel" class="mt-2 flex flex-col items-center gap-2">
      <ArenaDuel
        v-if="duelResult === null"
        :player="arena.team[arena.currentIndex]"
        :enemy="arena.enemyTeam[arena.currentIndex]"
        @end="onDuelEnd"
      >
        <template #header>
          <ArenaBattleHeader />
        </template>
      </ArenaDuel>
      <div v-else class="flex flex-col items-center gap-2">
        <div
          :class="duelResult === 'win'
            ? 'text-green-600 font-bold dark:text-green-400'
            : 'text-red-600 font-bold dark:text-red-400'"
        >
          {{ duelResult === 'win' ? 'Victoire !' : 'Défaite...' }}
        </div>
        <Button v-if="duelResult === 'win' && !hasNextDuel" type="primary" @click="closeVictory">
          Fermer
        </Button>
        <template v-else-if="duelResult === 'lose'">
          <Button type="primary" @click="retry">
            Réessayer
          </Button>
          <Button type="danger" @click="quit">
            Quitter l'arène
          </Button>
        </template>
      </div>
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
