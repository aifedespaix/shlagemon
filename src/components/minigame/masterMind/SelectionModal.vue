<script setup lang="ts">
import type { BaseShlagemon } from '~/type'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
  palette: BaseShlagemon[]
}>()
const emit = defineEmits(['update:modelValue', 'select'])

const { t } = useI18n()

function close() {
  emit('update:modelValue', false)
}
function choose(id: string) {
  emit('select', id)
  close()
}
</script>

<template>
  <UiModal :model-value="props.modelValue" footer-close @update:model-value="emit('update:modelValue', $event)">
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-lg font-bold">
        {{ t('components.minigame.masterMind.SelectionModal.title') }}
      </h3>
      <div class="grid grid-cols-3 gap-2" md="grid-cols-4 gap-3">
        <button
          v-for="m in props.palette"
          :key="m.id"
          class="h-14 w-14 flex-center rounded bg-gray-100 dark:bg-gray-700"
          @click="choose(m.id)"
        >
          <img :src="`/shlagemons/${m.id}/${m.id}.png`" :alt="m.name" class="h-full w-full">
        </button>
      </div>
    </div>
  </UiModal>
</template>
