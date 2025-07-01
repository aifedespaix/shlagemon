<script setup lang="ts">
import { useDialogStore } from '~/stores/dialog'

const dialogStore = useDialogStore()

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
</script>

<template>
  <component
    :is="active?.component"
    v-if="active"
    @done="markDone($event)"
  />
</template>
