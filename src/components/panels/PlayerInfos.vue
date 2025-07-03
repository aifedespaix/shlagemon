<script setup lang="ts">
import BonusIcon from '~/components/icons/bonus.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import ShlagediamondIcon from '~/components/icons/shlagediamond.vue'
import ShlagidolarIcon from '~/components/icons/shlagidolar.vue'
import XpIcon from '~/components/icons/xp.vue'
import Tooltip from '~/components/ui/Tooltip.vue'
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
    <Tooltip text="Shlagidolars">
      <div class="min-w-0 flex items-center gap-1">
        <ShlagidolarIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ game.shlagidolar.toLocaleString() }}</span>
      </div>
    </Tooltip>
    <Tooltip text="Shlagidiamond">
      <div class="min-w-0 flex items-center gap-1">
        <ShlagediamondIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ game.shlagidiamond?.toLocaleString() }}</span>
      </div>
    </Tooltip>
    <Tooltip text="SchlagéDex">
      <div class="min-w-0 flex items-center gap-1">
        <SchlagedexIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
      </div>
    </Tooltip>
    <Tooltip text="Niveau moyen">
      <div class="min-w-0 flex items-center gap-1">
        <XpIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ dex.averageLevel.toFixed(1) }}</span>
      </div>
    </Tooltip>
    <Tooltip text="Bonus">
      <div class="min-w-0 flex items-center gap-1">
        <BonusIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">+{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </Tooltip>
    <Tooltip text="SchlagéBalls">
      <div class="min-w-0 flex items-center gap-1">
        <img src="/items/shlageball/shlageball.png" alt="ball" class="h-4 w-4">
        <span class="shrink-0 font-bold">{{ inventory.items.shlageball?.toLocaleString() || 0 }}</span>
      </div>
    </Tooltip>
  </div>
</template>
