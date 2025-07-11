import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFeatureLockStore = defineStore('featureLock', () => {
  const inventoryLocked = ref(false)
  const shlagedexLocked = ref(false)
  const zonesLocked = ref(false)

  const isInventoryLocked = computed(() => inventoryLocked.value)
  const isShlagedexLocked = computed(() => shlagedexLocked.value)
  const areZonesLocked = computed(() => zonesLocked.value)

  function lockInventory() {
    inventoryLocked.value = true
  }

  function lockShlagedex() {
    shlagedexLocked.value = true
  }

  function lockZones() {
    zonesLocked.value = true
  }

  function unlockAll() {
    inventoryLocked.value = false
    shlagedexLocked.value = false
    zonesLocked.value = false
  }

  return {
    isInventoryLocked,
    isShlagedexLocked,
    areZonesLocked,
    lockInventory,
    lockShlagedex,
    lockZones,
    unlockAll,
  }
})
