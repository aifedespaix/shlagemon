<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import ActiveShlagemon from '~/components/panels/ActiveShlagemon.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import { useGameStateStore } from '~/stores/gameState'

const gameState = useGameStateStore()
</script>

<template>
  <div
    class="game h-screen flex flex-col gap-1 overflow-y-auto p-1"
    md="grid grid-cols-12 grid-rows-12 h-full overflow-hidden gap-2 p-1"
  >
    <div class="zone fixed" md="col-span-6 row-span-7 col-start-4 row-start-6">
      <!-- middle B zone -->
      <DialogPanel />
    </div>
    <div class="zone fixed flex items-center gap-3" md="col-span-6 row-span-1 col-start-4 row-start-1">
      <!-- top zone -->
      <PlayerInfos />
      <ActiveShlagemon />
    </div>
    <div class="zone fixed" md="col-span-6 row-span-4 col-start-4 row-start-2">
      <!-- middle A zone -->
      <BattleMain v-if="gameState.hasPokemon" />
    </div>
    <div class="zone scrollable" md="col-span-3 row-span-12 col-start-1 row-start-1">
      <!-- left zone -->
    </div>
    <div class="zone scrollable" md="col-span-3 row-span-12 col-start-10 row-start-1">
      <!-- right zone -->
      <Shlagedex />
    </div>
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
}
.fixed {
  @apply overflow-hidden;
}
.scrollable {
  @apply md:overflow-y-auto;
}
</style>
