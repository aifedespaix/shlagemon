import type { Character } from '~/type/character'
import { defineStore } from 'pinia'
import { getArena } from '~/data/arenas'

export const usePlayerStore = defineStore('player', () => {
  const pseudo = ref('')
  const realName = ref('')
  const gender = ref<Character['gender']>('unknown')
  const arenaBadges = ref<Record<string, boolean>>({})
  const captureLevelCap = ref(20)

  const badgeCount = computed(() =>
    Object.values(arenaBadges.value).filter(v => v).length,
  )

  const levelCap = computed(() => 10 + badgeCount.value * 10)

  const character = computed<Character>(() => ({
    id: 'player',
    name: pseudo.value,
    gender: gender.value,
  }))

  function setPlayer(data: {
    pseudo: string
    realName: string
    gender: Character['gender']
  }) {
    pseudo.value = data.pseudo
    realName.value = data.realName
    gender.value = data.gender
  }

  function reset() {
    pseudo.value = ''
    realName.value = ''
    gender.value = 'unknown'
    arenaBadges.value = {}
    captureLevelCap.value = 20
  }

  function earnBadge(id: string) {
    arenaBadges.value[id] = true
    const arena = getArena(id)
    if (arena)
      captureLevelCap.value = Math.max(captureLevelCap.value, arena.badge.levelCap)
  }

  function hasBadge(id: string) {
    return !!arenaBadges.value[id]
  }

  return {
    pseudo,
    realName,
    gender,
    character,
    arenaBadges,
    levelCap,
    captureLevelCap,
    setPlayer,
    earnBadge,
    hasBadge,
    reset,
  }
}, {
  persist: true,
})
