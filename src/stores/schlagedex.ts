import type { DexShlagemon } from '../types'
import type { BaseShlagemon } from '~/data/shlagemons'
import { defineStore } from 'pinia'
import { createDexShlagemon } from '~/utils/dexFactory'

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

  function createShlagemon(base: BaseShlagemon) {
    const mon = createDexShlagemon(base)
    addShlagemon(mon)
    return mon
  }

  return { shlagemons, activeShlagemon, addShlagemon, setActiveShlagemon, setShlagemons, clear, createShlagemon }
}, {
  persist: true,
})
