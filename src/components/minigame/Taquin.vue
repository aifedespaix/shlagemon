<script setup lang="ts">
import type { PuzzleDirection } from '~/composables/useSlidingPuzzle'
import { useElementSize, useEventListener, useSwipe, useTimeoutFn } from '@vueuse/core'
import { useSlidingPuzzle } from '~/composables/useSlidingPuzzle'

const props = withDefaults(defineProps<{ difficulty?: 'easy' | 'hard' }>(), {
  difficulty: 'easy',
})
const emit = defineEmits<{ (e: 'win'): void }>()

const size = computed(() => props.difficulty === 'hard' ? 4 : 3)

const puzzle = useSlidingPuzzle(size)
const visibleTiles = computed(() =>
  puzzle.tiles.value
    .map((id, idx) => ({ id, idx }))
    .filter(t => puzzle.solved.value || t.id !== size.value * size.value - 1),
)
const tilePercent = computed(() => 100 / size.value)

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const squareSize = computed(() => Math.min(width.value, height.value))

useSwipe(wrapper, {
  onSwipeEnd(_: Event, dir: PuzzleDirection | 'none') {
    if (puzzle.solved.value || puzzle.shuffling.value)
      return
    if (dir !== 'none')
      puzzle.move(dir)
  },
})

onMounted(() => {
  const el = wrapper.value
  if (!el)
    return

  const preventScroll = (e: TouchEvent) => e.preventDefault()
  el.addEventListener('touchmove', preventScroll, { passive: false })

  onUnmounted(() => {
    el.removeEventListener('touchmove', preventScroll)
  })
})

useEventListener('keydown', (e: KeyboardEvent) => {
  if (puzzle.solved.value || puzzle.shuffling.value)
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

onMounted(async () => {
  await nextTick()
  setTimeout(async () => {
    await puzzle.shuffleBoard(50, 80)
  }, 500)
})

watch(size, async () => {
  puzzle.reset()
  await nextTick()
  setTimeout(async () => {
    await puzzle.shuffleBoard(50, 80)
  }, 500)
})

watch(puzzle.solved, (v) => {
  if (v)
    useTimeoutFn(() => emit('win'), 2000)
})

const shuffling = computed(() => puzzle.shuffling.value)
</script>

<template>
  <div ref="wrapper" class="flex flex-1 items-center justify-center">
    <div
      class="relative flex flex-col items-center justify-center"
      :style="{ width: `${squareSize}px`, height: `${squareSize}px`, overflow: 'hidden' }"
    >
      <div
        class="direction-button left-8 right-8 top-0 h-8"
        :class="{ 'opacity-50 pointer-events-none': shuffling }"
        type="icon"
        @click="puzzle.move('up')"
      >
        <div class="i-mdi:arrow-up" />
      </div>
      <div
        class="direction-button bottom-8 left-0 top-8 w-8"
        :class="{ 'opacity-50 pointer-events-none': shuffling }"
        type="icon"
        @click="puzzle.move('left')"
      >
        <div class="i-mdi:arrow-left" />
      </div>
      <div
        class="direction-button bottom-8 right-0 top-8 w-8"
        :class="{ 'opacity-50 pointer-events-none': shuffling }"
        type="icon"
        @click="puzzle.move('right')"
      >
        <div class="i-mdi:arrow-right" />
      </div>
      <div
        class="direction-button bottom-0 left-8 right-8 h-8"
        :class="{ 'opacity-50 pointer-events-none': shuffling }"
        type="icon"
        @click="puzzle.move('down')"
      >
        <div class="i-mdi:arrow-down" />
      </div>

      <div class="relative h-full w-full">
        <div
          v-for="tile in visibleTiles"
          :key="tile.id"
          class="absolute cursor-pointer overflow-hidden rounded bg-gray-200 dark:bg-gray-700"
          :class="{ 'pointer-events-none': shuffling }"
          :style="{
            width: `${tilePercent}%`,
            height: `${tilePercent}%`,
            left: `${(tile.idx % size) * tilePercent}%`,
            top: `${Math.floor(tile.idx / size) * tilePercent}%`,
            backgroundImage: `url(${puzzle.image.value})`,
            backgroundSize: `${size * 100}% ${size * 100}%`,
            backgroundPosition: `${(tile.id % size) * (100 / (size - 1))}% ${(Math.floor(tile.id / size)) * (100 / (size - 1))}%`,
            transition: 'left 0.3s, top 0.3s',
          }"
          @click="puzzle.moveTile(tile.idx)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.direction-button {
  @apply flex justify-center items-center absolute z-500 cursor-pointer hover:bg-dark/50 rounded-full;
}
</style>
