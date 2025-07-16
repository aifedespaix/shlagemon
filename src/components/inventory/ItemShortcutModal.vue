<script setup lang="ts">
import { useItemShortcutModalStore } from '~/stores/itemShortcutModal'
import { useShortcutsStore } from '~/stores/shortcuts'

const modal = useItemShortcutModalStore()
const shortcuts = useShortcutsStore()

const details = computed(() => modal.current?.details || modal.current?.description)

function assign(key: string) {
  if (!modal.current)
    return
  shortcuts.setItemShortcut(modal.current.id, key)
  modal.close()
}
</script>

<template>
  <Modal v-model="modal.isVisible" :close-on-outside-click="false">
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
      <h3 class="text-lg font-bold text-center">
        {{ modal.current?.name }}
      </h3>
      <p class="text-center text-sm">
        {{ details }}
      </p>
      <p class="text-center text-sm">
        Appuyez sur une touche pour assigner un raccourci à cet objet.
      </p>
      <UiKeyCapture auto-start size="lg" model-value="" @update:model-value="assign" />
    </div>
  </Modal>
</template>
