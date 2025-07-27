<script setup lang="ts">
const mobile = useMobileTabStore()
const dialog = useDialogStore()
const inventory = useInventoryStore()
const usage = useItemUsageStore()
const arena = useArenaStore()
const achievements = useAchievementsStore()
const shlagedex = useShlagedexStore()
const panel = useMainPanelStore()
const lockStore = useFeatureLockStore()
const visit = useZoneVisitStore()

const highlightMap = computed(() => visit.hasNewZone)
const highlightInventory = computed(() => usage.hasUnusedItem)

const menuDisabled = computed(() => dialog.isDialogVisible || panel.current === 'arena')
const zoneDisabled = menuDisabled
const dexDisabled = computed(() => menuDisabled.value || shlagedex.shlagemons.length === 0)
const achievementsDisabled = computed(() => menuDisabled.value || !achievements.hasAny)
const inventoryDisabled = computed(() => menuDisabled.value || inventory.list.length === 0 || arena.inBattle || lockStore.isInventoryLocked)

function toggleInventory() {
  mobile.toggle('inventory')
}

function onSecondButton() {
  mobile.toggle('zones')
}

const highlightClasses = 'animate-jello animate-count-infinite color-blue-500 dark:color-blue-400'
</script>

<template>
  <nav class="h-12 flex items-center justify-between gap-1px bg-gray-100 md:hidden dark:bg-gray-800">
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="mobile.current === 'achievements' ? 'active' : ''"
      :disabled="achievementsDisabled"
      @click="mobile.toggle('achievements')"
    >
      <div class="i-carbon-trophy" />
    </button>
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="mobile.current === 'dex' ? 'active' : ''"
      :disabled="dexDisabled"
      @click="mobile.toggle('dex')"
    >
      <IconShlagedex class="h-5 w-5" />
    </button>
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="[mobile.current === 'inventory' ? 'active' : '']"
      :disabled="inventoryDisabled"
      @click="toggleInventory"
    >
      <div :class="highlightInventory ? highlightClasses : ''">
        <div class="i-carbon-inventory-management" />
      </div>
    </button>
    <button
      class="button button-rectangle disabled:cursor-not-allowed disabled:opacity-50"
      :class="[mobile.current === 'zones' ? 'active' : '']"
      :disabled="zoneDisabled"
      @click="onSecondButton"
    >
      <div :class="highlightMap ? highlightClasses : ''">
        <div class="i-carbon-map" />
      </div>
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
  animation: menu-active 0.2s ease;
}

.button {
  @apply flex justify-center items-center flex-1 hover:bg-gray-200 dark:hover:bg-gray-700 h-full transition-transform;
}

.button:hover,
.button:active {
  transform: scale(1.1);
}

.button-circle {
  @apply rounded-l-full aspect-square bg-gray-400 dark:bg-gray-600;
}

@keyframes menu-active {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
