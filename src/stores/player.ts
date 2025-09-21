import type { Character } from '~/type/character'
import { defineStore } from 'pinia'
import { getArena } from '~/data/arenas'
import { specialBadges } from '~/data/badges'

export const usePlayerStore = defineStore('player', () => {
  const pseudo = ref('')
  const realName = ref('')
  const gender = ref<Character['gender']>('unknown')
  const arenaBadges = ref<Record<string, boolean>>({})
  const captureLevelCap = ref(19)

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
    captureLevelCap.value = 19
  }

  function earnBadge(id: string) {
    const arena = getArena(id)
    if (arena) {
      arenaBadges.value[id] = true
      captureLevelCap.value = Math.max(captureLevelCap.value, arena.badge.levelCap)
      return
    }
    const special = specialBadges[id as keyof typeof specialBadges]
    if (special) {
      arenaBadges.value[id] = true
      captureLevelCap.value = Math.max(captureLevelCap.value, special.levelCap)
    }
  }

  function hasBadge(id: string) {
    return !!arenaBadges.value[id]
  }

  function unlockCaptureLevel(level: number) {
    captureLevelCap.value = Math.max(captureLevelCap.value, level)
  }

  return {
    pseudo,
    realName,
    gender,
    character,
    arenaBadges,
    badgeCount,
    levelCap,
    captureLevelCap,
    setPlayer,
    earnBadge,
    hasBadge,
    unlockCaptureLevel,
    reset,
  }
}, {
  persist: true,
})
