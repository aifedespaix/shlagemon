<script setup lang="ts">
import AnotherShlagemonDialog from '~/components/dialog/AnotherShlagemonDialog.vue'
import DialogStarter from '~/components/dialog/DialogStarter.vue'
import { useDialogStore } from '~/stores/dialog'
import { useGameStore } from '~/stores/game'
import { useGameStateStore } from '~/stores/gameState'

const dialogStore = useDialogStore()
const gameState = useGameStateStore()
const game = useGameStore()

interface DialogItem {
  id: string
  component: any
  condition: () => boolean
}

const dialogs: DialogItem[] = [
  {
    id: 'starter',
    component: DialogStarter,
    condition: () => !gameState.hasPokemon,
  },
  {
    id: 'richReward',
    component: AnotherShlagemonDialog,
    condition: () => game.shlagidolar >= 100,
  },
]

const active = computed(() => {
  for (const d of dialogs) {
    if (!dialogStore.isDone(d.id) && d.condition())
      return d
  }
  return null
})

function markDone(id: string | undefined) {
  if (id)
    dialogStore.markDone(id)
}
</script>

<template>
  <component
    :is="active?.component"
    v-if="active"
    @done="markDone($event)"
  />
</template>
