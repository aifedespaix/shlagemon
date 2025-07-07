<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue?: string, placeholder?: string }>(), {
  placeholder: 'Recherche',
})
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative min-w-36 flex-1">
    <input
      :value="props.modelValue"
      type="text"
      :placeholder="props.placeholder"
      class="focus:border-primary w-full border border-gray-300 rounded bg-white px-2 py-1 pr-6 text-sm dark:border-gray-700 dark:bg-gray-800 focus:outline-none"
      @input="onInput"
    >
    <button
      v-if="props.modelValue"
      type="button"
      class="absolute right-1 top-1/2 h-4 w-4 flex items-center justify-center rounded text-gray-500 -translate-y-1/2 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
      @click="clear"
    >
      <div i-carbon-close />
    </button>
  </div>
</template>
