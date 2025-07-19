<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { BOARD_SIZE, useBattleship } from '~/composables/useBattleship'

const emit = defineEmits(['win', 'lose'])
const { playerBoard, aiBoard, turn, finished, attack } = useBattleship(w => emit(w ? 'win' : 'lose'))

const wrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(wrapper)
const size = computed(() => Math.min(width.value, height.value))
</script>

<template>
  <div ref="wrapper" class="flex flex-1 flex-col items-center justify-center gap-2" md="flex-row gap-4">
    <div class="grid gap-1" md="gap-2" :style="{ gridTemplateColumns: `repeat(${BOARD_SIZE},1fr)`, width: `${size}px`, height: `${size}px` }">
      <div
        v-for="(cell, i) in playerBoard"
        :key="`p-${i}`"
        class="aspect-square flex-center rounded text-xs"
        :class="[
          cell.hit
            ? cell.ship
              ? 'bg-red-500'
              : 'bg-gray-400'
            : cell.ship
              ? 'bg-blue-400 dark:bg-blue-700'
              : 'bg-blue-100 dark:bg-blue-800',
        ]"
      />
    </div>
    <div class="grid gap-1" md="gap-2" :style="{ gridTemplateColumns: `repeat(${BOARD_SIZE},1fr)`, width: `${size}px`, height: `${size}px` }">
      <button
        v-for="(cell, i) in aiBoard"
        :key="`a-${i}`"
        class="aspect-square flex-center rounded bg-blue-100 text-xs dark:bg-blue-800"
        :class="cell.hit ? (cell.ship ? 'bg-red-500' : 'bg-gray-400') : ''"
        :hover="!cell.hit && !finished && turn === 'player' ? 'bg-blue-200 dark:bg-blue-700' : undefined"
        :disabled="cell.hit || finished || turn !== 'player'"
        @click="attack(i)"
      />
    </div>
  </div>
</template>
