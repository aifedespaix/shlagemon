<script setup lang="ts">
import type { Character } from '~/type/character'
import type { DialogNode } from '~/type/dialog'
import { getCharacterTrack, getZoneTrack } from '~/data/music'

interface Props {
  title: string
  exitText: string
  /** Icon for the exit button. */
  exitIcon?: string
  character: Character
  /**
   * Generates the intro dialog tree. Call the provided callback to display the content.
   */
  createIntro?: (start: () => void) => DialogNode[]
  /**
   * Generates the outro dialog tree. Call the provided callback to end the flow.
   */
  createOutro?: (result: string | undefined, exit: () => void) => DialogNode[]
  /**
   * Optional music track to play once the flow exits. Defaults to the zone track.
   */
  exitTrack?: string
  /**
   * If false, the character track is never played. Defaults to true.
   */
  playCharacterTrack?: boolean
}

defineOptions({ name: 'PanelPoiDialogFlow' })

const props = withDefaults(defineProps<Props>(), {
  playCharacterTrack: true,
})
const emit = defineEmits<{ (e: 'exit'): void }>()

const phase = ref<'intro' | 'content' | 'outro'>(props.createIntro ? 'intro' : 'content')
const introDialog = computed(() => props.createIntro ? props.createIntro(startContent) : [])
const outroDialog = ref<DialogNode[] | null>(null)

const audio = useAudioStore()
const zone = useZoneStore()

function startContent() {
  phase.value = 'content'
}

function finish(result?: string) {
  if (props.createOutro) {
    outroDialog.value = props.createOutro(result, onExit)
    phase.value = 'outro'
  }
  else {
    onExit()
  }
}

function onExit() {
  const track = props.exitTrack || getZoneTrack(zone.current.id, zone.current.type)
  if (track)
    audio.fadeToMusic(track)
  emit('exit')
}

onMounted(() => {
  if (!props.createIntro && props.playCharacterTrack) {
    const track = getCharacterTrack(props.character.id)
    if (track)
      audio.fadeToMusic(track)
  }
})

/**
 * Exposes methods for parent components to control the dialog flow.
 */
defineExpose({ startContent })
</script>

<template>
  <LayoutTitledPanel
    :title="props.title"
    :exit-text="props.exitText"
    :show-footer="phase === 'content'"
  >
    <div class="tiny-scrollbar flex flex-1 flex-col items-center overflow-auto">
      <DialogBox
        v-if="phase === 'intro'"
        :character="props.character"
        :dialog-tree="introDialog"
        keep-music-on-exit
        orientation="col"
        :play-character-track="props.playCharacterTrack"
      />
      <slot v-else-if="phase === 'content'" :finish="finish" />
      <DialogBox
        v-else
        :character="props.character"
        :dialog-tree="outroDialog!"
        :exit-track="props.exitTrack"
        orientation="col"
        :play-character-track="props.playCharacterTrack"
      />
    </div>
    <template #footer>
      <slot v-if="phase === 'content'" name="footer" :finish="finish" />
      <UiButton
        type="danger"
        variant="outline"
        class="flex gap-2 text-xs"
        size="xs"
        @click="finish()"
      >
        <div :class="props.exitIcon || 'i-carbon:exit'" />
        {{ props.exitText }}
      </UiButton>
    </template>
  </LayoutTitledPanel>
</template>
