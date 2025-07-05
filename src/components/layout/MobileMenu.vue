<script setup lang="ts">
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import { useInventoryModalStore } from '~/stores/inventoryModal'
import { useMobileTabStore } from '~/stores/mobileTab'

const mobile = useMobileTabStore()
const inventoryModal = useInventoryModalStore()

function toggleInventory() {
  if (inventoryModal.isVisible)
    inventoryModal.close()
  else
    inventoryModal.open()
}
</script>

<template>
  <nav class="h-12 flex items-center justify-between gap-1px bg-gray-100 dark:bg-gray-800" md="hidden">
    <button
      class="button button-rectangle"
      :class="mobile.current === 'achievements' ? 'active' : ''"
      @click="mobile.set('achievements')"
    >
      <div class="i-carbon-trophy" />
    </button>
    <button
      class="button button-rectangle"
      :class="mobile.current === 'dex' ? 'active' : ''"
      @click="mobile.set('dex')"
    >
      <SchlagedexIcon class="h-5 w-5" />
    </button>
    <button
      class="button button-rectangle"
      :class="inventoryModal.isVisible ? '' : ''"
      @click="toggleInventory"
    >
      <div class="i-carbon-inventory-management" />
    </button>
    <button
      class="button button-circle"
      :class="mobile.current === 'game' ? 'active' : ''"
      @click="mobile.set('game')"
    >
      <div class="i-carbon-game-console" />
    </button>
  </nav>
</template>

<style scoped>
.active {
  @apply bg-gray-200 dark:bg-gray-700 text-teal-600 dark:text-teal-400;
}

.button {
  @apply flex justify-center items-center flex-1 hover:bg-gray-200 dark:hover:bg-gray-700 h-full;
}

.button-circle {
  @apply rounded-l-full aspect-square bg-gray-400 dark:bg-gray-600;
}
</style>
