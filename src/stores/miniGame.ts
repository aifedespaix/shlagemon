import type { MiniGameId } from '~/type/minigame'
import { defineStore } from 'pinia'
import { getMiniGame } from '~/data/minigames'

export const useMiniGameStore = defineStore('miniGame', () => {
  const currentId = ref<MiniGameId | null>(null)
  const phase = ref<'intro' | 'game' | 'success' | 'failure' | 'draw'>('intro')
  const wins = ref(0)

  function select(id: MiniGameId) {
    currentId.value = id
    phase.value = 'intro'
  }

  function play() {
    phase.value = 'game'
  }

  function finish(result: 'win' | 'lose' | 'draw') {
    const def = currentId.value ? getMiniGame(currentId.value) : undefined
    if (result === 'win' && def) {
      const game = useGameStore()
      const inventory = useInventoryStore()
      if (def.reward.type === 'money')
        game.addShlagidolar(def.reward.amount)
      else if (def.reward.type === 'item')
        inventory.add(def.reward.itemId)
      wins.value += 1
      notifyAchievement({ type: 'minigame-win' })
    }
    if (result === 'win')
      phase.value = 'success'
    else if (result === 'lose')
      phase.value = 'failure'
    else
      phase.value = 'draw'
  }

  function quit() {
    currentId.value = null
    phase.value = 'intro'
  }

  return { currentId, phase, wins, select, play, finish, quit }
}, {
  persist: { pick: ['wins'] },
})
