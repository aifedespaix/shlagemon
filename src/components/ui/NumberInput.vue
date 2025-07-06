<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: number, min?: number }>(), { min: 1 })
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()
function onInput(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLInputElement).value))
}
</script>

<template>
  <input
    type="number"
    :min="props.min"
    :value="props.modelValue"
    class="focus:border-primary w-full border border-gray-300 rounded bg-white px-2 py-1 text-center text-sm dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
    @input="onInput"
  >
</template>
