import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import AnotherShlagemonDialog from '~/components/dialog/AnotherShlagemonDialog.vue'
import DialogStarter from '~/components/dialog/DialogStarter.vue'
import ReleaseSchlagemonDialog from '~/components/dialog/ReleaseSchlagemonDialog.vue'
import { useGameStore } from '~/stores/game'
import { useGameStateStore } from '~/stores/gameState'
import { useShlagedexStore } from '~/stores/shlagedex'

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
      id: 'release',
      component: markRaw(ReleaseSchlagemonDialog),
      condition: () => dex.shlagemons.length >= 10,
    },
  ]

  const isDialogVisible = computed(() => dialogs.some(d => d.condition() && !done.value[d.id]))

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
