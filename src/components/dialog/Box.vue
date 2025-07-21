<script setup lang="ts">
import type { Character } from '~/type/character'
import type { DialogNode, DialogResponse } from '~/type/dialog'
import { getCharacterTrack, getZoneTrack } from '~/data/music'

const { dialogTree, character, avatarUrl, orientation, exitTrack }
  = withDefaults(defineProps<{
    dialogTree: DialogNode[]
    character: Character
    avatarUrl: string
    orientation?: 'row' | 'col'
    exitTrack?: string
  }>(), {
    orientation: 'row',
  })

const buttonClass = computed(() =>
  orientation === 'col'
    ? 'flex w-full flex-col items-center justify-center text-xs'
    : 'flex flex-1 flex-col items-center justify-center text-xs')

const currentNode = ref<DialogNode | undefined>()
const audio = useAudioStore()
const zone = useZoneStore()

onMounted(() => {
  currentNode.value = dialogTree[0]
  const track = getCharacterTrack(character.id)
  if (track)
    audio.fadeToMusic(track)
  else
    console.warn(`Missing music for character ${character.id}`)
})

onUnmounted(() => {
  const track = exitTrack || getZoneTrack(zone.current.id, zone.current.type)
  if (track)
    audio.fadeToMusic(track)
})

function choose(r: DialogResponse) {
  const effect = r.type === 'danger' && r.nextId
    ? '/audio/sfx/dialog-back.ogg'
    : '/audio/sfx/confirm.ogg'
  audio.playSfx(effect)
  if (r.nextId)
    currentNode.value = dialogTree.find(d => d.id === r.nextId)
  else if (r.action)
    r.action()
}
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <div class="grid grid-cols-3 h-full max-h-50vh flex-1 gap-2 rounded" bg="light-100 dark:gray-800">
      <div class="flex flex-col items-center justify-center">
        <UiImageByBackground :src="avatarUrl" alt="avatar" class="w-full flex-1 object-contain" />
        <div class="p-1 text-center font-bold">
          {{ character.name }}
        </div>
      </div>

      <div class="col-span-2 h-full flex flex-col gap-2 bg-gray-100 p-2 dark:bg-gray-800">
        <div class="flex flex-1 flex-col justify-center">
          <UiTypingText v-if="currentNode" :text="currentNode.text" />

          <UiImageByBackground
            v-if="currentNode?.imageUrl"
            :src="currentNode.imageUrl"
            alt="illustration"
            class="flex-1"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-1">
      <UiButton
        v-for="r in currentNode?.responses"
        :key="r.label"
        :type="r.type"
        :class="[buttonClass, (r.type === 'valid' || r.type === 'primary') && 'animate-bounce']"
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
