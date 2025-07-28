<script setup lang="ts">
import type { Option as VueSelectOption } from 'vue3-select-component'
import VueSelect from 'vue3-select-component'

type Option = VueSelectOption<string> | VueSelectOption<number>

const props = withDefaults(defineProps<{
  modelValue: string | number
  options: Option[]
  isClearable?: boolean
}>(), {
  isClearable: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selected = computed<string | number>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <VueSelect
    v-model="selected"
    :options="props.options"
    placeholder="Sélectionner..."
    class="custom-select"
    :is-clearable
  />
</template>

<style scoped>
.custom-select {
  --vs-border-radius: 0.25rem; 
  --vs-border: 2px solid #64748b; 
  --vs-text-color: #1e293b; 
  --vs-font-size: 1rem; 
  --vs-background-color: #f8fafc; 
  --vs-placeholder-color: #94a3b8; 
  --vs-indicator-icon-color: #334155; 

  --vs-option-background-color: #f8fafc;
  --vs-option-hover-background-color: #e2e8f0; 
  --vs-option-selected-background-color: #cbd5e1; 
  --vs-option-text-color: #1e293b;
  --vs-option-hover-text-color: #1e293b;
  --vs-option-selected-text-color: #1e293b;
}

.dark .custom-select {
  --vs-background-color: #1e293b; 
  --vs-border: 2px solid #334155; 
  --vs-text-color: #f1f5f9; 
  --vs-placeholder-color: #64748b; 
  --vs-indicator-icon-color: #f1f5f9;

  --vs-option-background-color: #1e293b; 
  --vs-option-hover-background-color: #334155; 
  --vs-option-selected-background-color: #0ea5e9; 
  --vs-option-text-color: #f1f5f9;
  --vs-option-hover-text-color: #ffffff;
  --vs-option-selected-text-color: #ffffff;
}
</style>
