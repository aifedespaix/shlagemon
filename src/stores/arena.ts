import type { BaseShlagemon, DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ArenaResult = 'none' | 'win' | 'lose'

export const useArenaStore = defineStore('arena', () => {
  const team = ref<DexShlagemon[]>([])
  const enemyTeam = ref<DexShlagemon[]>([])
  const lineup = ref<BaseShlagemon[]>([])
  const selections = ref<(string | null)[]>([])
  const currentIndex = ref(0)
  const result = ref<ArenaResult>('none')
  const badgeEarned = ref(false)
  const inBattle = ref(false)

  function setLineup(enemies: BaseShlagemon[]) {
    lineup.value = enemies
    selections.value = Array.from({ length: enemies.length }).fill(null)
  }

  function selectPlayer(index: number, id: string | null) {
    if (id) {
      const other = selections.value.findIndex((s, i) => s === id && i !== index)
      if (other !== -1)
        selections.value[other] = null
    }
    selections.value[index] = id
  }

  function start(player: DexShlagemon[], enemy: DexShlagemon[]) {
    team.value = player
    enemyTeam.value = enemy
    currentIndex.value = 0
    result.value = 'none'
    badgeEarned.value = false
    inBattle.value = true
  }

  function finish(win: boolean) {
    result.value = win ? 'win' : 'lose'
    if (win)
      badgeEarned.value = true
    inBattle.value = false
  }

  function reset() {
    team.value = []
    enemyTeam.value = []
    lineup.value = []
    selections.value = []
    currentIndex.value = 0
    result.value = 'none'
    badgeEarned.value = false
    inBattle.value = false
  }

  return {
    team,
    enemyTeam,
    lineup,
    selections,
    currentIndex,
    result,
    badgeEarned,
    inBattle,
    setLineup,
    selectPlayer,
    start,
    finish,
    reset,
  }
})
