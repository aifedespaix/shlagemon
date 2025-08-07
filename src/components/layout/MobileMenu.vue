<script setup lang="ts">
// Types explicites pour la sécurité + lisibilité

// Stores (doivent être typés côté projet)
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

// Etats calculés réactifs pour le highlight + désactivation
const newZoneCount = computed(() => visit.newZoneCount)
const newItemCount = computed(() => usage.unusedItemCount)
const newDexCount = computed(() => shlagedex.newCount)

const menuDisabled = computed(() => dialog.isDialogVisible || panel.current === 'arena')
const zoneDisabled = menuDisabled
const dexDisabled = computed(() => menuDisabled.value || shlagedex.shlagemons.length === 0)
const achievementsDisabled = computed(() => menuDisabled.value || !achievements.hasAny)
const hasNewAchievements = computed(() => achievements.hasNewUnlocked)
const inventoryDisabled = computed(() =>
  menuDisabled.value || inventory.list.length === 0 || arena.inBattle || lockStore.isInventoryLocked,
)

function toggleInventory() {
  mobile.toggle('inventory')
}

function onZones() {
  mobile.toggle('zones')
}

function onGame() {
  mobile.toggleGame((tab) => {
    if (tab === 'dex')
      return !dexDisabled.value
    if (tab === 'inventory')
      return !inventoryDisabled.value
    if (tab === 'zones')
      return !zoneDisabled.value
    if (tab === 'achievements')
      return !achievementsDisabled.value
    return true
  })
}

// Pour focus-ring personnalisés UnoCSS only
const focusRing = 'outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-300'

/**
 * Handles the context menu interaction on a navigation button.
 * When the button displays a badge (meaning there are new elements),
 * a right click should clear the badge without changing the current tab.
 *
 * @param hasBadge - Whether the button currently shows a badge.
 * @param handler - Callback invoked to mark associated items as seen.
 */
function handleContextMenu(hasBadge: boolean, handler?: () => void) {
  if (hasBadge && handler)
    handler()
}
</script>

<template>
  <nav
    class="h-14 w-full flex items-center justify-between border-t border-gray-200 bg-white/90 px-1 shadow-lg md:hidden sm:h-16 dark:border-gray-700 dark:bg-gray-900/95"
    role="navigation"
    aria-label="Barre de navigation principale"
  >
    <!-- Succession claire : chaque bouton = 1 action, tabIndex, aria, highlight, badge -->
    <!-- Achievements -->
    <button
      type="button"
      aria-label="Succès"
      :tabindex="achievementsDisabled ? -1 : 0"
      :disabled="achievementsDisabled"
      class="group relative h-full flex flex-1 flex-col items-center justify-center transition-all duration-100" :class="[
        focusRing,
        mobile.current === 'achievements'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        achievementsDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="mobile.toggle('achievements')"
      @contextmenu.prevent="handleContextMenu(hasNewAchievements, achievements.markAllSeen)"
    >
      <span class="relative flex items-center justify-center">
        <div class="i-carbon-trophy text-xl" aria-hidden="true" />
        <UiBadge
          v-if="hasNewAchievements"
          color="info"
          size="xs"
          class="-right-1.5 -top-1.5"
        />
      </span>
    </button>

    <!-- Dex -->
    <button
      type="button"
      aria-label="Shlagedex"
      :tabindex="dexDisabled ? -1 : 0"
      :disabled="dexDisabled"
      class="group relative h-full flex flex-1 flex-col items-center justify-center transition-all duration-100" :class="[
        focusRing,
        mobile.current === 'dex'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        dexDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="mobile.toggle('dex')"
      @contextmenu.prevent="handleContextMenu(newDexCount > 0, shlagedex.markAllSeen)"
    >
      <span class="relative flex items-center justify-center">
        <IconShlagedex class="h-5 w-5" aria-hidden="true" />
        <UiBadge
          v-if="newDexCount > 0"
          color="info"
          size="xs"
          class="-right-1.5 -top-1.5"
        >{{ newDexCount }}</UiBadge>
      </span>
    </button>

    <!-- Inventory, avec badge animé si highlight -->
    <button
      type="button"
      aria-label="Inventaire"
      :tabindex="inventoryDisabled ? -1 : 0"
      :disabled="inventoryDisabled"
      class="group relative h-full flex flex-1 flex-col items-center justify-center transition-all duration-100" :class="[
        focusRing,
        mobile.current === 'inventory'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        inventoryDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="toggleInventory"
      @contextmenu.prevent="handleContextMenu(newItemCount > 0, usage.markAllUsed)"
    >
      <span class="relative flex items-center justify-center">
        <div class="i-carbon-inventory-management text-xl" aria-hidden="true" />
        <UiBadge
          v-if="newItemCount > 0"
          color="info"
          size="xs"
          class="-right-1.5 -top-1.5"
        >{{ newItemCount }}</UiBadge>
      </span>
    </button>

    <!-- Zones, avec badge animé si highlight -->
    <button
      type="button"
      aria-label="Carte / Zones"
      :tabindex="zoneDisabled ? -1 : 0"
      :disabled="zoneDisabled"
      class="group relative h-full flex flex-1 flex-col items-center justify-center transition-all duration-100" :class="[
        focusRing,
        mobile.current === 'zones'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        zoneDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="onZones"
      @contextmenu.prevent="handleContextMenu(newZoneCount > 0, visit.markAllAccessibleVisited)"
    >
      <span class="relative flex items-center justify-center">
        <div class="i-carbon-map text-xl" aria-hidden="true" />
        <UiBadge
          v-if="newZoneCount > 0"
          color="danger"
          size="xs"
          class="-right-1.5 -top-1.5"
        >{{ newZoneCount }}</UiBadge>
      </span>
    </button>

    <!-- Game/Home (centré, arrondi) -->
    <button
      type="button"
      aria-label="Accueil / Jeu"
      :tabindex="menuDisabled ? -1 : 0"
      :disabled="menuDisabled"
      class="z-10 h-12 w-12 flex flex-col scale-100 items-center justify-center border-4 border-white rounded-full bg-teal-600/90 shadow-lg transition-all duration-150 -mt-6 sm:h-14 sm:w-14 dark:border-gray-900 dark:bg-teal-400/90 sm:-mt-7" :class="[
        focusRing,
        mobile.current === 'game'
          ? 'ring-2 ring-sky-500 dark:ring-sky-400 scale-110'
          : 'hover:scale-105 hover:ring-2 hover:ring-teal-300 dark:hover:ring-teal-200',
        menuDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
      style="box-shadow: 0 2px 12px -2px #14b8a6a9, 0 0px 0px #0000"
      @click="onGame"
    >
      <div class="i-carbon-game-console text-2xl" aria-hidden="true" />
    </button>
  </nav>
</template>
