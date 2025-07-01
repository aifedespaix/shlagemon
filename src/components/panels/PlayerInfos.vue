<script setup lang="ts">
import { allShlagemons } from '~/data/shlagemons'

const game = useGameStore()
const dex = useShlagedexStore()

const totalInDex = allShlagemons.length
</script>

<template>
  <div
    class="w-full inline-flex items-center justify-around gap-3 rounded bg-white text-xs dark:bg-gray-900"
    sm="text-sm"
  >
    <div class="flex items-center gap-2">
      <span>Shlagidolars</span>
      <span class="font-bold">{{ game.shlagidolar }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span>Shlagédiamonds</span>
      <span class="font-bold">{{ game.shlagidiamond }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span>Shlagédex</span>
      <span class="font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
    </div>
  </div>
</template>
