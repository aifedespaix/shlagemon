<script setup lang="ts">
import type { DialogNode, DialogResponse } from '~/type/dialog'
import Button from '~/components/ui/Button.vue'
import { useAudioStore } from '~/stores/audio'
import ImageByBackground from '../ui/ImageByBackground.vue'

const { dialogTree, speaker, avatarUrl, orientation }
  = withDefaults(defineProps<{
    dialogTree: DialogNode[]
    speaker: string
    avatarUrl: string
    orientation?: 'row' | 'col'
  }>(), {
    orientation: 'row',
  })

const buttonClass = computed(() =>
  orientation === 'col'
    ? 'flex w-full flex-col items-center justify-center text-xs'
    : 'flex flex-1 flex-col items-center justify-center text-xs')

const currentNode = ref<DialogNode | undefined>()
const audio = useAudioStore()

onMounted(() => {
  currentNode.value = dialogTree[0]
})

function choose(r: DialogResponse) {
  audio.playSfx('/audio/sfx/confirm.ogg')
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
        <ImageByBackground :src="avatarUrl" alt="avatar" class="w-full flex-1 object-contain" />
        <div class="p-1 text-center font-bold">
          {{ speaker }}
        </div>
      </div>

      <div class="bg- col-span-2 h-full flex flex-col gap-2 p-2">
        <div class="flex flex-1 flex-col justify-center">
          <div>
            {{ currentNode?.text }}
          </div>

          <ImageByBackground
            v-if="currentNode?.imageUrl"
            :src="currentNode.imageUrl"
            alt="illustration"
            class="flex-1"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-1">
      <Button
        v-for="r in currentNode?.responses"
        :key="r.label"
        :type="r.type"
        :class="buttonClass"
        class="max-w-50vw"
        md="text-sm"
        @click="choose(r)"
      >
        <img v-if="r.imageUrl" :src="r.imageUrl" class="mr-1 h-6 w-6" alt="">
        {{ r.label }}
      </Button>
    </div>
  </div>
</template>
