<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import ActiveShlagemon from '~/components/panels/ActiveShlagemon.vue'
import StarterPanel from '~/components/panels/StarterPanel.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import { useGameStateStore } from '~/stores/gameState'

const gameState = useGameStateStore()
</script>

<template>
  <div
    class="game h-auto flex flex-col"
    md="grid grid-cols-12 grid-rows-12 h-full gap-2"
  >
    <div class="zone" md="col-span-3 row-span-12 col-start-1 row-start-1">
      <!-- left zone -->
    </div>
    <div class="zone" md="col-span-3 row-span-12 col-start-10 row-start-1">
      <!-- right zone -->
      <Shlagedex />
    </div>
    <div class="zone" md="col-span-6 row-span-1 col-start-4 row-start-1">
      <!-- top zone -->
      <PlayerInfos />
    </div>
    <div class="zone" md="col-span-6 row-span-10 col-start-4 row-start-2">
      <!-- middle zone -->
      <BattleMain v-if="gameState.hasPokemon" />
      <StarterPanel v-else />
    </div>
    <div class="zone" md="col-span-6 row-span-1 col-start-4 row-start-12">
      <!-- bottom zone -->
      <ActiveShlagemon />
    </div>
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden;
}
</style>
