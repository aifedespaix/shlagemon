<script setup lang="ts">
import type { Character } from '~/type/character'
import type { DialogNode, DialogResponse } from '~/type/dialog'
import { getCharacterTrack, getZoneTrack } from '~/data/music'

/**
 * Props for {@link DialogBox}. Handles dialog tree and music behavior.
 */
const { dialogTree, character, orientation, exitTrack, keepMusicOnExit, playCharacterTrack }
  = withDefaults(defineProps<{
    dialogTree: DialogNode[]
    character: Character
    orientation?: 'row' | 'col'
    /** Track to play when the dialog closes. If omitted, the zone track is used. */
    exitTrack?: string
    /**
     * If true, the currently playing music continues when the dialog closes.
     * Useful when a following scene should keep the character track.
     */
    keepMusicOnExit?: boolean
    /**
     * Whether the character's music should play when the dialog opens.
     * Defaults to true to preserve existing behavior.
     */
    playCharacterTrack?: boolean
  }>(), {
    orientation: 'row',
    keepMusicOnExit: false,
    playCharacterTrack: true,
  })

const developer = useDeveloperStore()
const { t } = useI18n()

const buttonClass = computed(() =>
  orientation === 'col'
    ? 'flex w-full flex-col items-center justify-center text-xs'
    : 'flex flex-1 flex-col items-center justify-center text-xs')

const currentNode = ref<DialogNode | undefined>()
const typingDone = ref(false)
const audio = useAudioStore()
const zone = useZoneStore()

const finishResponse = computed<DialogResponse | undefined>(() => {
  for (let nodeIndex = dialogTree.length - 1; nodeIndex >= 0; nodeIndex -= 1) {
    const node = dialogTree[nodeIndex]
    for (let responseIndex = node.responses.length - 1; responseIndex >= 0; responseIndex -= 1) {
      const response = node.responses[responseIndex]
      if (response.type === 'valid' && !response.nextId)
        return response
    }
  }
  return undefined
})

onMounted(() => {
  currentNode.value = dialogTree[0]
  if (playCharacterTrack) {
    const track = getCharacterTrack(character.id)
    if (track)
      audio.fadeToMusic(track)
    else
      console.warn(`Missing music for character ${character.id}`)
  }
})

watch(currentNode, () => {
  typingDone.value = false
})

onUnmounted(() => {
  if (keepMusicOnExit)
    return
  const track = exitTrack || getZoneTrack(zone.current.id, zone.current.type)
  if (track)
    audio.fadeToMusic(track)
})

function choose(r: DialogResponse) {
  const effect = r.type === 'danger' && r.nextId
    ? 'dialog-back'
    : 'confirm'
  audio.playSfx(effect)
  if (r.action)
    r.action()
  if (r.nextId) {
    currentNode.value = dialogTree.find(d => d.id === r.nextId)
    typingDone.value = false
  }
}

function skipDialog() {
  if (!finishResponse.value)
    return
  choose(finishResponse.value)
}
</script>

<template>
  <div class="relative h-full max-w-xl w-full flex flex-1 flex-col justify-center overflow-hidden">
    <UiButton
      v-if="developer.debug && finishResponse"
      v-tooltip.bottom="t('components.dialog.Box.debug.skip')"
      type="icon"
      size="xs"
      class="absolute right-2 top-2 z-10"
      :aria-label="t('components.dialog.Box.debug.skip')"
      :tabindex="0"
      @click="skipDialog"
    >
      <div class="i-carbon-flash" />
    </UiButton>
    <div class="grid grid-cols-3 max-h-80 flex-1 justify-center gap-2 rounded" md=" ">
      <div class="flex flex-1 flex-col justify-center gap-1">
        <div class="flex-1 basis-0 overflow-hidden">
          <CharacterImage :id="character.id" alt="avatar" class="object-contain" />
        </div>
        <div class="p-1 text-center font-bold">
          {{ character.name }}
        </div>
      </div>

      <div class="col-span-2 flex flex-col justify-center gap-2">
        <div class="min-h-20 flex flex-col justify-center rounded-md bg-black/20 p-2">
          <UiTypingText
            v-if="currentNode"
            :text="currentNode.text"
            @finished="typingDone = true"
          />

          <UiImageByBackground
            v-if="currentNode?.imageUrl"
            :src="currentNode.imageUrl"
            alt="illustration"
            class="min-h-40 flex-1"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-1 overflow-hidden p-2">
      <UiButton
        v-for="r in currentNode?.responses"
        :key="r.label"
        :type="r.type"
        :class="[
          buttonClass,
          typingDone && (r.type === 'valid' || r.type === 'primary') && 'animate-pulse-alt',
        ]"
        :disabled="!typingDone"
        class="max-w-50vw"
        md="text-sm"
        @click="choose(r)"
      >
        <img v-if="r.imageUrl" :src="r.imageUrl" class="mr-1 h-6 w-6" alt="">
        {{ r.label }}
      </UiButton>
    </div>
  </div>
</template>
