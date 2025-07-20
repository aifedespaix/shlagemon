<script setup lang="ts">
import { useElementSize, useTimeoutFn } from '@vueuse/core'
import { COLS, ROWS, useConnectFour } from '~/composables/useConnectFour'

const emit = defineEmits(['win', 'lose'])

const { board, finished, winningCells, lastMove, reset, play } = useConnectFour()

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const boardWidth = computed(() => Math.min(width.value, height.value * COLS / ROWS))
const boardHeight = computed(() => boardWidth.value * ROWS / COLS)

watch(winningCells, (cells) => {
  if (!cells.length)
    return
  const win = board.value[cells[0]] === 'player'
  useTimeoutFn(() => emit(win ? 'win' : 'lose'), 800)
})

function onClick(i: number) {
  if (finished.value)
    return
  const col = i % COLS
  play(col)
}

onMounted(reset)
</script>

<template>
  <div ref="wrapper" class="flex flex-1 items-center justify-center">
    <div
      class="relative grid gap-1 rounded p-2" md="gap-2 p-3"
      :style="{ gridTemplateColumns: `repeat(${COLS},1fr)`, width: `${boardWidth}px`, height: `${boardHeight}px`, background: '#3755a4' }"
    >
      <button
        v-for="(cell, i) in board"
        :key="i"
        class="relative aspect-square flex items-center justify-center overflow-hidden rounded-full bg-[#1e2f70]"
        :hover="!finished.value ? 'scale-105' : undefined"
        @click="onClick(i)"
      >
        <div
          v-if="cell"
          class="absolute inset-0 m-auto h-4/5 w-4/5 rounded-full"
          :class="[
            cell === 'player' ? 'bg-[#ff4444] dark:bg-[#ff5555]' : 'bg-[#fce83a] border-2 border-yellow-700',
            lastMove === i ? 'animate-drop' : '',
            winningCells.includes(i) ? 'animate-glow' : '',
          ]"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes drop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 0px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 1);
  }
}

.animate-drop {
  animation: drop 0.3s ease-out;
}

.animate-glow {
  animation: glow 1s ease-in-out infinite;
}
</style>
