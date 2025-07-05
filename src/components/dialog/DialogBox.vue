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

const responsesClass = computed(() =>
  orientation === 'col'
    ? 'mt-auto flex flex-col gap-2 overflow-auto tiny-scrollbar max-h-40'
    : 'mt-auto flex justify-center gap-2')

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
  <div class="grid grid-cols-3 h-full gap-2 rounded" bg="white dark:gray-900">
    <div class="flex flex-col items-center justify-center">
      <ImageByBackground :src="avatarUrl" alt="avatar" class="w-full flex-1 object-contain" />
      <div class="mt-2 text-center font-bold">
        {{ speaker }}
      </div>
    </div>

    <div class="col-span-2 h-full flex flex-col gap-2">
      <div>
        {{ currentNode?.text }}
      </div>

      <ImageByBackground
        v-if="currentNode?.imageUrl"
        :src="currentNode.imageUrl"
        alt="illustration"
        class="flex-1"
      />

      <div :class="responsesClass">
        <Button
          v-for="r in currentNode?.responses"
          :key="r.label"
          :type="r.type"
          :class="buttonClass"
          md="text-sm"
          @click="choose(r)"
        >
          <img v-if="r.imageUrl" :src="r.imageUrl" class="mr-1 h-6 w-6" alt="">
          {{ r.label }}
        </Button>
      </div>
    </div>
  </div>
</template>
