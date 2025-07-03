<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: string, placeholder?: string }>(), {
  placeholder: 'Recherche',
})
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :value="props.modelValue"
    type="text"
    :placeholder="props.placeholder"
    class="focus:border-primary min-w-36 flex-1 border border-gray-300 rounded bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
    @input="onInput"
  >
</template>
