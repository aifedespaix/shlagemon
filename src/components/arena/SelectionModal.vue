<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  modelValue: boolean
  enemyName: string
  selected: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const { t } = useI18n()

function close() {
  emit('update:modelValue', false)
}

function onSelect(mon: DexShlagemon) {
  emit('select', mon)
  close()
}
</script>

<template>
  <UiModal :model-value="props.modelValue" footer-close @update:model-value="emit('update:modelValue', $event)">
    <div class="h-full flex flex-col">
      <h3 class="mb-2 text-center text-lg font-bold">
        {{ t('components.arena.SelectionModal.title', { name: props.enemyName }) }}
      </h3>
      <ShlagemonQuickSelect :selected="props.selected" @select="onSelect" />
    </div>
  </UiModal>
</template>
