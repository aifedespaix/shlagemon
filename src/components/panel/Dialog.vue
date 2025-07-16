<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'
import { useFeatureLockStore } from '~/stores/featureLock'

const dialogStore = useDialogStore()
const featureLock = useFeatureLockStore()

const active = computed(() => {
  for (const d of dialogStore.dialogs) {
    if (!dialogStore.isDone(d.id) && d.condition())
      return d
  }
  return null
})

function markDone(id: string | undefined) {
  if (id)
    dialogStore.markDone(id)
}

onMounted(featureLock.lockAll)
onUnmounted(featureLock.unlockAll)
</script>

<template>
  <div class="flex flex-col items-center justify-center overflow-auto">
    <div class="max-w-xl w-full flex-1 overflow-hidden p-1" md="aspect-ratio-video">
      <component
        :is="active?.component"
        v-if="active"
        @done="markDone($event)"
      />
    </div>
  </div>
</template>
