import { defineStore } from 'pinia'
import { bulgrosboule } from '~/data/shlagemons/bulgrosboule'
import { carapouffe } from '~/data/shlagemons/carapouffe'
import { salamiches } from '~/data/shlagemons/salamiches'
import { useShlagedexStore } from './shlagedex'

export type EggType = 'feu' | 'eau' | 'herbe'

export interface Egg {
  id: number
  type: EggType
  hatchesAt: number
}

export const useEggStore = defineStore('egg', () => {
  const eggs = ref<Egg[]>([])
  const dex = useShlagedexStore()

  function addEgg(type: EggType, duration = 60_000) {
    const id = Date.now() + Math.random()
    eggs.value.push({ id, type, hatchesAt: Date.now() + duration })
  }

  function hatchEgg(id: number) {
    const idx = eggs.value.findIndex(e => e.id === id)
    if (idx === -1)
      return
    const egg = eggs.value[idx]
    eggs.value.splice(idx, 1)
    switch (egg.type) {
      case 'feu':
        dex.createShlagemon(salamiches)
        break
      case 'eau':
        dex.createShlagemon(carapouffe)
        break
      case 'herbe':
        dex.createShlagemon(bulgrosboule)
        break
    }
  }

  setInterval(() => {
    const now = Date.now()
    eggs.value.filter(e => e.hatchesAt <= now).forEach(e => hatchEgg(e.id))
  }, 1000)

  function reset() {
    eggs.value = []
  }

  return { eggs, addEgg, hatchEgg, reset }
}, {
  persist: true,
})
