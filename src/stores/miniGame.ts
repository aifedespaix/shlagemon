import type { MiniGameId } from '~/type/minigame'
import { defineStore } from 'pinia'
import { getMiniGame } from '~/data/minigames'
import { notifyAchievement } from './achievements'
import { useGameStore } from './game'

export const useMiniGameStore = defineStore('miniGame', () => {
  const currentId = ref<MiniGameId | null>(null)
  const phase = ref<'intro' | 'game' | 'success' | 'failure'>('intro')
  const wins = ref(0)

  function select(id: MiniGameId) {
    currentId.value = id
    phase.value = 'intro'
  }

  function play() {
    phase.value = 'game'
  }

  function finish(win: boolean) {
    const def = currentId.value ? getMiniGame(currentId.value) : undefined
    if (win && def) {
      const game = useGameStore()
      game.addShlagidolar(def.reward)
      wins.value += 1
      notifyAchievement({ type: 'minigame-win' })
    }
    phase.value = win ? 'success' : 'failure'
  }

  function quit() {
    currentId.value = null
    phase.value = 'intro'
  }

  return { currentId, phase, wins, select, play, finish, quit }
}, {
  persist: { pick: ['wins'] },
})
