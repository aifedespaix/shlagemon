<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  options: { label: string, value: string | number }[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}
</script>

<template>
  <select
    :value="props.modelValue"
    class="focus:border-primary w-full border border-gray-300 rounded bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
    @change="onChange"
  >
    <option v-for="opt in props.options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
