import type { WearableItem } from '~/type/item'
import { defineStore } from 'pinia'
import AnotherShlagemonDialog from '~/components/dialog/AnotherShlagemonDialog.vue'
import ArenaDefeatDialog from '~/components/dialog/ArenaDefeatDialog.vue'
import ArenaVictoryDialog from '~/components/dialog/ArenaVictoryDialog.vue'
import ArenaWelcomeDialog from '~/components/dialog/ArenaWelcomeDialog.vue'
import AttackPotionDialog from '~/components/dialog/AttackPotionDialog.vue'
import BadgeBoxDialog from '~/components/dialog/BadgeBoxDialog.vue'
import CapturePotionDialog from '~/components/dialog/CapturePotionDialog.vue'
import CuckRingDialog from '~/components/dialog/CuckRingDialog.vue'
import DeveloperSupportDialog from '~/components/dialog/DeveloperSupportDialog.vue'
import DuplicateRarityDialog from '~/components/dialog/DuplicateRarityDialog.vue'
import EggBoxDialog from '~/components/dialog/EggBoxDialog.vue'
import FirstLossDialog from '~/components/dialog/FirstLossDialog.vue'
import HalfDexDialog from '~/components/dialog/HalfDexDialog.vue'
import InventoryIntroDialog from '~/components/dialog/InventoryIntroDialog.vue'
import KingLossDialog from '~/components/dialog/KingLossDialog.vue'
import KingUnlockDialog from '~/components/dialog/KingUnlockDialog.vue'
import Level5Dialog from '~/components/dialog/Level5Dialog.vue'
import NewZoneDialog from '~/components/dialog/NewZoneDialog.vue'
import OdorElixirDialog from '~/components/dialog/OdorElixirDialog.vue'
import PotionInfoDialog from '~/components/dialog/PotionInfoDialog.vue'
import PreyAmuletDialog from '~/components/dialog/PreyAmuletDialog.vue'
import RainbowPotionDialog from '~/components/dialog/RainbowPotionDialog.vue'
import DialogStarter from '~/components/dialog/Starter.vue'
import WearableItemDialog from '~/components/dialog/WearableItemDialog.vue'
import {
  advancedAttackRing,
  attackAmulet,
  attackRing,
} from '~/data/items/wearables/attackRing'
import {
  advancedDefenseRing,
  defenseAmulet,
  defenseRing,
} from '~/data/items/wearables/defenseRing'
import {
  advancedVitalityRing,
  vitalityAmulet,
  vitalityRing,
} from '~/data/items/wearables/vitalityRing'
import { advancedXpRing, xpAmulet, xpRing } from '~/data/items/wearables/xpRing'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useUIStore } from '~/stores/ui'

interface WearableItemDialogProps {
  item: WearableItem
  requiredCount: number
  finishId: string
}

interface DialogItem<T = Record<string, unknown>> {
  id: string
  component: Component
  condition: () => boolean
  props?: T
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
  const badgeBox = useBadgeBoxStore()
  const player = usePlayerStore()
  const ui: ReturnType<typeof useUIStore> = useUIStore()
  const mobile = useMobileTabStore()
  const potionInfo = usePotionInfoStore()
  const showDeveloperSupport = computed(
    () => Boolean(visit.visited['village-boule']),
  )

