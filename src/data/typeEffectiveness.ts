export const typeEffectiveness: Record<string, Record<string, number>> = {
  Crâme: { Mouillé: 0.5, Moisi: 2 },
  Mouillé: { Crâme: 2, Caillasse: 1.5 },
  Moisi: { Mouillé: 2 },
  Statik: { Mouillé: 2 },
  Caillasse: { Statik: 2 },
}
