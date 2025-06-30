<script setup lang="ts">
import BattleMain from '~/components/battle/BattleMain.vue'
import ActiveShlagemon from '~/components/panels/ActiveShlagemon.vue'
import InventoryPanel from '~/components/panels/InventoryPanel.vue'
import ZonePanel from '~/components/panels/ZonePanel.vue'
import Shlagedex from '~/components/shlagemon/Shlagedex.vue'
import { useGameStateStore } from '~/stores/gameState'
import { useInventoryStore } from '~/stores/inventory'
import { useZoneStore } from '~/stores/zone'

const gameState = useGameStateStore()
const zone = useZoneStore()
const inventory = useInventoryStore()
</script>

<template>
  <div class="w-full overflow-auto" md="overflow-hidden">
    <div
      class="game flex flex-col gap-1 p-1"
      md="grid grid-cols-12 grid-rows-12 w-full h-full gap-2 p-1"
    >
      <div class="zone" md="col-span-6 row-span-5  col-start-4 row-start-8">
        <!-- middle B zone -->
        <DialogPanel />
      </div>
      <div class="zone" md="col-span-6 row-span-1 col-start-4 row-start-1">
        <!-- top zone -->
        <div class="zone-content">
          <PlayerInfos />
        </div>
      </div>
      <div class="zone" md="col-span-6 row-span-5 col-start-4 row-start-2">
        <!-- middle A zone -->
        <div class="zone-content">
          <BattleMain v-if="gameState.hasPokemon && zone.current.type !== 'village'" />
        </div>
      </div>
      <div class="zone" md="col-span-6 row-span-1 col-start-4 row-start-7">
        <!-- bottom zone -->
        <div class="zone-content">
          <ActiveShlagemon />
        </div>
      </div>
      <div class="zone" md="col-span-3 row-span-12 col-start-1 row-start-1">
        <!-- left zone -->
        <div class="zone-content flex flex-col gap-2">
          <ZonePanel />
          <InventoryPanel v-if="inventory.list.length" />
        </div>
      </div>
      <div class="zone" md="col-span-3 row-span-12 col-start-10 row-start-1">
        <!-- right zone -->
        <div class="zone-content">
          <Shlagedex />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zone {
  @apply p-2 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden;
}

.zone-content {
  @apply overflow-hidden h-full w-full;
}
</style>
