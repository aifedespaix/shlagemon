import type { Zone } from '~/type'
import { savageZones } from './zones/savages'
import { villageZones } from './zones/villages'

const grotteZones: Zone[] = []

export const zonesData: Zone[] = [
  ...villageZones,
  ...savageZones,
  ...grotteZones,
].sort((a, b) => a.minLevel - b.minLevel)
