import { defineStore } from 'pinia'
import { notifyAchievement } from './achievements'
import { useGameStore } from './game'

function scoreToWin(level: number) {
  return level * 10
}

export const useMiniGameStore = defineStore('miniGame', () => {
  const level = ref(1)
  const score = ref(0)
  const wins = ref(0)
  const isRunning = ref(false)
  const timeLeft = ref(30)
  let timer: number | undefined

  function start() {
    score.value = 0
    timeLeft.value = 30
    isRunning.value = true
    clearInterval(timer)
    timer = window.setInterval(() => {
      timeLeft.value -= 1
      if (timeLeft.value <= 0)
        finish()
    }, 1000)
  }

  function hit() {
    if (isRunning.value)
      score.value += 1
  }

  function finish() {
    clearInterval(timer)
    isRunning.value = false
    const goal = scoreToWin(level.value)
    if (score.value >= goal) {
      const game = useGameStore()
      game.addShlagidolar(level.value * 100)
      level.value += 1
      wins.value += 1
      notifyAchievement({ type: 'minigame-win' })
    }
    else {
      level.value = 1
    }
  }

  return { level, score, wins, isRunning, timeLeft, start, hit, finish, scoreToWin }
}, {
  persist: true,
})
