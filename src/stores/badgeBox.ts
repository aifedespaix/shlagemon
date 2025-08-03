import type { ArenaBadge } from '~/type'
import { defineStore } from 'pinia'
import { getArena } from '~/data/arenas'

export const useBadgeBoxStore = defineStore('badgeBox', () => {
  const unlocked = ref(false)
  const badges = ref<ArenaBadge[]>([])
  const isModalOpen = ref(false)

  const LEGACY_BADGE_IDS: Record<string, ArenaBadge['id']> = {
    'badge-merdant': 'couillasse',
    'badge-sock': 'sock',
    'badge-mystic-onion': 'mystic-onion',
    'badge-buttered-toast': 'buttered-toast',
  }

  function normalizeBadges(): void {
    badges.value = badges.value.map(b => ({
      id: LEGACY_BADGE_IDS[b.id] ?? b.id,
      name: b.name,
      levelCap: b.levelCap,
    }))
  }

  normalizeBadges()

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

  /**
   * Ensures that every badge earned by the player is present in the badge box.
   *
   * This is primarily used when loading a save: if the player already has badges
   * recorded in their profile but those badges are missing from the badge box,
   * they are added here.
   */
  function syncWithPlayerBadges(): void {
    const player = usePlayerStore()
    for (const [arenaId, hasBadge] of Object.entries(player.arenaBadges)) {
      if (!hasBadge)
        continue
      const arena = getArena(arenaId)
      if (arena)
        addBadge(arena.badge)
    }
  }

  function reset() {
    unlocked.value = false
    badges.value = []
    isModalOpen.value = false
  }

  return { unlocked, badges, isModalOpen, open, close, addBadge, unlock, syncWithPlayerBadges, reset }
}, {
  persist: true,
})
