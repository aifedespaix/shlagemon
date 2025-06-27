<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import ActiveShlagemon from '~/components/panels/ActiveShlagemon.vue'
import SelectedShlagemon from '~/components/panels/SelectedShlagemon.vue'
import StarterPanel from '~/components/panels/StarterPanel.vue'
import Schlagedex from '~/components/shlagemon/Schlagedex.vue'
import { useGameStateStore } from '~/stores/gameState'

const gameState = useGameStateStore()
</script>

<template>
  <div
    class="game h-auto flex flex-col"
    md="grid grid-cols-12 grid-rows-12 h-full gap-2"
  >
    <div class="zone left col-span-12 row-span-1" md="col-span-3 row-span-12">
      <!-- left zone -->
    </div>
    <div class="zone right col-span-12 row-span-1" md="col-span-3 row-span-12 col-start-10">
      <Schlagedex />
    </div>
    <div class="zone top col-span-12 row-span-1" md="col-span-6 row-span-1 col-start-4">
      <ActiveShlagemon />
    </div>
    <div class="zone center col-span-12 row-span-1" md="col-span-6 row-span-9 col-start-4 row-start-2">
      <BattleMain v-if="gameState.hasPokemon" />
      <StarterPanel v-else />
    </div>
    <div class="zone bottom col-span-12 row-span-1" md="col-span-6 row-span-2 col-start-4 row-start-11">
      <SelectedShlagemon />
    </div>
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
}
.game {
  background-color: var(--un-background, theme('colors.white'));
}
</style>
