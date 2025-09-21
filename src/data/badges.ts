import type { ArenaBadge } from '~/type'

export const spaceBadge: ArenaBadge = {
  id: 'space',
  name: 'data.badges.space.name',
  levelCap: 200,
}

export const specialBadges = {
  space: spaceBadge,
}

export type SpecialBadgeId = keyof typeof specialBadges

export function getSpecialBadge(id: SpecialBadgeId): ArenaBadge {
  return specialBadges[id]
}
