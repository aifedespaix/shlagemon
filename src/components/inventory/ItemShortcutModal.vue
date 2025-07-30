<script setup lang="ts">
import type UiKeyCapture from '~/components/ui/KeyCapture.vue'
import type { ItemId } from '~/data/items'

const modal = useItemShortcutModalStore()
const shortcuts = useShortcutsStore()
const { t } = useI18n()
const capture = ref<InstanceType<typeof UiKeyCapture> | null>(null)

watch(() => modal.isVisible, (visible) => {
  if (!visible)
    capture.value?.stopCapture()
})

function assign(key: string) {
  if (!modal.current)
    return
  shortcuts.setItemShortcut(modal.current.id as ItemId, key)
  modal.close()
}
</script>

<template>
  <UiModal v-model="modal.isVisible" :close-on-outside-click="false" @close="capture?.stopCapture()">
    <div class="flex flex-col items-center gap-4">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.inventory.ItemShortcutModal.title') }}
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
          :alt="t(modal.current?.name || '')"
          class="h-10 w-10 object-contain"
        >
        <span class="text-center font-semibold">{{ t(modal.current?.name || '') }}</span>
      </div>
      <div class="w-full flex flex-col items-center gap-2 border rounded p-2">
        <p class="text-center text-sm">
          {{ t('components.inventory.ItemShortcutModal.pressKey') }}
        </p>
        <UiKeyCapture
          ref="capture"
          :auto-start="modal.isVisible"
          size="lg"
          model-value=""
          @update:model-value="assign"
        />
      </div>
    </div>
  </UiModal>
</template>
