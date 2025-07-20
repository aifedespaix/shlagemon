export interface ShlagCard {
  id: string
  name: string
  type: 'feu' | 'eau' | 'plante' | 'psy' | 'poison' | 'normal' | 'roche' | 'electrique' | 'vol' | 'combat' | 'spectre' | 'darksasuke' | 'metal' | 'sol' | 'fee' | 'dragon' | 'glace' | 'insecte'
  power: number
  effect: 'steal' | 'nullify' | 'x2' | 'swap' | 'chaos' | 'mirror'
  image: string
}
