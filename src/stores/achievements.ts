import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useGameStore } from './game'
import { useShlagedexStore } from './shlagedex'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
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

  function reset() {
    // counters.captures = 0
    // counters.wins = 0
    // counters.winsStronger = 0
    // counters.itemsUsed = 0
    // counters.kings = 0
    // counters.shiny = 0
    // unlocked.value = {}
  }

  const unlocked = useLocalStorage<Record<string, boolean>>(
    'shlagemon_achievements',
    {},
  )

  function unlock(id: string) {
    if (!unlocked.value[id])
      unlocked.value[id] = true
  }

  const defs: Achievement[] = []
  const moneyThresholds = [100, 1000, 10000, 100000, 1000000]
  moneyThresholds.forEach((n) => {
    defs.push({
      id: `money-${n}`,
      title: `${n} Shlagidolars`,
      description: `Accumuler au moins ${n} Shlagidolars pour montrer votre richesse.`,
      icon: 'carbon:money',
    })
  })
  const captureThresholds = [1, 10, 100, 1000]
  captureThresholds.forEach((n) => {
    defs.push({
      id: `capture-${n}`,
      title: `${n} captures`,
      description: `Attraper ${n} Shlagémon différents durant vos aventures.`,
      icon: 'mdi:pokeball',
    })
  })
  const levelThresholds = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
  levelThresholds.forEach((lvl) => {
    defs.push({
      id: `avg-${lvl}`,
      title: `Niveau moyen ${lvl}`,
      description: `Atteindre un niveau moyen de ${lvl} pour votre équipe.`,
      icon: 'carbon:chart-line',
    })
  })
  const winThresholds = [1, 10, 100, 1000]
  winThresholds.forEach((n) => {
    defs.push({
      id: `win-${n}`,
      title: `${n} victoires`,
      description: `Remporter ${n} combats contre vos adversaires.`,
      icon: 'carbon:trophy',
    })
    defs.push({
      id: `stronger-${n}`,
      title: `${n} victoires difficiles`,
      description: `Vaincre ${n} adversaires plus puissants que vous.`,
      icon: 'carbon:fire',
    })
  })
  // extra achievements
  defs.push({
    id: 'king-1',
    title: 'Premier roi',
    description: 'Terrasser votre premier roi de zone pour restaurer la paix.',
    icon: 'mdi:crown',
  })
  defs.push({
    id: 'shiny-1',
    title: 'Shiny!',
    description: 'Capturer un Shlagémon shiny extrêmement rare.',
    icon: 'carbon:star',
  })
  defs.push({
    id: 'item-10',
    title: 'Dépensier',
    description: 'Utiliser 10 objets pendant vos combats ou explorations.',
    icon: 'carbon:shopping-bag',
  })
  defs.push({
    id: 'team-6',
    title: 'Équipe complète',
    description: 'Former une équipe composée de 6 Shlagémon.',
    icon: 'carbon:user-multiple',
  })

  const list = computed(() =>
    defs.map(d => ({ ...d, achieved: !!unlocked.value[d.id] })),
  )
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

  return { list, unlockedList, hasAny, handleEvent, reset }
}, {
  persist: {
    paths: ['counters'],
  },
})

export function notifyAchievement(event: AchievementEvent) {
  const store = useAchievementsStore()
  store.handleEvent(event)
}
