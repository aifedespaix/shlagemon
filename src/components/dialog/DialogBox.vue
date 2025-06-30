<script setup lang="ts">
import type { DialogNode, DialogResponse } from '~/type/dialog'
import Button from '~/components/ui/Button.vue'
import ImageByBackground from '../ui/ImageByBackground.vue'

const { dialogTree, speaker, avatarUrl }
  = defineProps<{ dialogTree: DialogNode[], speaker: string, avatarUrl: string }>()

const currentNode = ref<DialogNode | undefined>()

onMounted(() => {
  currentNode.value = dialogTree[0]
})

function choose(r: DialogResponse) {
  if (r.nextId)
    currentNode.value = dialogTree.find(d => d.id === r.nextId)
  else if (r.action)
    r.action()
}
</script>

<template>
  <div class="grid grid-cols-4 h-full gap-2 rounded" bg="white dark:gray-900">
    <div class="flex flex-col items-center justify-center">
      <ImageByBackground :src="avatarUrl" alt="avatar" class="w-full flex-1 object-contain" />
      <div class="mt-2 text-center font-bold">
        {{ speaker }}
      </div>
    </div>

    <div class="col-span-3 h-full flex flex-col gap-2">
      <div>
        {{ currentNode?.text }}
      </div>

      <ImageByBackground
        v-if="currentNode?.imageUrl"
        :src="currentNode.imageUrl"
        alt="illustration"
        class="flex-1"
      />

      <div class="mt-auto flex justify-center gap-2">
        <Button
          v-for="r in currentNode?.responses"
          :key="r.label"
          :type="r.type"
          class="flex flex-1 flex-col items-center justify-center text-xs"
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
