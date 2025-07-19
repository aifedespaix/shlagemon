import type { Component } from 'vue'
import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import AdvancedAttackRingDialog from '~/components/dialog/AdvancedAttackRingDialog.vue'
import AdvancedDefenseRingDialog from '~/components/dialog/AdvancedDefenseRingDialog.vue'
import AdvancedVitalityRingDialog from '~/components/dialog/AdvancedVitalityRingDialog.vue'
import AdvancedXpRingDialog from '~/components/dialog/AdvancedXpRingDialog.vue'
import AnotherShlagemonDialog from '~/components/dialog/AnotherShlagemonDialog.vue'
import ArenaDefeatDialog from '~/components/dialog/ArenaDefeatDialog.vue'
import ArenaVictoryDialog from '~/components/dialog/ArenaVictoryDialog.vue'
import ArenaWelcomeDialog from '~/components/dialog/ArenaWelcomeDialog.vue'
import AttackAmuletDialog from '~/components/dialog/AttackAmuletDialog.vue'
import AttackPotionDialog from '~/components/dialog/AttackPotionDialog.vue'
import AttackRingDialog from '~/components/dialog/AttackRingDialog.vue'
import CapturePotionDialog from '~/components/dialog/CapturePotionDialog.vue'
import DefenseAmuletDialog from '~/components/dialog/DefenseAmuletDialog.vue'
import DefenseRingDialog from '~/components/dialog/DefenseRingDialog.vue'
import EggBoxDialog from '~/components/dialog/EggBoxDialog.vue'
import FirstLossDialog from '~/components/dialog/FirstLossDialog.vue'
import HalfDexDialog from '~/components/dialog/HalfDexDialog.vue'
import KingUnlockDialog from '~/components/dialog/KingUnlockDialog.vue'
import Level5Dialog from '~/components/dialog/Level5Dialog.vue'
import NewZoneDialog from '~/components/dialog/NewZoneDialog.vue'
import DialogStarter from '~/components/dialog/Starter.vue'
import VitalityAmuletDialog from '~/components/dialog/VitalityAmuletDialog.vue'
import VitalityRingDialog from '~/components/dialog/VitalityRingDialog.vue'
import XpAmuletDialog from '~/components/dialog/XpAmuletDialog.vue'
import XpRingDialog from '~/components/dialog/XpRingDialog.vue'
import { useGameStore } from '~/stores/game'
import { useGameStateStore } from '~/stores/gameState'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useArenaStore } from './arena'
import { useBattleStatsStore } from './battleStats'
import { useEggBoxStore } from './eggBox'
import { useInventoryStore } from './inventory'
import { useMainPanelStore } from './mainPanel'
import { useZoneStore } from './zone'
import { useZoneProgressStore } from './zoneProgress'
import { useZoneVisitStore } from './zoneVisit'

interface DialogItem {
  id: string
  component: Component
  condition: () => boolean
}
export interface DialogDone {
  [id: string]: boolean
}

