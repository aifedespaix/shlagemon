<script setup lang="ts">
import { starters } from '~/data/shlagemons'

const game = useGameStore()
const dex = useShlagedexStore()

const totalInDex = starters.length
</script>

<template>
  <div
    class="inline-flex items-center justify-around gap-3 rounded bg-white p-2 text-xs dark:bg-gray-900"
    sm="text-sm p-3"
  >
    <div class="flex flex-col items-center">
      <span>Shlagidolars</span>
      <span class="font-bold">{{ game.shlagidolar }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span>Shlagédex</span>
      <span class="font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
    </div>
  </div>
</template>
