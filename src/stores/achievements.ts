import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { zonesData } from '~/data/zones'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
}

export type AchievementEvent
  = | { type: 'capture', shiny?: boolean }
    | { type: 'battle-win', stronger: boolean }
    | { type: 'battle-loss' }
    | { type: 'item-used' }
    | { type: 'king-defeated' }
    | { type: 'minigame-win' }

export const useAchievementsStore = defineStore('achievements', () => {
  const game = useGameStore()
  const dex = useShlagedexStore()
  const progress = useZoneProgressStore()

  const defMap: Record<string, Achievement> = {}

  const counters = reactive({
    captures: 0,
    wins: 0,
    winsStronger: 0,
    losses: 0,
    itemsUsed: 0,
    kings: 0,
    shiny: 0,
    minigameWins: 0,
  })

  const unlocked = useLocalStorage<Record<string, boolean>>(
    'shlagemon_achievements',
    {},
  )

  function reset() {
    counters.captures = 0
    counters.wins = 0
    counters.winsStronger = 0
    counters.losses = 0
    counters.itemsUsed = 0
    counters.kings = 0
    counters.shiny = 0
    counters.minigameWins = 0
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
      title: `${n.toLocaleString()} Shlagédollars`,
      description: `Accumuler au moins ${n.toLocaleString()} Shlagédollars pour montrer votre richesse.`,
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
  const lossThresholds = [1, 10, 100, 1000]
  lossThresholds.forEach((n) => {
    const def = {
      id: `loss-${n}`,
      title:
        n === 1
          ? 'Première tôle'
          : n === 10
            ? 'Serial loser'
            : n === 100
              ? 'Maître de la lose'
              : 'Légende du défaitisme',
      description:
        n === 1
          ? 'Se prendre sa première branlée, ça forge le caractère.'
          : n === 10
            ? 'Enchaîner 10 défaites d\'affilée. On croit en toi... peut-être.'
            : n === 100
              ? 'Accumuler 100 défaites mémorables. La classe, non ?'
              : 'Survivre à 1000 humiliations. Respect éternel.',
      icon: 'mdi:skull-crossbones',
    }
    defs.push(def)
    defMap[def.id] = def
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
  const itemTitles: Record<number, string> = {
    1: 'Premier craquage',
    10: 'Acheteur en série',
    100: 'Shopaholic confirmé',
    1000: 'Banqueroute imminente',
    10000: 'Flambeur intersidéral',
  }
  itemThresholds.forEach((n) => {
    const def = {
      id: `item-${n}`,
      title: itemTitles[n],
      description: `Utiliser ${n.toLocaleString()} objet${n > 1 ? 's' : ''} pendant vos combats ou explorations.`,
      icon: 'carbon:shopping-bag',
    }
    defs.push(def)
    defMap[def.id] = def
  })

  const minigameThresholds = [1, 5, 10]
  minigameThresholds.forEach((n) => {
    const def = {
      id: `minigame-${n}`,
      title: n === 1 ? 'Première partie gagnée' : `${n} victoires mini-jeu`,
      description: `Remporter ${n} partie${n > 1 ? 's' : ''} d\u2019un mini-jeu.`,
      icon: 'carbon:game-console',
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

  const zoneWinThresholds = [10, 100, 1000]
  zonesData.forEach((z) => {
    if (z.completionAchievement) {
      const def = {
        id: `zone-${z.id}-complete`,
        title: z.completionAchievement,
        description: `Capturer tous les Shlagémon de ${z.name}.`,
        icon: 'mdi:map-marker-check',
      }
      defs.push(def)
      defMap[def.id] = def
    }
    zoneWinThresholds.forEach((n) => {
      const def = {
        id: `zone-${z.id}-win-${n}`,
        title: `${n.toLocaleString()} victoires - ${z.name}`,
        description: `Vaincre ${n.toLocaleString()} Shlagémon dans ${z.name}.`,
        icon: 'carbon:sword',
      }
      defs.push(def)
      defMap[def.id] = def
    })
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
      case 'battle-loss':
        counters.losses += 1
        break
      case 'item-used':
        counters.itemsUsed += 1
        break
      case 'king-defeated':
        counters.kings += 1
        break
      case 'minigame-win':
        counters.minigameWins += 1
        break
    }
  }

  function checkThresholds(value: number, prefix: string, thresholds: number[]) {
    thresholds.forEach((n) => {
      if (value >= n)
        unlock(`${prefix}-${n}`)
    })
  }

  const thresholdMap = {
    money: moneyThresholds,
    capture: captureThresholds,
    avg: levelThresholds,
    win: winThresholds,
    stronger: winThresholds,
    loss: lossThresholds,
    item: itemThresholds,
    king: kingThresholds,
    shiny: shinyThresholds,
    minigame: minigameThresholds,
  } as const

  const thresholdCounters = computed(() => ({
    money: game.shlagidolar,
    capture: counters.captures,
    avg: dex.averageLevel,
    win: counters.wins,
    stronger: counters.winsStronger,
    loss: counters.losses,
    item: counters.itemsUsed,
    king: counters.kings,
    shiny: counters.shiny,
    minigame: counters.minigameWins,
  }))

  watch(thresholdCounters, (vals) => {
    Object.entries(thresholdMap).forEach(([key, thresholds]) => {
      const v = vals[key as keyof typeof vals]
      checkThresholds(v, key, thresholds as number[])
    })
  }, { immediate: true })

  function checkZoneCompletion() {
    zonesData.forEach((z) => {
      if (!z.shlagemons?.length || !z.completionAchievement)
        return
      const all = z.shlagemons.every(base =>
        dex.shlagemons.some(m => m.base.id === base.id),
      )
      if (all)
        unlock(`zone-${z.id}-complete`)
    })
  }

  watch(() => dex.shlagemons.length, () => checkZoneCompletion(), { immediate: true })
  watch(progress.wins, (val) => {
    zonesData.forEach((z) => {
      const count = val[z.id] || 0
      checkThresholds(count, `zone-${z.id}-win`, zoneWinThresholds)
    })
  }, { deep: true, immediate: true })

  const level100Count = computed(() =>
    dex.shlagemons.filter(m => m.lvl >= 100).length,
  )
  watch(
    () => dex.potentialCompletionPercent,
    v => checkThresholds(v, 'dex', dexCompletionThresholds),
    { immediate: true },
  )
  watch(level100Count, v => checkThresholds(v, 'lvl100', lvl100Thresholds))
  // Use explicit tuple typing when watching multiple sources
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
    { immediate: true },
  )

  watch(() => dex.shlagemons.length, (v) => {
    if (v >= 6)
      unlock('team-6')
  })

  function getProgress(id: string): { value: number, max: number } | null {
    const numericMatch = id.match(/^(.*)-(\d+)$/)
    if (numericMatch) {
      const prefix = numericMatch[1]
      const max = Number(numericMatch[2])
      switch (prefix) {
        case 'money':
          return { value: game.shlagidolar, max }
        case 'capture':
          return { value: counters.captures, max }
        case 'avg':
          return { value: dex.averageLevel, max }
        case 'win':
          return { value: counters.wins, max }
        case 'stronger':
          return { value: counters.winsStronger, max }
        case 'loss':
          return { value: counters.losses, max }
        case 'item':
          return { value: counters.itemsUsed, max }
        case 'king':
          return { value: counters.kings, max }
        case 'shiny':
          return { value: counters.shiny, max }
        case 'minigame':
          return { value: counters.minigameWins, max }
        case 'dex':
          return { value: dex.potentialCompletionPercent, max }
        case 'lvl100':
          return { value: level100Count.value, max }
        case 'team':
          return { value: dex.shlagemons.length, max }
      }

      const zoneWin = prefix.match(/^zone-(.*)-win$/)
      if (zoneWin)
        return { value: progress.wins.value[zoneWin[1]] || 0, max }
    }

    const zoneComplete = id.match(/^zone-(.*)-complete$/)
    if (zoneComplete) {
      const zoneId = zoneComplete[1]
      const zone = zonesData.find(z => z.id === zoneId)
      if (zone && zone.shlagemons?.length) {
        const captured = zone.shlagemons.filter(base =>
          dex.shlagemons.some(m => m.base.id === base.id),
        ).length
        return { value: captured, max: zone.shlagemons.length }
      }
    }

    return null
  }

  return { list, unlockedList, hasAny, handleEvent, reset, getProgress }
}, {
  persist: {
    pick: ['counters'],
  },
})

export function notifyAchievement(event: AchievementEvent) {
  const store = useAchievementsStore()
  store.handleEvent(event)
}
