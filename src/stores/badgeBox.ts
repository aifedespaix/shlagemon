import type { ArenaBadge } from '~/type'
import { defineStore } from 'pinia'

export const useBadgeBoxStore = defineStore('badgeBox', () => {
  const unlocked = ref(false)
  const badges = ref<ArenaBadge[]>([])
  const isModalOpen = ref(false)

  function open() {
    isModalOpen.value = true
  }

  function close() {
    isModalOpen.value = false
  }

  function addBadge(badge: ArenaBadge) {
    if (!badges.value.some(b => b.id === badge.id))
      badges.value.push(badge)
  }

  function unlock() {
    unlocked.value = true
  }

  function reset() {
    unlocked.value = false
    badges.value = []
    isModalOpen.value = false
  }

  return { unlocked, badges, isModalOpen, open, close, addBadge, unlock, reset }
}, {
  persist: true,
})
