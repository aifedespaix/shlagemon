<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { getArenaTrack, getZoneTrack } from '~/data/music'
import { useArenaStore } from '~/stores/arena'
import { useMainPanelStore } from '~/stores/mainPanel'
import { usePlayerStore } from '~/stores/player'
import { useZoneStore } from '~/stores/zone'
import { useZoneProgressStore } from '~/stores/zoneProgress'

const emit = defineEmits(['done'])

const arena = useArenaStore()
const player = usePlayerStore()
const panel = useMainPanelStore()
const progress = useZoneProgressStore()
const zone = useZoneStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)

function collectBadge() {
  if (!arena.arenaData)
    return
  player.earnBadge(arena.arenaData.id)
  progress.completeArena(zone.current.id)
  zone.completeArena(zone.current.id)
  toast.success(`Badge ${arena.arenaData.badge.name} obtenu !`)
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
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
    :character="arena.arenaData!.character"
    :avatar-url="`/characters/${arena.arenaData?.character.id}/${arena.arenaData?.character.id}.png`"
    :dialog-tree="dialogTree"
    :exit-track="exitTrack"
  />
</template>
