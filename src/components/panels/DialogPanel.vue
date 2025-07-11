<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
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
  <component
    :is="active?.component"
    v-if="active"
    @done="markDone($event)"
  />
</template>
