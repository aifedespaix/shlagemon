import { defineStore } from 'pinia'

export const useFeatureLockStore = defineStore('featureLock', () => {
  const inventoryLocked = ref(false)
  const shlagedexLocked = ref(false)
  const zonesLocked = ref(false)
  const achievementsLocked = ref(false)

  const isInventoryLocked = computed(() => inventoryLocked.value)
  const isShlagedexLocked = computed(() => shlagedexLocked.value)
  const areZonesLocked = computed(() => zonesLocked.value)
  const areAchievementsLocked = computed(() => achievementsLocked.value)

  function lockInventory() {
    inventoryLocked.value = true
  }

  function lockShlagedex() {
    shlagedexLocked.value = true
  }

  function lockZones() {
    zonesLocked.value = true
  }

  function lockAchievements() {
    achievementsLocked.value = true
  }

  function lockAll() {
    lockInventory()
    lockShlagedex()
    lockZones()
    lockAchievements()
  }

  function unlockAll() {
    inventoryLocked.value = false
    shlagedexLocked.value = false
    zonesLocked.value = false
    achievementsLocked.value = false
  }

  return {
    isInventoryLocked,
    isShlagedexLocked,
    areZonesLocked,
    areAchievementsLocked,
    lockInventory,
    lockShlagedex,
    lockAchievements,
    lockZones,
    lockAll,
    unlockAll,
  }
})
