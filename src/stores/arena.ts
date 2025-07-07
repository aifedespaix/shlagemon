import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ArenaResult = 'none' | 'win' | 'lose'

export const useArenaStore = defineStore('arena', () => {
  const team = ref<DexShlagemon[]>([])
  const enemyTeam = ref<DexShlagemon[]>([])
  const currentIndex = ref(0)
  const result = ref<ArenaResult>('none')
  const badgeEarned = ref(false)

  function start(player: DexShlagemon[], enemy: DexShlagemon[]) {
    team.value = player
    enemyTeam.value = enemy
    currentIndex.value = 0
    result.value = 'none'
    badgeEarned.value = false
  }

  function finish(win: boolean) {
    result.value = win ? 'win' : 'lose'
    if (win)
      badgeEarned.value = true
  }

  function reset() {
    team.value = []
    enemyTeam.value = []
    currentIndex.value = 0
    result.value = 'none'
    badgeEarned.value = false
  }

  return { team, enemyTeam, currentIndex, result, badgeEarned, start, finish, reset }
})
