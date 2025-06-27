import type { DexShlagemon } from '../types'
import { defineStore } from 'pinia'
import { useGameStateStore } from './gameState'
import { useSchlagedexStore } from './schlagedex'

interface SaveData {
  shlagemons: DexShlagemon[]
  activeMonId: string | null
}

export const useStorageStore = defineStore('storage', () => {
  const key = 'save'
  const dex = useSchlagedexStore()
  const game = useGameStateStore()

  function load() {
    if (typeof localStorage === 'undefined')
      return
    const raw = localStorage.getItem(key)
    if (!raw)
      return
    try {
      const data: SaveData = JSON.parse(raw)
      if (data.shlagemons)
        dex.setShlagemons(data.shlagemons)
      if (data.activeMonId) {
        const mon = dex.shlagemons.find(m => m.id === data.activeMonId)
        if (mon) {
          dex.setActiveShlagemon(mon)
          game.setActiveShlagemonId(mon.id)
        }
      }
    }
    catch (e) {
      console.error('Failed to parse save data', e)
    }
  }

  function save() {
    if (typeof localStorage === 'undefined')
      return
    const data: SaveData = {
      shlagemons: dex.shlagemons,
      activeMonId: game.activeShlagemonId,
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  function reset() {
    if (typeof localStorage !== 'undefined')
      localStorage.removeItem(key)
    dex.clear()
    game.reset()
  }

  return { load, save, reset }
})