  const done = ref<DialogDone>({})
  const dialogs: Array<DialogItem | DialogItem<WearableItemDialogProps>> = [
    {
      id: 'starter',
      component: markRaw(DialogStarter),
      condition: () => !gameState.hasPokemon,
    },
    {
      id: 'inventoryIntro',
      component: markRaw(InventoryIntroDialog),
      condition: () => ui.isMobile && mobile.current === 'inventory',
    },
    {
      id: 'rarityIntro',
      component: markRaw(DuplicateRarityDialog),
      condition: () => dex.shlagemons.some(m => m.captureCount > 1),
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
      id: 'rainbowPotion',
      component: markRaw(RainbowPotionDialog),
      condition: () => dex.highestLevel >= 25,
    },
    {
      id: 'vitalityRing',
      component: markRaw(WearableItemDialog),
      props: { item: vitalityRing, requiredCount: 10, finishId: 'vitalityRing' },
      condition: () => dex.shlagemons.length >= 10,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'defenseRing',
      component: markRaw(WearableItemDialog),
      props: { item: defenseRing, requiredCount: 20, finishId: 'defenseRing' },
      condition: () => dex.shlagemons.length >= 20,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'attackRing',
      component: markRaw(WearableItemDialog),
      props: { item: attackRing, requiredCount: 30, finishId: 'attackRing' },
      condition: () => dex.shlagemons.length >= 30,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'xpRing',
      component: markRaw(WearableItemDialog),
      props: { item: xpRing, requiredCount: 40, finishId: 'xpRing' },
      condition: () => dex.shlagemons.length >= 40,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'advancedVitalityRing',
      component: markRaw(WearableItemDialog),
      props: { item: advancedVitalityRing, requiredCount: 50, finishId: 'advancedVitalityRing' },
      condition: () => dex.shlagemons.length >= 50,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'advancedDefenseRing',
      component: markRaw(WearableItemDialog),
      props: { item: advancedDefenseRing, requiredCount: 60, finishId: 'advancedDefenseRing' },
      condition: () => dex.shlagemons.length >= 60,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'advancedAttackRing',
      component: markRaw(WearableItemDialog),
      props: { item: advancedAttackRing, requiredCount: 70, finishId: 'advancedAttackRing' },
      condition: () => dex.shlagemons.length >= 70,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'advancedXpRing',
      component: markRaw(WearableItemDialog),
      props: { item: advancedXpRing, requiredCount: 80, finishId: 'advancedXpRing' },
      condition: () => dex.shlagemons.length >= 80,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'vitalityAmulet',
      component: markRaw(WearableItemDialog),
      props: { item: vitalityAmulet, requiredCount: 90, finishId: 'vitalityAmulet' },
      condition: () => dex.shlagemons.length >= 90,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'defenseAmulet',
      component: markRaw(WearableItemDialog),
      props: { item: defenseAmulet, requiredCount: 100, finishId: 'defenseAmulet' },
      condition: () => dex.shlagemons.length >= 100,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'attackAmulet',
      component: markRaw(WearableItemDialog),
      props: { item: attackAmulet, requiredCount: 110, finishId: 'attackAmulet' },
      condition: () => dex.shlagemons.length >= 110,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'xpAmulet',
      component: markRaw(WearableItemDialog),
      props: { item: xpAmulet, requiredCount: 120, finishId: 'xpAmulet' },
      condition: () => dex.shlagemons.length >= 120,
    } as DialogItem<WearableItemDialogProps>,
    {
      id: 'eggBox',
      component: markRaw(EggBoxDialog),
      condition: () =>
        !box.unlocked
        && ['oeuf-feu', 'oeuf-eau', 'oeuf-herbe', 'oeuf-foudre'].some(id => inventory.items[id])
        && panel.current !== 'miniGame',
    },
    {
      id: 'badgeBox',
      component: markRaw(BadgeBoxDialog),
      condition: () => !badgeBox.unlocked && player.badgeCount > 0 && panel.current !== 'miniGame',
    },
    {
      id: 'capturePotion',
      component: markRaw(CapturePotionDialog),
      condition: () => dex.highestLevel >= 35,
    },
    {
      id: 'odorElixir',
      component: markRaw(OdorElixirDialog),
      condition: () => dex.highestLevel >= 50,
    },
    {
      id: 'cuckRing',
      component: markRaw(CuckRingDialog),
      condition: () => dex.highestLevel >= 60,
    },
    {
      id: 'preyAmulet',
      component: markRaw(PreyAmuletDialog),
      condition: () => dex.highestLevel >= 75,
    },
    {
      id: 'potionInfo',
      component: markRaw(PotionInfoDialog),
      condition: () => potionInfo.pending,
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
      id: 'kingLoss',
      component: markRaw(KingLossDialog),
      condition: () => stats.kingLosses > 0,
    },
    {
      id: 'firstLoss',
      component: markRaw(FirstLossDialog),
      condition: () => stats.losses > 0,
    },
    {
      id: 'developerSupport',
      component: markRaw(DeveloperSupportDialog),
      condition: () => showDeveloperSupport.value,
    },
  ]

  const isDialogVisible = computed(() => {
    const firstLoss = dialogs.find(d => d.id === 'firstLoss')
    const showFirstLoss = firstLoss?.condition()
      && !done.value[firstLoss.id]
    const kingLoss = dialogs.find(d => d.id === 'kingLoss')
    const showKingLoss = kingLoss?.condition()
      && !done.value[kingLoss.id]

    if (panel.current === 'trainerBattle')
      return Boolean(showFirstLoss || showKingLoss)

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
    // keep arenaWelcomeIntro to avoid repeating the full introduction
  }

  function reset() {
    done.value = {}
  }

  return { done, isDone, markDone, reset, resetArenaDialogs, dialogs, isDialogVisible }
}, {
  persist: true,
})
