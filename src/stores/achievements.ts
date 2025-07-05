import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { toast } from 'vue3-toastify'
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

  const defMap: Record<string, Achievement> = {}

  const counters = reactive({
    captures: 0,
    wins: 0,
    winsStronger: 0,
    itemsUsed: 0,
    kings: 0,
    shiny: 0,
  })

  const unlocked = useLocalStorage<Record<string, boolean>>(
    'shlagemon_achievements',
    {},
  )

  function reset() {
    counters.captures = 0
    counters.wins = 0
    counters.winsStronger = 0
    counters.itemsUsed = 0
    counters.kings = 0
    counters.shiny = 0
    unlocked.value = {}
  }

  function unlock(id: string) {
    if (!unlocked.value[id]) {
      unlocked.value[id] = true
      const def = defMap[id]
      if (def)
        toast.success(`Succès déverrouillé : ${def.title}`, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
    }
  }

  const defs: Achievement[] = []
  const moneyThresholds = [100, 1000, 10000, 100000, 1000000]
  moneyThresholds.forEach((n) => {
    const def = {
      id: `money-${n}`,
      title: `${n.toLocaleString()} Shlagidolars`,
      description: `Accumuler au moins ${n.toLocaleString()} Shlagidolars pour montrer votre richesse.`,
      icon: 'carbon:money',
    }
    defs.push(def)
    defMap[def.id] = def
  })
  const captureThresholds = [1, 10, 100, 1000]
  captureThresholds.forEach((n) => {
    const def = {
      id: `capture-${n}`,
      title: `${n.toLocaleString()} captures`,
      description: `Attraper ${n.toLocaleString()} Shlagémon différents durant vos aventures.`,
      icon: 'mdi:pokeball',
    }
    defs.push(def)
    defMap[def.id] = def
  })
  const levelThresholds = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
  levelThresholds.forEach((lvl) => {
    const def = {
      id: `avg-${lvl}`,
      title: `Niveau moyen ${lvl}`,
      description: `Atteindre un niveau moyen de ${lvl} pour votre équipe.`,
      icon: 'carbon:chart-line',
    }
    defs.push(def)
    defMap[def.id] = def
  })
  const winThresholds = [1, 10, 100, 1000, 10000]
  winThresholds.forEach((n) => {
    const defWin = {
      id: `win-${n}`,
      title: `${n.toLocaleString()} victoires`,
      description: `Remporter ${n.toLocaleString()} combats contre vos adversaires.`,
      icon: 'carbon:trophy',
    }
    defs.push(defWin)
    defMap[defWin.id] = defWin
    const defStrong = {
      id: `stronger-${n}`,
      title: `${n.toLocaleString()} victoires difficiles`,
      description: `Vaincre ${n.toLocaleString()} adversaires plus puissants que vous.`,
      icon: 'carbon:fire',
    }
    defs.push(defStrong)
    defMap[defStrong.id] = defStrong
  })
  const shinyThresholds = [1, 10, 100, 1000]
  shinyThresholds.forEach((n) => {
    const def = {
      id: `shiny-${n}`,
      title: n === 1 ? 'Shiny!' : `${n.toLocaleString()} shiny`,
      description: `Capturer ${n.toLocaleString()} Shlagémon shiny extrêmement rares.`,
      icon: 'carbon:star',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  const itemThresholds = [1, 10, 100, 1000, 10000]
  itemThresholds.forEach((n) => {
    const def = {
      id: `item-${n}`,
      title: 'Dépensier',
      description: `Utiliser ${n.toLocaleString()} objet${n > 1 ? 's' : ''} pendant vos combats ou explorations.`,
      icon: 'carbon:shopping-bag',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  const kingThresholds = [1, 2, 3, 4, 5, 6, 7]
  kingThresholds.forEach((n) => {
    const def = {
      id: `king-${n}`,
      title: n === 1 ? 'Premier roi' : `${n} rois vaincus`,
      description: `Terrasser ${n} roi${n > 1 ? 's' : ''} de zone pour restaurer la paix.`,
      icon: 'mdi:crown',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  // extra achievements
  const teamDef = {
    id: 'team-6',
    title: 'Équipe complète',
    description: 'Former une équipe composée de 6 Shlagémon.',
    icon: 'carbon:user-multiple',
  }
  defs.push(teamDef)
  defMap[teamDef.id] = teamDef

  const dexCompletionThresholds = [10, 50, 75, 99, 100]
  dexCompletionThresholds.forEach((pct) => {
    const def = {
      id: `dex-${pct}`,
      title:
        pct === 10
          ? 'Petit curieux'
          : pct === 50
            ? 'À mi-chemin'
            : pct === 75
              ? 'Expert du Dex'
              : pct === 99
                ? 'Plus qu\'un !'
                : 'Archiviste suprême',
      description: `Atteindre ${pct}% de complétion du Shlagédex en capturant suffisamment de créatures.`,
      icon: 'mdi:book-open-page-variant',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  const lvl100Thresholds = [1, 10, 100]
  lvl100Thresholds.forEach((n) => {
    const def = {
      id: `lvl100-${n}`,
      title:
        n === 1
          ? 'Champion solo'
          : n === 10
            ? 'Dresseur mythique'
            : 'Légende vivante',
      description: `Avoir ${n} Shlagémon au niveau 100 dans votre Shlagédex.`,
      icon: 'carbon:skill-level-advanced',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  const fullDexDef = {
    id: 'dex-full-100',
    title: 'Shlagémaster ultime',
    description:
      'Compléter le Shlagédex avec toutes les créatures élevées au niveau 100.',
    icon: 'mdi:account-crown',
  }
  defs.push(fullDexDef)
  defMap[fullDexDef.id] = fullDexDef

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
  watch(() => counters.itemsUsed, v => checkThresholds(v, 'item', itemThresholds))
  watch(() => counters.kings, v => checkThresholds(v, 'king', kingThresholds))
  watch(() => counters.shiny, v => checkThresholds(v, 'shiny', shinyThresholds))

  const level100Count = computed(() =>
    dex.shlagemons.filter(m => m.lvl >= 100).length,
  )
  watch(
    () => dex.potentialCompletionPercent,
    v => checkThresholds(v, 'dex', dexCompletionThresholds),
    { immediate: true },
  )
  watch(level100Count, v => checkThresholds(v, 'lvl100', lvl100Thresholds))
  watch(
    [() => dex.potentialCompletionPercent, level100Count, () => dex.shlagemons.length],
    () => {
      if (
        dex.potentialCompletionPercent === 100
        && dex.shlagemons.every(m => m.lvl >= 100)
      ) {
        unlock('dex-full-100')
      }
    },
  )

  watch(() => dex.shlagemons.length, (v) => {
    if (v >= 6)
      unlock('team-6')
  })

  return { list, unlockedList, hasAny, handleEvent, reset }
}, {
  persist: {
    // @ts-expect-error wrong typings from pinia-plugin
    paths: ['counters'],
  },
})

export function notifyAchievement(event: AchievementEvent) {
  const store = useAchievementsStore()
  store.handleEvent(event)
}
