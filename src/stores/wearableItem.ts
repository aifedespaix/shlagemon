import type { Item } from '~/type/item'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useEquipmentStore } from './equipment'
import { useMobileTabStore } from './mobileTab'
import { useShlagedexStore } from './shlagedex'
import { useItemUsageStore } from './itemUsage'

export const useWearableItemStore = defineStore('wearableItem', () => {
  const current = ref<Item | null>(null)
  const isVisible = ref(false)
  const selectedId = ref<string | null>(null)
  const dex = useShlagedexStore()
  const equipment = useEquipmentStore()
  const mobile = useMobileTabStore()
  const usage = useItemUsageStore()

  const holderId = computed(() =>
    current.value ? equipment.getHolder(current.value.id) : null,
  )
  const holder = computed(() =>
    holderId.value ? dex.shlagemons.find(m => m.id === holderId.value) || null : null,
  )

  function getHolderId(itemId: string) {
    return equipment.getHolder(itemId)
  }
  function getHolder(itemId: string) {
    const id = getHolderId(itemId)
    return id ? dex.shlagemons.find(m => m.id === id) || null : null
  }

  function open(item: Item) {
    if (!item.wearable)
      return
    current.value = item
    selectedId.value = holderId.value
    mobile.set('game')
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
    current.value = null
    selectedId.value = null
  }

  function setHolder(monId: string) {
    if (!current.value)
      return
    selectedId.value = monId
    equipment.equip(monId, current.value.id)
    usage.markUsed(current.value.id)
    close()
  }

  function removeHolder(itemId: string) {
    equipment.unequipItem(itemId)
  }

  return {
    current,
    isVisible,
    selectedId,
    holderId,
    holder,
    open,
    close,
    setHolder,
    removeHolder,
    getHolderId,
    getHolder,
  }
}, {
  persist: true,
})
