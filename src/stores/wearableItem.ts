import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useEquipmentStore } from './equipment'
import { useMobileTabStore } from './mobileTab'
import { useShlagedexStore } from './shlagedex'

export const useWearableItemStore = defineStore('wearableItem', () => {
  const currentId = ref<string | null>(null)
  const isVisible = ref(false)
  const dex = useShlagedexStore()
  const equipment = useEquipmentStore()
  const mobile = useMobileTabStore()

  const holderId = computed(() =>
    currentId.value ? equipment.getHolder(currentId.value) : null,
  )

  const holder = computed(() => {
    if (!holderId.value)
      return null
    return dex.shlagemons.find(m => m.id === holderId.value) || null
  })

  function open(id: string) {
    currentId.value = id
    mobile.set('game')
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
    currentId.value = null
  }

  function equip(monId: string) {
    if (!currentId.value)
      return
    equipment.equip(monId, currentId.value)
    close()
  }

  function unequip() {
    if (currentId.value)
      equipment.unequipItem(currentId.value)
  }

  function reset() {
    currentId.value = null
    isVisible.value = false
  }

  return {
    currentId,
    isVisible,
    holderId,
    holder,
    open,
    close,
    equip,
    unequip,
    reset,
  }
}, {
  persist: true,
})
