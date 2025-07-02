import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useGameStore } from './game'
import { useShlagedexStore } from './shlagedex'

export interface Achievement {
  id: string
  title: string
  description: string
}

export type AchievementEvent =
  | { type: 'capture', shiny?: boolean }
  | { type: 'battle-win', stronger: boolean }
  | { type: 'item-used' }
  | { type: 'king-defeated' }

export const useAchievementsStore = defineStore('achievements', () => {
  const game = useGameStore()
  const dex = useShlagedexStore()

  const counters = reactive({
    captures: 0,
    wins: 0,
    winsStronger: 0,
    itemsUsed: 0,
    kings: 0,
    shiny: 0,
  })

  const unlocked = ref<Record<string, boolean>>({})

  function unlock(id: string) {
    if (!unlocked.value[id])
      unlocked.value[id] = true
  }

  const defs: Achievement[] = []
  const moneyThresholds = [100, 1000, 10000, 100000, 1000000]
  moneyThresholds.forEach((n) => {
    defs.push({ id: `money-${n}`, title: `${n} Shlagidolars`, description: `Atteindre ${n} Shlagidolars` })
  })
  const captureThresholds = [1, 10, 100, 1000]
  captureThresholds.forEach((n) => {
    defs.push({ id: `capture-${n}`, title: `${n} captures`, description: `Capturer ${n} Shlagémon` })
  })
  const levelThresholds = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
  levelThresholds.forEach((lvl) => {
    defs.push({ id: `avg-${lvl}`, title: `Niveau moyen ${lvl}`, description: `Atteindre un niveau moyen de ${lvl}` })
  })
  const winThresholds = [1, 10, 100, 1000]
  winThresholds.forEach((n) => {
    defs.push({ id: `win-${n}`, title: `${n} victoires`, description: `Gagner ${n} combats` })
    defs.push({ id: `stronger-${n}`, title: `${n} victoires difficiles`, description: `Vaincre ${n} ennemis plus forts` })
  })
  // extra achievements
  defs.push({ id: 'king-1', title: 'Premier roi', description: 'Vaincre un roi de zone' })
  defs.push({ id: 'shiny-1', title: 'Shiny!', description: 'Capturer un Shlagémon shiny' })
  defs.push({ id: 'item-10', title: 'Dépensier', description: 'Utiliser 10 objets' })
  defs.push({ id: 'team-6', title: 'Équipe complète', description: 'Posséder 6 Shlagémon' })

  const list = computed(() => defs.map(d => ({ ...d, achieved: !!unlocked.value[d.id] })))
  const unlockedList = computed(() => list.value.filter(a => a.achieved))
  const hasAny = computed(() => unlockedList.value.length > 0)

  function handleEvent(e: AchievementEvent) {
    switch (e.type) {
      case 'capture':
        counters.captures += 1
        if (e.shiny)
          counters.shiny += 1
        break
      case 'battle-win':
        counters.wins += 1
        if (e.stronger)
          counters.winsStronger += 1
        break
      case 'item-used':
        counters.itemsUsed += 1
        break
      case 'king-defeated':
        counters.kings += 1
        break
    }
  }

  function checkThresholds(value: number, prefix: string, thresholds: number[]) {
    thresholds.forEach((n) => {
      if (value >= n)
        unlock(`${prefix}-${n}`)
    })
  }

  watch(() => game.shlagidolar, v => checkThresholds(v, 'money', moneyThresholds), { immediate: true })
  watch(() => counters.captures, v => checkThresholds(v, 'capture', captureThresholds))
  watch(() => dex.averageLevel, v => checkThresholds(v, 'avg', levelThresholds), { immediate: true })
  watch(() => counters.wins, v => checkThresholds(v, 'win', winThresholds))
  watch(() => counters.winsStronger, v => checkThresholds(v, 'stronger', winThresholds))
  watch(() => counters.itemsUsed, (v) => {
    if (v >= 10)
      unlock('item-10')
  })
  watch(() => counters.kings, (v) => {
    if (v >= 1)
      unlock('king-1')
  })
  watch(() => counters.shiny, (v) => {
    if (v >= 1)
      unlock('shiny-1')
  })

  watch(() => dex.shlagemons.length, (v) => {
    if (v >= 6)
      unlock('team-6')
  })

  return { list, unlockedList, hasAny, handleEvent }
}, { persist: true })

export function notifyAchievement(event: AchievementEvent) {
  const store = useAchievementsStore()
  store.handleEvent(event)
}
