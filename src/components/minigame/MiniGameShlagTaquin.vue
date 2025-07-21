<script setup lang="ts">
import { useElementSize, useEventListener } from '@vueuse/core'
import { useSlidingPuzzle } from '~/composables/useSlidingPuzzle'

const props = withDefaults(defineProps<{ difficulty?: 'easy' | 'hard' }>(), {
  difficulty: 'easy',
})
const emit = defineEmits<{ (e: 'gameEnd', result: 'success'): void }>()

const size = computed(() => props.difficulty === 'hard' ? 4 : 3)

const puzzle = reactive(useSlidingPuzzle(size.value))
const visibleTiles = computed(() =>
  puzzle.tiles
    .map((id, idx) => ({ id, idx }))
    .filter(t => puzzle.solved || t.id !== size.value * size.value - 1),
)
const tilePercent = computed(() => 100 / size.value)

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const boardSize = computed(() => Math.min(width.value, height.value))

watch(size, () => {
  Object.assign(puzzle, useSlidingPuzzle(size.value))
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if (puzzle.solved)
    return
  if (e.key === 'ArrowUp')
    puzzle.move('up')
  else if (e.key === 'ArrowDown')
    puzzle.move('down')
  else if (e.key === 'ArrowLeft')
    puzzle.move('left')
  else if (e.key === 'ArrowRight')
    puzzle.move('right')
})

watch(() => puzzle.solved, (v) => {
  if (v)
    setTimeout(() => emit('gameEnd', 'success'), 1000)
})
</script>

<template>
  <div ref="wrapper" class="relative h-full w-full flex flex-1 items-center justify-center bg-red">
    <div class="direction-button left-4 right-4 top-0 h-4" type="icon" @click="puzzle.move('up')">
      <div class="i-mdi:arrow-up" />
    </div>
    <div class="direction-button bottom-4 left-0 top-4 w-4" type="icon" @click="puzzle.move('left')">
      <div class="i-mdi:arrow-left" />
    </div>
    <div class="direction-button bottom-4 right-0 top-4 w-4" type="icon" @click="puzzle.move('right')">
      <div class="i-mdi:arrow-right" />
    </div>
    <div class="direction-button bottom-0 left-4 right-4 h-4" type="icon" @click="puzzle.move('down')">
      <div class="i-mdi:arrow-down" />
    </div>
    <div class="relative flex items-center" :style="{ width: `${boardSize}px`, height: `${boardSize}px` }">
      <img v-if="puzzle.solved" :src="puzzle.image" alt="image" class="absolute inset-0 h-full w-full rounded">
      <div
        v-for="tile in visibleTiles"
        :key="tile.id"
        class="absolute overflow-hidden rounded bg-gray-200 dark:bg-gray-700"
        :style="{
          width: `${tilePercent}%`,
          height: `${tilePercent}%`,
          transition: 'transform 0.3s',
          transform: `translate(${(tile.idx % size) * tilePercent}%, ${Math.floor(tile.idx / size) * tilePercent}%)`,
          backgroundImage: `url(${puzzle.image})`,
          backgroundSize: `${size * 100}% ${size * 100}%`,
          backgroundPosition: `${(tile.id % size) * (100 / (size - 1))}% ${(Math.floor(tile.id / size)) * (100 / (size - 1))}%`,
        }"
        @click="puzzle.moveTile(tile.idx)"
      />
    </div>
    <div v-if="puzzle.solved" class="mt-2 animate-bounce text-xl font-bold">
      Gagné !
    </div>
  </div>
</template>

<style scoped>
.direction-button {
  @apply flex justify-center items-center absolute;
}
</style>
