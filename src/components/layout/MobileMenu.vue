<script setup lang="ts">
import { computed, watch } from 'vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import Button from '~/components/ui/Button.vue'
import { useAchievementsStore } from '~/stores/achievements'
import { useDialogStore } from '~/stores/dialog'
import { useInventoryStore } from '~/stores/inventory'
import { useInventoryModalStore } from '~/stores/inventoryModal'
import { useMobileTabStore } from '~/stores/mobileTab'

const mobile = useMobileTabStore()
const inventoryModal = useInventoryModalStore()
const dialog = useDialogStore()
const inventory = useInventoryStore()
const achievements = useAchievementsStore()

const menuDisabled = computed(() => dialog.isDialogVisible)
const dexDisabled = menuDisabled
const achievementsDisabled = computed(() => menuDisabled.value || !achievements.hasAny)
const inventoryDisabled = computed(() => menuDisabled.value || inventory.list.length === 0)

watch(dialog.isDialogVisible, (val) => {
  if (val)
    mobile.set('game')
})

function toggleInventory() {
  if (inventoryModal.isVisible)
    inventoryModal.close()
  else
    inventoryModal.open()
}
</script>

<template>
  <nav class="h-12 flex items-center justify-between gap-2 bg-gray-100 px-2 md:hidden dark:bg-gray-800">
    <Button
      type="menu"
      class="aspect-square"
      :class="mobile.current === 'dex' ? 'text-teal-600 dark:text-teal-400' : ''"
      :disabled="dexDisabled"
      @click="mobile.set('dex')"
    >
      <SchlagedexIcon class="h-5 w-5" />
    </Button>
    <Button
      type="menu"
      class="aspect-square"
      :class="mobile.current === 'achievements' ? 'text-teal-600 dark:text-teal-400' : ''"
      :disabled="achievementsDisabled"
      @click="mobile.set('achievements')"
    >
      <div class="i-carbon-trophy" />
    </button>
    <button
      class="button button-rectangle"
      :class="mobile.current === 'dex' ? 'active' : ''"
      @click="mobile.set('dex')"
    >
      <div class="i-carbon-game-console" />
    </Button>
    <Button
      type="menu"
      class="aspect-square"
      :class="inventoryModal.isVisible ? 'text-teal-600 dark:text-teal-400' : ''"
      :disabled="inventoryDisabled"
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