export const useDialogStore = defineStore('dialog', () => {
  const gameState = useGameStateStore()
  const game = useGameStore()
  const dex = useShlagedexStore()
  const panel = useMainPanelStore()
  const stats = useBattleStatsStore()
  const arena = useArenaStore()
  const progress = useZoneProgressStore()
  const zone = useZoneStore()
  const visit = useZoneVisitStore()
  const inventory = useInventoryStore()
  const box = useEggBoxStore()

  const done = ref<DialogDone>({})
  const dialogs: DialogItem[] = [
    {
      id: 'starter',
      component: markRaw(DialogStarter),
      condition: () => !gameState.hasPokemon,
    },
    {
      id: 'richReward',
      component: markRaw(AnotherShlagemonDialog),
      condition: () => game.shlagidolar >= 10,
    },
    {
      id: 'level5',
      component: markRaw(Level5Dialog),
      condition: () => dex.highestLevel >= 5,
    },
    {
      id: 'halfDex',
      component: markRaw(HalfDexDialog),
      condition: () => dex.completionPercent >= 50,
    },
    {
      id: 'attackPotion',
      component: markRaw(AttackPotionDialog),
      condition: () => dex.highestLevel >= 10,
    },
    {
      id: 'vitalityRing',
      component: markRaw(VitalityRingDialog),
      condition: () => dex.shlagemons.length >= 10,
    },
    {
      id: 'defenseRing',
      component: markRaw(DefenseRingDialog),
      condition: () => dex.shlagemons.length >= 20,
    },
    {
      id: 'attackRing',
      component: markRaw(AttackRingDialog),
      condition: () => dex.shlagemons.length >= 30,
    },
    {
      id: 'xpRing',
      component: markRaw(XpRingDialog),
      condition: () => dex.shlagemons.length >= 40,
    },
    {
      id: 'advancedVitalityRing',
      component: markRaw(AdvancedVitalityRingDialog),
      condition: () => dex.shlagemons.length >= 50,
    },
    {
      id: 'advancedDefenseRing',
      component: markRaw(AdvancedDefenseRingDialog),
      condition: () => dex.shlagemons.length >= 60,
    },
    {
      id: 'advancedAttackRing',
      component: markRaw(AdvancedAttackRingDialog),
      condition: () => dex.shlagemons.length >= 70,
    },
    {
      id: 'advancedXpRing',
      component: markRaw(AdvancedXpRingDialog),
      condition: () => dex.shlagemons.length >= 80,
    },
    {
      id: 'vitalityAmulet',
      component: markRaw(VitalityAmuletDialog),
      condition: () => dex.shlagemons.length >= 90,
    },
    {
      id: 'defenseAmulet',
      component: markRaw(DefenseAmuletDialog),
      condition: () => dex.shlagemons.length >= 100,
    },
    {
      id: 'attackAmulet',
      component: markRaw(AttackAmuletDialog),
      condition: () => dex.shlagemons.length >= 110,
    },
    {
      id: 'xpAmulet',
      component: markRaw(XpAmuletDialog),
      condition: () => dex.shlagemons.length >= 120,
    },
    {
      id: 'eggBox',
      component: markRaw(EggBoxDialog),
      condition: () => !box.unlocked && ['oeuf-feu', 'oeuf-eau', 'oeuf-herbe'].some(id => inventory.items[id]),
    },
    {
      id: 'capturePotion',
      component: markRaw(CapturePotionDialog),
      condition: () => dex.highestLevel >= 50,
    },
    {
      id: 'kingUnlock',
      component: markRaw(KingUnlockDialog),
      condition: () => progress.canFightKing(zone.current.id) && !progress.isKingDefeated(zone.current.id),
    },
    {
      id: 'newZone',
      component: markRaw(NewZoneDialog),
      condition: () => visit.hasNewZone,
    },
    {
      id: 'arenaWelcome',
      component: markRaw(ArenaWelcomeDialog),
      condition: () => panel.current === 'arena',
    },
    {
      id: 'arenaVictory',
      component: markRaw(ArenaVictoryDialog),
      condition: () => arena.badgeEarned,
    },
    {
      id: 'arenaDefeat',
      component: markRaw(ArenaDefeatDialog),
      condition: () => arena.result === 'lose',
    },
    {
      id: 'firstLoss',
      component: markRaw(FirstLossDialog),
      condition: () => stats.losses > 0,
    },
  ]

  const isDialogVisible = computed(() => {
    const firstLoss = dialogs.find(d => d.id === 'firstLoss')
    const showFirstLoss = firstLoss?.condition()
      && !done.value[firstLoss.id]

    if (panel.current === 'trainerBattle')
      return Boolean(showFirstLoss)

    return dialogs.some(d => d.condition() && !done.value[d.id])
  })

  function isDone(id: string) {
    return done.value[id] === true
  }

  function markDone(id: string) {
    done.value[id] = true
  }

  function resetArenaDialogs() {
    done.value.arenaWelcome = false
    done.value.arenaVictory = false
    done.value.arenaDefeat = false
  }

  function reset() {
    done.value = {}
  }

  return { done, isDone, markDone, reset, resetArenaDialogs, dialogs, isDialogVisible }
}, {
  persist: true,
})
