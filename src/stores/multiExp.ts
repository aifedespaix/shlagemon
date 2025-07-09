import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useEquipmentStore } from './equipment'
import { useMobileTabStore } from './mobileTab'
import { useShlagedexStore } from './shlagedex'

export const useMultiExpStore = defineStore('multiExp', () => {
  const isVisible = ref(false)
  const dex = useShlagedexStore()
  const equipment = useEquipmentStore()

  const holderId = computed(() => equipment.getHolder('multi-exp'))
  const holder = computed(() =>
    holderId.value ? dex.shlagemons.find(m => m.id === holderId.value) || null : null,
  )
  const mobile = useMobileTabStore()

  function open() {
    mobile.set('game')
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
  }

  function setHolder(monId: string) {
    equipment.equip(monId, 'multi-exp')
    close()
  }

  function removeHolder() {
    equipment.unequipItem('multi-exp')
  }

  return { holderId, holder, isVisible, open, close, setHolder, removeHolder }
}, {
  persist: true,
})
