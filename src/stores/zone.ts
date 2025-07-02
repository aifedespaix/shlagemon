import type { Trainer } from '~/type/trainer'
import type { Zone } from '~/type/zone'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { allShlagemons } from '~/data/shlagemons'
import { zonesData } from '~/data/zones'

export const useZoneStore = defineStore('zone', () => {
  const zones = ref<Zone[]>(zonesData)
  const currentId = ref<string>(zones.value[0].id)
  const current = computed(() => zones.value.find(z => z.id === currentId.value)!)

  const kings = ref<Record<string, Trainer>>({})

  function getKing(id: string): Trainer {
    if (!kings.value[id]) {
      const z = zones.value.find(z => z.id === id)
      if (!z)
        throw new Error('Zone not found')
      const level = z.maxLevel + 1
      const trainer: Trainer = {
        id: `king-${z.id}`,
        name: `Roi de ${z.name}`,
        image: '/characters/professor/professor.png',
        dialogBefore: 'Prépare-toi à perdre !',
        dialogAfter: 'Tu as gagné... pour cette fois.',
        reward: 5,
        shlagemons: Array.from({ length: 6 }, () => {
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

  return { zones, current, rewardMultiplier, setZone, getKing, reset }
}, {
  persist: {
    pick: ['currentId'],
  },
})
