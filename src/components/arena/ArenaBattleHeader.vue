<script setup lang="ts">
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import { useArenaStore } from '~/stores/arena'

const arena = useArenaStore()
</script>

<template>
  <div class="w-full flex items-center justify-center gap-2 overflow-hidden font-bold">
    <div class="flex gap-1 md:gap-2">
      <div
        v-for="(mon, i) in arena.enemyTeam"
        :key="mon.id"
        class="h-8 w-8 flex-center border rounded md:h-10 md:w-10"
        :class="[
          i === arena.currentIndex
            ? 'bg-blue-500/40 border-blue-500 dark:border-blue-400'
            : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600',
        ]"
      >
        <ShlagemonImage
          :id="mon.base.id"
          :alt="mon.base.name"
          class="h-full w-full object-contain"
          :class="{ 'saturate-0': i < arena.currentIndex }"
        />
      </div>
    </div>
  </div>
</template>
