import type { Zone } from '~/type'
import { savageZones } from './zones/savages'
import { villageZones } from './zones/villages'

export const zonesData: Zone[] = [
  ...villageZones,
  ...savageZones,
].sort((a, b) => a.minLevel - b.minLevel)
