import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import AnotherShlagemonDialog from '~/components/dialog/AnotherShlagemonDialog.vue'
import DialogStarter from '~/components/dialog/DialogStarter.vue'
import HalfDexDialog from '~/components/dialog/HalfDexDialog.vue'
import Level5Dialog from '~/components/dialog/Level5Dialog.vue'
import ReleaseShlagemonDialog from '~/components/dialog/ReleaseShlagemonDialog.vue'
import { useGameStore } from '~/stores/game'
import { useGameStateStore } from '~/stores/gameState'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useMainPanelStore } from './mainPanel'

interface DialogItem {
  id: string
  component: any
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
      id: 'release',
      component: markRaw(ReleaseShlagemonDialog),
      condition: () => dex.shlagemons.length >= 10,
    },
  ]

  const isDialogVisible = computed(() => {
    if (panel.current === 'trainerBattle')
      return false
    return dialogs.some(d => d.condition() && !done.value[d.id])
  })

  function isDone(id: string) {
    return done.value[id] === true
  }

  function markDone(id: string) {
    done.value[id] = true
  }

  function reset() {
    done.value = {}
  }

  return { done, isDone, markDone, reset, dialogs, isDialogVisible }
}, {
  persist: true,
})
