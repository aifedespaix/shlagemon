<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import DialogBox from '~/components/dialog/DialogBox.vue'
import { norman } from '~/data/characters/norman'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { usePlayerStore } from '~/stores/player'

const emit = defineEmits(['done'])

const arena = useArenaStore()
const player = usePlayerStore()
const panel = useMainPanelStore()

function collectBadge() {
  player.earnBadge('norman')
  arena.reset()
  panel.showVillage()
  emit('done', 'arenaVictory')
}

const dialogTree: DialogNode[] = [
  {
    id: 'start',
    text: 'F\u00E9licitations ! Tu as triomph\u00E9 de l\u0027ar\u00E8ne.',
    responses: [
      {
        label: 'R\u00E9cup\u00E9rer le badge',
        type: 'valid',
        action: collectBadge,
      },
    ],
  },
]
</script>

<template>
  <DialogBox
    :speaker="norman.name"
    :avatar-url="`/characters/${norman.id}/${norman.id}.png`"
    :dialog-tree="dialogTree"
  />
</template>
