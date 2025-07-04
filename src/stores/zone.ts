import type { Trainer } from '~/type/trainer'
import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { caillou } from '~/data/characters/caillou'
import { marcon } from '~/data/characters/marcon'
import { marineLahaine } from '~/data/characters/marine-lahaine'
import { norman } from '~/data/characters/norman'
import { profMerdant } from '~/data/characters/prof-merdant'
import { sachatte } from '~/data/characters/sachatte'
import { allShlagemons } from '~/data/shlagemons'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const currentId = ref<string>(zones.value[0].id)
  const current = computed(() => zones.value.find(z => z.id === currentId.value)!)
  const xpZones = computed(() => zones.value.filter(z => z.maxLevel > 0))

  const kings = ref<Record<string, Trainer>>({})

  function getKing(id: string): Trainer | undefined {
    const z = zones.value.find(z => z.id === id)
    if (!z)
      throw new Error('Zone not found')
    const hasKing = z.hasKing ?? z.type === 'sauvage'
    if (!hasKing)
      return undefined
    if (!kings.value[id]) {
      const level = z.maxLevel + 1

      let character = profMerdant
      switch (id) {
        case 'plaine-kekette':
          character = caillou
          break
        case 'bois-de-bouffon':
          character = sachatte
          break
        case 'grotte-du-slip':
          character = norman
          break
        case 'ravin-fesse-molle':
          character = marineLahaine
          break
        case 'grotte-nanard':
          character = marcon
          break
        case 'marais-moudugenou':
          character = sachatte
          break
      }

      const kingDexSize = z.maxLevel < 10 ? 3 : 6
      const trainer: Trainer = {
        id: `king-${z.id}`,
        character,
        dialogBefore: 'Prépare-toi à perdre !',
        dialogAfter: 'Tu as gagné... pour cette fois.',
        reward: 5,
        shlagemons: Array.from({ length: kingDexSize }, () => {
          const list = z.shlagemons?.length ? z.shlagemons! : allShlagemons
          const base = list[Math.floor(Math.random() * list.length)]
          return {
            baseId: base.id,
            level,
          }
        }),
      }
      kings.value[id] = trainer
    }
    return kings.value[id]
  }

  function getZoneRank(id: string): number {
    const idx = xpZones.value.findIndex(z => z.id === id)
    return idx >= 0 ? idx + 1 : 1
  }

  const rewardMultiplier = computed(() => {
    const zone = current.value
    if (!zone.maxLevel)
      return 1
    const rank = zone.maxLevel / 10 - 1
    return rank >= 0 ? 2 ** rank : 1
  })

  function setZone(id: string) {
    if (zones.value.some(z => z.id === id))
      currentId.value = id
  }

  function reset() {
    currentId.value = zones.value[0].id
  }

  return {
    zones,
    current,
    rewardMultiplier,
    setZone,
    getKing,
    getZoneRank,
    reset,
  }
}, {
  persist: {
    pick: ['currentId'],
  },
})
