<script setup lang="ts">
import { useItemShortcutModalStore } from '~/stores/itemShortcutModal'
import { useShortcutsStore } from '~/stores/shortcuts'

const modal = useItemShortcutModalStore()
const shortcuts = useShortcutsStore()

function assign(key: string) {
  if (!modal.current)
    return
  shortcuts.setItemShortcut(modal.current.id, key)
  modal.close()
}
</script>

<template>
  <Modal v-model="modal.isVisible" :close-on-outside-click="false">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-center text-lg font-bold">
        Assigner un raccourci clavier pour cet objet
      </h3>
      <div class="flex flex-col items-center gap-2">
        <div
          v-if="modal.current?.icon"
          class="h-10 w-10"
          :class="[modal.current.iconClass, modal.current.icon]"
        />
        <img
          v-else-if="modal.current?.image"
          :src="modal.current.image"
          :alt="modal.current?.name"
          class="h-10 w-10 object-contain"
        >
        <span class="text-center font-semibold">{{ modal.current?.name }}</span>
      </div>
      <div class="w-full flex flex-col items-center gap-2 border rounded p-2">
        <p class="text-center text-sm">
          Appuyez sur une touche pour assigner le raccourci clavier
        </p>
        <UiKeyCapture auto-start size="lg" model-value="" @update:model-value="assign" />
      </div>
    </div>
  </Modal>
</template>
