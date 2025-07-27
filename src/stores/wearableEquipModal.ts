import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { allItems } from '~/data/items'

export const useWearableEquipModalStore = defineStore('wearableEquipModal', () => {
  // Keep the current mobile tab when opening this modal so the secondary panel
  // and any open dialogs remain visible on mobile
  const { isVisible, open: openModal, close } = createModalStore()
  const currentMon = ref<DexShlagemon | null>(null)
  const inventory = useInventoryStore()
  const equipment = useEquipmentStore()
  const usage = useItemUsageStore()

  const options = computed(() =>
    allItems
      .filter(i => i.wearable && (inventory.items[i.id] || 0) > 0)
      .map(i => ({ item: i, qty: inventory.items[i.id] || 0 })),
  )

  function open(mon: DexShlagemon) {
    currentMon.value = mon
    openModal()
  }

  function equip(itemId: string) {
    if (!currentMon.value)
      return
    equipment.equip(currentMon.value.id, itemId)
    usage.markUsed(itemId)
    close()
  }

  return { isVisible, currentMon, options, open, close, equip }
})
