import type { DexShlagemon } from '../types'
import { defineStore } from 'pinia'

export const useSchlagedexStore = defineStore('schlagedex', () => {
  const shlagemons = ref<DexShlagemon[]>([])
  const activeShlagemon = ref<DexShlagemon | null>(null)

  function addShlagemon(mon: DexShlagemon) {
    shlagemons.value.push(mon)
    if (!activeShlagemon.value)
      activeShlagemon.value = mon
  }

  function setActiveShlagemon(mon: DexShlagemon) {
    activeShlagemon.value = mon
  }

  function setShlagemons(mons: DexShlagemon[]) {
    shlagemons.value = [...mons]
  }

  function clear() {
    shlagemons.value = []
  }

  return { shlagemons, activeShlagemon, addShlagemon, setActiveShlagemon, setShlagemons, clear }
})
