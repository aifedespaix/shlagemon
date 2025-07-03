<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean, disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}
</script>

<template>
  <label
    class="text-white"
    :class="props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      class="dark:border-white-400/20 h-4 w-4 transition-all duration-500 ease-in-out dark:scale-100 dark:checked:scale-100 dark:hover:scale-110"
      @change="onChange"
    >
  </label>
</template>
