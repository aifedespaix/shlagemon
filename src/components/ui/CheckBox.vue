<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}
</script>

<template>
  <label class="cursor-pointer text-white">
    <input
      type="checkbox"
      :checked="props.modelValue"
      class="dark:border-white-400/20 h-4 w-4 transition-all duration-500 ease-in-out dark:scale-100 dark:checked:scale-100 dark:hover:scale-110"
      @change="onChange"
    >
  </label>
</template>
