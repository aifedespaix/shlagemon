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
const wrapper = ref<HTMLElement | null>(null)
const { width } = useElementSize(wrapper)
const tileSize = computed(() => width.value / size.value)

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
  <div class="flex flex-col items-center gap-2">
    <div class="flex gap-2">
      <UiButton type="icon" @click="puzzle.move('up')">
        <div class="i-mdi:arrow-up" />
      </UiButton>
    </div>
    <div class="flex items-center gap-2">
      <UiButton type="icon" @click="puzzle.move('left')">
        <div class="i-mdi:arrow-left" />
      </UiButton>
      <div ref="wrapper" class="relative" :style="{ width: `${tileSize * size}px`, height: `${tileSize * size}px` }">
        <img
          v-if="puzzle.solved"
          :src="puzzle.image"
          alt="image"
          class="absolute inset-0 z-10 h-full w-full rounded"
        >
        <div
          v-for="tile in visibleTiles"
          :key="tile.id"
          class="absolute overflow-hidden rounded bg-gray-200 dark:bg-gray-700"
          :style="{
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            transition: 'transform 0.3s',
            transform: `translate(${(tile.idx % size) * tileSize}px, ${Math.floor(tile.idx / size) * tileSize}px)`,
            backgroundImage: `url(${puzzle.image})`,
            backgroundSize: `${size * 100}% ${size * 100}%`,
            backgroundPosition: `${(tile.id % size) * (100 / (size - 1))}% ${(Math.floor(tile.id / size)) * (100 / (size - 1))}%`,
          }"
          @click="puzzle.moveTile(tile.idx)"
        />
      </div>
      <UiButton type="icon" @click="puzzle.move('right')">
        <div class="i-mdi:arrow-right" />
      </UiButton>
    </div>
    <div class="flex gap-2">
      <UiButton type="icon" @click="puzzle.move('down')">
        <div class="i-mdi:arrow-down" />
      </UiButton>
    </div>
    <div v-if="puzzle.solved" class="mt-2 animate-bounce text-xl font-bold">
      Gagné !
    </div>
  </div>
</template>
