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
    </Button>
    <Button
      type="icon"
      class="h-14 w-14 text-2xl -my-4"
      :class="mobile.current === 'game' ? 'text-teal-600 dark:text-teal-400' : ''"
      @click="mobile.set('game')"
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
    </Button>
  </nav>
</template>
