<script setup lang="ts">
// Types explicites pour la sécurité + lisibilité
import type { ComputedRef } from 'vue'

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
const highlightMap = computed(() => visit.hasNewZone)
const highlightInventory = computed(() => usage.hasUnusedItem)

const menuDisabled = computed(() => dialog.isDialogVisible || panel.current === 'arena')
const zoneDisabled = menuDisabled
const dexDisabled = computed(() => menuDisabled.value || shlagedex.shlagemons.length === 0)
const achievementsDisabled = computed(() => menuDisabled.value || !achievements.hasAny)
const inventoryDisabled = computed(() =>
  menuDisabled.value || inventory.list.length === 0 || arena.inBattle || lockStore.isInventoryLocked
)

function toggleInventory() {
  mobile.toggle('inventory')
}

function onZones() {
  mobile.toggle('zones')
}

// Pour focus-ring personnalisés UnoCSS only
const focusRing = 'outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-300'
</script>

<template>
  <nav
    class="w-full flex justify-between items-center bg-white/90 dark:bg-gray-900/95 shadow-lg border-t border-gray-200 dark:border-gray-700 px-1 md:hidden h-14 sm:h-16"
    role="navigation"
    aria-label="Barre de navigation principale"
  >
    <!-- Succession claire : chaque bouton = 1 action, tabIndex, aria, highlight, badge -->
    <!-- Achievements -->
    <button
      type="button"
      :aria-label="'Succès'"
      :tabindex="achievementsDisabled ? -1 : 0"
      :disabled="achievementsDisabled"
      :class="[
        'flex-1 flex flex-col items-center justify-center h-full relative group transition-all duration-100',
        focusRing,
        mobile.current === 'achievements'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        achievementsDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="mobile.toggle('achievements')"
    >
      <div class="i-carbon-trophy text-xl" aria-hidden="true" />
    </button>

    <!-- Dex -->
    <button
      type="button"
      :aria-label="'Shlagedex'"
      :tabindex="dexDisabled ? -1 : 0"
      :disabled="dexDisabled"
      :class="[
        'flex-1 flex flex-col items-center justify-center h-full relative group transition-all duration-100',
        focusRing,
        mobile.current === 'dex'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        dexDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="mobile.toggle('dex')"
    >
      <IconShlagedex class="h-5 w-5" aria-hidden="true" />
    </button>

    <!-- Inventory, avec badge animé si highlight -->
    <button
      type="button"
      :aria-label="'Inventaire'"
      :tabindex="inventoryDisabled ? -1 : 0"
      :disabled="inventoryDisabled"
      :class="[
        'flex-1 flex flex-col items-center justify-center h-full relative group transition-all duration-100',
        focusRing,
        mobile.current === 'inventory'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        inventoryDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="toggleInventory"
    >
      <span class="relative flex items-center justify-center">
        <div class="i-carbon-inventory-management text-xl" aria-hidden="true" />
        <span
          v-if="highlightInventory"
          class="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-sky-500 dark:bg-sky-400 ring-2 ring-white dark:ring-gray-900 animate-pulse"
          aria-hidden="true"
        />
      </span>
    </button>

    <!-- Zones, avec badge animé si highlight -->
    <button
      type="button"
      :aria-label="'Carte / Zones'"
      :tabindex="zoneDisabled ? -1 : 0"
      :disabled="zoneDisabled"
      :class="[
        'flex-1 flex flex-col items-center justify-center h-full relative group transition-all duration-100',
        focusRing,
        mobile.current === 'zones'
          ? 'bg-teal-50 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow-sm scale-105'
          : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        zoneDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="onZones"
    >
      <span class="relative flex items-center justify-center">
        <div class="i-carbon-map text-xl" aria-hidden="true" />
        <span
          v-if="highlightMap"
          class="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-pink-500 dark:bg-pink-400 ring-2 ring-white dark:ring-gray-900 animate-pulse"
          aria-hidden="true"
        />
      </span>
    </button>

    <!-- Game/Home (centré, arrondi) -->
    <button
      type="button"
      :aria-label="'Accueil / Jeu'"
      :tabindex="menuDisabled ? -1 : 0"
      :disabled="menuDisabled"
      :class="[
        'flex flex-col items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-teal-600/90 dark:bg-teal-400/90 shadow-lg -mt-6 sm:-mt-7 border-4 border-white dark:border-gray-900 z-10 scale-100 transition-all duration-150',
        focusRing,
        mobile.current === 'game'
          ? 'ring-2 ring-sky-500 dark:ring-sky-400 scale-110'
          : 'hover:scale-105 hover:ring-2 hover:ring-teal-300 dark:hover:ring-teal-200',
        menuDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="mobile.set('game')"
      style="box-shadow: 0 2px 12px -2px #14b8a6a9, 0 0px 0px #0000"
    >
      <div class="i-carbon-game-console text-2xl" aria-hidden="true" />
    </button>
  </nav>
</template>
