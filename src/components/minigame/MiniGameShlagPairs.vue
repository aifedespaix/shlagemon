<script setup lang="ts">
import { useElementSize, useTimeoutFn } from '@vueuse/core'
import { allShlagemons } from '~/data/shlagemons'
import { useAudioStore } from '~/stores/audio'

const emit = defineEmits(['win'])
const audio = useAudioStore()

interface Cell {
  id: number
  monId: string
  state: 'hidden' | 'revealed' | 'matched'
}

const GRID_SIZE = 6

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const size = computed(() => Math.min(width.value, height.value))

const board = ref<Cell[]>([])
const attempts = ref(0)
const selected = ref<Cell[]>([])

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function reset() {
  const mons = shuffle(allShlagemons).slice(0, (GRID_SIZE * GRID_SIZE) / 2)
  const cells: Cell[] = shuffle(
    mons.flatMap(m => [{ monId: m.id }, { monId: m.id }]),
  ).map((m, i) => ({ id: i, monId: m.monId, state: 'hidden' }))
  board.value = cells
  attempts.value = 0
  selected.value = []
}

function checkWin() {
  if (board.value.every(c => c.state === 'matched'))
    useTimeoutFn(() => emit('win'), 300)
}

function hideSelected() {
  selected.value.forEach((c) => {
    c.state = 'hidden'
  })
  selected.value = []
}

function matchSelected() {
  selected.value.forEach((c) => {
    c.state = 'matched'
  })
  selected.value = []
  checkWin()
}

function choose(cell: Cell) {
  if (cell.state !== 'hidden' || selected.value.length >= 2)
    return
  cell.state = 'revealed'
  audio.playSfx('/audio/sfx/mini-game/shlagpairs/turn.ogg')
  selected.value.push(cell)
  if (selected.value.length === 2) {
    if (selected.value[0].monId === selected.value[1].monId) {
      useTimeoutFn(matchSelected, 300)
    }
    else {
      attempts.value += 1
      useTimeoutFn(hideSelected, 600)
    }
  }
}

onMounted(reset)
</script>

<template>
  <div class="w-full flex flex-1 flex-col items-center">
    <div ref="wrapper" class="w-full flex flex-1 items-center justify-center">
      <div
        class="grid gap-1" md="gap-2"
        :style="{ gridTemplateColumns: `repeat(${GRID_SIZE},1fr)`, width: `${size}px`, height: `${size}px` }"
      >
        <button
          v-for="cell in board"
          :key="cell.id"
          class="relative aspect-square select-none"
          :class="cell.state === 'matched' ? 'animate-pulse' : ''"
          @click="choose(cell)"
        >
          <div class="absolute inset-0 preserve-3d transition-transform duration-300" :class="cell.state !== 'hidden' ? 'rotate-y-180' : ''">
            <div class="backface-hidden absolute inset-0 h-full w-full flex-center rounded bg-gray-200 dark:bg-gray-700" />
            <div class="backface-hidden absolute inset-0 h-full w-full flex-center rotate-y-180 rounded bg-white dark:bg-gray-900">
              <img :src="`/shlagemons/${cell.monId}/${cell.monId}.webp`" class="h-5/6 w-5/6 object-cover" :alt="cell.monId">
            </div>
          </div>
        </button>
      </div>
    </div>
    <div class="mt-2 text-center text-sm font-bold">
      {{ attempts }} tentative{{ attempts > 1 ? 's' : '' }}
    </div>
  </div>
</template>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
