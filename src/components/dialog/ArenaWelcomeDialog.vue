<script setup lang="ts">
import type { DialogNode } from '~/type/dialog'
import { getArenaTrack, getZoneTrack } from '~/data/music'

const emit = defineEmits(['done'])
const arena = useArenaStore()
const panel = useMainPanelStore()
const zone = useZoneStore()
const dialog = useDialogStore()
const preparationMusic = getArenaTrack('preparation') ?? '/audio/musics/arenas/preparation.ogg'
const exitTrack = ref(preparationMusic)
const { t } = useI18n()

const showIntro = computed(() => !dialog.isDone('arenaWelcomeIntro'))

function quit() {
  arena.reset()
  panel.showVillage()
  exitTrack.value = getZoneTrack(zone.current.id, zone.current.type) ?? preparationMusic
  dialog.markDone('arenaWelcomeIntro')
  emit('done', 'arenaWelcome')
}

const dialogTree = computed<DialogNode[]>(() => {
  if (!showIntro.value) {
    return [
      {
        id: 'start',
        text: t('components.dialog.ArenaWelcomeDialog.steps.step1.text', {
          levelCap: arena.arenaData?.badge.levelCap ?? '',
        }),
        responses: [
          {
            label: t('components.dialog.ArenaWelcomeDialog.steps.step2.responses.start'),
            type: 'valid',
            action: () => {
              dialog.markDone('arenaWelcomeIntro')
              emit('done', 'arenaWelcome')
            },
          },
          {
            label: t('components.dialog.ArenaWelcomeDialog.steps.step2.responses.quit'),
            type: 'danger',
            action: quit,
          },
        ],
      },
    ]
  }
  return [
    {
      id: 'start',
      text: t('components.dialog.ArenaWelcomeDialog.steps.step1.text', {
        levelCap: arena.arenaData?.badge.levelCap ?? '',
      }),
      responses: [
        { label: t('components.dialog.ArenaWelcomeDialog.steps.step1.responses.next'), nextId: 'step2', type: 'primary' },
      ],
    },
    {
      id: 'step2',
      text: t('components.dialog.ArenaWelcomeDialog.steps.step2.text'),
      responses: [
        {
          label: t('components.dialog.ArenaWelcomeDialog.steps.step2.responses.start'),
          type: 'valid',
          action: () => {
            dialog.markDone('arenaWelcomeIntro')
            emit('done', 'arenaWelcome')
          },
        },
        {
          label: t('components.dialog.ArenaWelcomeDialog.steps.step2.responses.quit'),
          type: 'danger',
          action: quit,
        },
      ],
    },
  ]
})
</script>

<template>
  <DialogBox
    :character="arena.arenaData!.character"
    :dialog-tree="dialogTree"
    :exit-track="exitTrack"
  />
</template>
