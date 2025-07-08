<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import ArenaDuel from '~/components/arena/ArenaDuel.vue'
import ArenaEnemyStats from '~/components/arena/ArenaEnemyStats.vue'
import ArenaDefeatDialog from '~/components/dialog/ArenaDefeatDialog.vue'
import Modal from '~/components/modal/Modal.vue'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import ShlagemonQuickSelect from '~/components/shlagemon/ShlagemonQuickSelect.vue'
import Button from '~/components/ui/Button.vue'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { applyStats, createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const arena = useArenaStore()
const panel = useMainPanelStore()

const enemyTeam = ref<BaseShlagemon[]>([])
const showDex = ref(false)
const activeSlot = ref<number | null>(null)
const showDefeat = ref(false)
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

onMounted(() => {
  enemyTeam.value = arena.lineup
  arena.setLineup(enemyTeam.value)
})

function openDex(i: number) {
  activeSlot.value = i
  showDex.value = true
}

function openEnemy(mon: BaseShlagemon) {
  enemyDetail.value = mon
  showEnemy.value = true
}

watch(() => dex.activeShlagemon, (mon) => {
  if (!showDex.value || activeSlot.value === null || !mon)
    return
  arena.selectPlayer(activeSlot.value, mon.id)
  showDex.value = false
})

function retryBattle() {
  arena.reset()
  enemyTeam.value = arena.lineup
  arena.setLineup(enemyTeam.value)
  showDefeat.value = false
  showEnemy.value = false
}

function quitArena() {
  showDefeat.value = false
  arena.reset()
  panel.showVillage()
}

function startBattle() {
  const team = arena.selections
    .map(id => dex.shlagemons.find(m => m.id === (id || ''))!)
    .map((mon) => {
      mon.hpCurrent = mon.hp
      return mon
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
    nextTimer = window.setTimeout(closeAfterDefeat, 500)
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

function closeAfterDefeat() {
  clearTimeout(nextTimer)
  showDuel.value = false
  showDefeat.value = true
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
        </div>
        <Modal v-model="showDex" footer-close>
          <h3 v-if="activeSlot !== null" class="mb-2 text-center text-lg font-bold">
            Choisir un Shlagémon contre {{ enemyTeam[activeSlot].name }}
          </h3>
          <ShlagemonQuickSelect :selected="arena.selections.filter(Boolean) as string[]" />
        </Modal>

        <Modal v-model="showEnemy" footer-close>
          <ArenaEnemyStats v-if="enemyDetail" :mon="enemyDetail" />
        </Modal>

        <Modal v-model="showDefeat" :close-on-outside-click="false">
          <ArenaDefeatDialog @retry="retryBattle" @quit="quitArena" />
        </Modal>
      </div>
    </div>
    <div v-if="showDuel" class="mt-2 flex flex-col items-center gap-2">
      <ArenaDuel
        v-if="duelResult === null"
        :player="arena.team[arena.currentIndex]"
        :enemy="arena.enemyTeam[arena.currentIndex]"
        @end="onDuelEnd"
      />
      <div v-else class="flex flex-col items-center gap-2">
        <div
          :class="duelResult === 'win'
            ? 'text-green-600 font-bold dark:text-green-400'
            : 'text-red-600 font-bold dark:text-red-400'"
        >
          {{ duelResult === 'win' ? 'Victoire !' : 'Défaite...' }}
        </div>
        <Button v-if="duelResult === 'win' && hasNextDuel" type="primary" @click="proceedNext">
          Suivant
        </Button>
        <Button v-else-if="duelResult === 'win'" type="primary" @click="closeVictory">
          Fermer
        </Button>
        <Button v-else type="danger" @click="closeAfterDefeat">
          OK
        </Button>
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
