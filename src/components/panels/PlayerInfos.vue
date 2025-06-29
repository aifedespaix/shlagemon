<script setup lang="ts">
import { starters } from '~/data/shlagemons'

const game = useGameStore()
const dex = useShlagedexStore()

const totalInDex = starters.length
</script>

<template>
  <div
    class="flex justify-around rounded bg-white p-2 text-xs dark:bg-gray-900"
    sm="text-sm p-3"
  >
    <div class="flex flex-col items-center">
      <span>Shlagidolars</span>
      <span class="font-bold">{{ game.shlagidolar }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span>Shlagédex</span>
      <span class="font-bold">{{ dex.shlagemons.length }} / {{ totalInDex }}</span>
    </div>
  </div>
</template>
