<script setup lang="ts">
import type { DialogNode, DialogResponse } from '~/types/dialog'
import Button from '~/components/ui/Button.vue'

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
  <div class="dialog grid grid-cols-4 gap-4 rounded bg-white p-4 dark:bg-gray-900">
    <div class="col-span-1 flex flex-col items-center">
      <img :src="avatarUrl" alt="avatar" class="h-auto w-full object-contain">
      <div class="mt-2 text-center font-bold">
        {{ speaker }}
      </div>
    </div>
    <div class="col-span-3 flex flex-col">
      <div class="flex-1 p-2">
        {{ currentNode?.text }}
      </div>
      <div v-if="currentNode?.imageUrl" class="my-2 flex justify-center">
        <img :src="currentNode.imageUrl" alt="illustration" class="max-h-60 object-contain">
      </div>
      <div class="mt-auto flex justify-center gap-2">
        <Button
          v-for="r in currentNode?.responses"
          :key="r.label"
          :type="r.type"
          class="flex flex-col items-center justify-center"
          @click="choose(r)"
        >
          <img v-if="r.imageUrl" :src="r.imageUrl" class="mr-1 h-6 w-6" alt="">
          {{ r.label }}
        </Button>
      </div>
    </div>
  </div>
</template>
