import { defineStore } from 'pinia'
import { createModalStore } from './helpers'
import { useZoneVisitStore } from './zoneVisit'

export const useMapModalStore = defineStore('mapModal', () => {
  const { isVisible, open: rawOpen, close } = createModalStore('game')
  const visit = useZoneVisitStore()

  function open() {
    rawOpen()
    visit.markAllAccessibleVisited()
  }

  return { isVisible, open, close }
})
