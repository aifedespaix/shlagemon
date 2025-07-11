<script setup lang="ts">
import { computed, watch } from 'vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import { useAchievementsStore } from '~/stores/achievements'
import { useArenaStore } from '~/stores/arena'
import { useDialogStore } from '~/stores/dialog'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useInterfaceStore } from '~/stores/interface'
import { useInventoryStore } from '~/stores/inventory'
import { useInventoryModalStore } from '~/stores/inventoryModal'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMapModalStore } from '~/stores/mapModal'
import { useMobileTabStore } from '~/stores/mobileTab'

const mobile = useMobileTabStore()
const inventoryModal = useInventoryModalStore()
const dialog = useDialogStore()
const inventory = useInventoryStore()
const arena = useArenaStore()
const achievements = useAchievementsStore()
const mapModal = useMapModalStore()
const ui = useInterfaceStore()
const panel = useMainPanelStore()
const lockStore = useFeatureLockStore()

const menuDisabled = computed(() => dialog.isDialogVisible || panel.current === 'arena')
const dexDisabled = menuDisabled
const achievementsDisabled = computed(() => menuDisabled.value || !achievements.hasAny)
const inventoryDisabled = computed(() => menuDisabled.value || inventory.list.length === 0 || arena.inBattle || lockStore.isInventoryLocked)

watch(
  () => dialog.isDialogVisible,
  (val) => {
    if (val)
      mobile.set('game')
  },
)

function toggleInventory() {
  if (inventoryModal.isVisible)
    inventoryModal.close()
  else
    inventoryModal.open()
}

function onSecondButton() {
  if (ui.mobileMainPanel === 'dex')
    mapModal.open()
  else
    mobile.set('dex')
}
</script>

<template>
  <nav class="h-12 flex items-center justify-between gap-1px bg-gray-100 md:hidden dark:bg-gray-800">
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="mobile.current === 'achievements' ? 'active' : ''"
      :disabled="achievementsDisabled"
      @click="mobile.set('achievements')"
    >
      <div class="i-carbon-trophy" />
    </button>
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="ui.mobileMainPanel === 'zone' && mobile.current === 'dex' ? 'active' : ''"
      :disabled="dexDisabled"
      @click="onSecondButton"
    >
      <SchlagedexIcon v-if="ui.mobileMainPanel === 'zone'" class="h-5 w-5" />
      <div v-else class="i-carbon-map" />
    </button>
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="inventoryModal.isVisible ? 'active' : ''"
      :disabled="inventoryDisabled"
      @click="toggleInventory"
    >
      <div class="i-carbon-inventory-management" />
    </button>
    <button
      class="button button-circle disabled:cursor-not-allowed disabled:opacity-50"
      :class="mobile.current === 'game' ? 'active' : ''"
      :disabled="menuDisabled"
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
