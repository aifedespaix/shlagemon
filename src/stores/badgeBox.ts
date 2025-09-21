import type { ArenaBadge } from '~/type'
import { defineStore } from 'pinia'
import { getArena, getArenaByBadgeId } from '~/data/arenas'
import { specialBadges } from '~/data/badges'

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

  /**
   * Migrates badge identifiers from legacy values to the current identifiers.
   */
  function normalizeBadges(): void {
    badges.value = badges.value.map(badge => ({
      id: LEGACY_BADGE_IDS[badge.id] ?? badge.id,
      name: badge.name,
      levelCap: badge.levelCap,
    }))
  }

  /**
   * Removes badges whose identifiers do not match any existing arena.
   */
  function removeUnknownBadges(): void {
    badges.value = badges.value.filter((badge) => {
      const arenaBadge = getArenaByBadgeId(badge.id)
      const specialBadge = specialBadges[badge.id as keyof typeof specialBadges]
      return Boolean(arenaBadge || specialBadge)
    })
  }

  normalizeBadges()
  removeUnknownBadges()

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
    normalizeBadges()
    removeUnknownBadges()

    const player = usePlayerStore()
    for (const [badgeId, hasBadge] of Object.entries(player.arenaBadges)) {
      if (!hasBadge)
        continue
      const arena = getArena(badgeId)
      if (arena) {
        addBadge(arena.badge)
        continue
      }
      const special = specialBadges[badgeId as keyof typeof specialBadges]
      if (special)
        addBadge(special)
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
