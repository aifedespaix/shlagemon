<script setup lang="ts">
import { allShlagemons } from '~/data/shlagemons'
import { useInventoryStore } from '~/stores/inventory'

const game = useGameStore()
const dex = useShlagedexStore()
const inventory = useInventoryStore()

const totalInDex = allShlagemons.length
</script>

<template>
  <div
    class="w-full inline-flex items-center justify-around gap-3 rounded bg-white text-xs dark:bg-gray-900"
    sm="text-sm"
  >
    <div class="min-w-0 flex items-center gap-2">
      <span class="truncate">Shlagidolars</span>
      <span class="shrink-0 font-bold">{{ game.shlagidolar }}</span>
    </div>
    <div class="min-w-0 flex items-center gap-2">
      <span class="truncate">Shlagédiamonds</span>
      <span class="shrink-0 font-bold">{{ game.shlagidiamond }}</span>
    </div>
    <div class="min-w-0 flex items-center gap-2">
      <span class="truncate">Shlagédex</span>
      <span class="shrink-0 font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
    </div>
    <div class="min-w-0 flex items-center gap-2">
      <span class="truncate">Niv. moyen</span>
      <span class="shrink-0 font-bold">{{ dex.averageLevel.toFixed(1) }}</span>
    </div>
    <div class="min-w-0 flex items-center gap-2">
      <span class="truncate">Bonus</span>
      <span class="shrink-0 font-bold">+{{ Math.round(dex.bonusPercent) }}%</span>
    </div>
    <div class="min-w-0 flex items-center gap-2">
      <img src="/items/shlageball/shlageball.png" alt="ball" class="h-4 w-4">
      <span class="shrink-0 font-bold">{{ inventory.items.shlageball || 0 }}</span>
    </div>
  </div>
</template>
