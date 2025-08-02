import type { UserModule } from '~/types'

/**
 * Syncs the badge box with the player's earned badges when the application loads.
 */
export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return

  const badgeBox = useBadgeBoxStore()
  badgeBox.syncWithPlayerBadges()
}
