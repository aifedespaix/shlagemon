<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import ArenaDuel from '~/components/arena/ArenaDuel.vue'
import ArenaDefeatDialog from '~/components/dialog/ArenaDefeatDialog.vue'
import Modal from '~/components/modal/Modal.vue'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import ShlagemonQuickSelect from '~/components/shlagemon/ShlagemonQuickSelect.vue'
import Button from '~/components/ui/Button.vue'
import { allShlagemons } from '~/data/shlagemons'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShlagedexStore } from '~/stores/shlagedex'
import { applyStats, createDexShlagemon } from '~/utils/dexFactory'

const dex = useShlagedexStore()
const arena = useArenaStore()
const panel = useMainPanelStore()

const enemyTeam = ref(allShlagemons.slice(0, 6))
const showDex = ref(false)
const activeSlot = ref<number | null>(null)
const showDefeat = ref(false)
const showDuel = ref(false)
const duelResult = ref<'win' | 'lose' | null>(null)
let nextTimer: number | undefined

const hasNextDuel = computed(() =>
  arena.currentIndex < arena.team.length - 1,
)

const playerSelection = computed(() =>
  arena.selections.map(id => dex.shlagemons.find(m => m.id === id) || null),
)

onMounted(() => {
  enemyTeam.value = allShlagemons.slice().sort(() => Math.random() - 0.5).slice(0, 6)
  arena.setLineup(enemyTeam.value)
})

function openDex(i: number) {
  activeSlot.value = i
  showDex.value = true
}

watch(() => dex.activeShlagemon, (mon) => {
  if (!showDex.value || activeSlot.value === null || !mon)
    return
  arena.selectPlayer(activeSlot.value, mon.id)
  showDex.value = false
})

function retryBattle() {
  arena.reset()
  arena.setLineup(enemyTeam.value)
  showDefeat.value = false
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
    nextTimer = window.setTimeout(proceedNext, 800)
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
  <div class="h-full flex flex-col items-center gap-4">
    <div class="flex gap-2 border border-red-600 rounded bg-red-500/20 p-2" md="gap-4 p-3">
      <div
        v-for="enemy in enemyTeam"
        :key="enemy.id"
        class="h-12 w-12 flex-center border-2 border-red-600 rounded-full bg-red-500/40"
        md="h-16 w-16"
      >
        <ShlagemonImage :id="enemy.id" :alt="enemy.name" class="h-10 w-10 object-contain" md="h-14 w-14" />
      </div>
    </div>
    <div class="flex gap-2 text-red-600" md="gap-4">
      <div v-for="enemy in enemyTeam" :key="enemy.id" class="i-carbon-chevron-down h-6 w-6" md="h-8 w-8" />
    </div>
    <div class="flex gap-2 border border-blue-600 rounded bg-blue-500/20 p-2" md="gap-4 p-3">
      <button
        v-for="(enemy, i) in enemyTeam"
        :key="i"
        class="h-12 w-12 flex-center border-2 border-blue-600 rounded-full bg-blue-500/30"
        md="h-16 w-16"
        @click="openDex(i)"
      >
        <template v-if="playerSelection[i]">
          <ShlagemonImage
            :id="playerSelection[i]!.base.id"
            :alt="playerSelection[i]!.base.name"
            :shiny="playerSelection[i]!.isShiny"
            class="h-10 w-10 object-contain" md="h-14 w-14"
          />
        </template>
      </button>
    </div>
    <Button
      type="primary"
      class="mx-auto"
      :disabled="playerSelection.some(m => !m)"
      @click="startBattle"
    >
      Combattre
    </Button>
    <p class="text-center text-xs">
      Le combat est automatique et se déroule sans clics.
    </p>
    <Modal v-model="showDex" footer-close>
      <h3 v-if="activeSlot !== null" class="mb-2 text-center text-lg font-bold">
        Choisir un Shlagémon contre {{ enemyTeam[activeSlot].name }}
      </h3>
      <ShlagemonQuickSelect />
    </Modal>
    <Modal v-model="showDuel" :close-on-outside-click="false">
      <ArenaDuel
        v-if="showDuel && duelResult === null"
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
    </Modal>
    <Modal v-model="showDefeat" :close-on-outside-click="false">
      <ArenaDefeatDialog @retry="retryBattle" @quit="quitArena" />
    </Modal>
  </div>
</template>
