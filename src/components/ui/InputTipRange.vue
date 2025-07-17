<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>(), {
  min: 0,
  max: 1,
  step: 0.01,
})
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()
function onInput(e: Event) {
  const value = Number.parseFloat((e.target as HTMLInputElement).value)
  emit('update:modelValue', value)
}
const percent = computed(() => ((props.modelValue - props.min) / (props.max - props.min)) * 100)
</script>

<template>
  <div class="relative mx-auto max-w-72 w-full md:max-w-96">
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="props.modelValue"
      :disabled="props.disabled"
      class="range-input"
      :aria-valuemin="props.min"
      :aria-valuemax="props.max"
      :aria-valuenow="props.modelValue"
      @input="onInput"
    >
    <div
      class="absolute rounded bg-gray-700 px-2 text-xs text-white -top-6 -translate-x-1/2 dark:bg-gray-200 dark:text-gray-800"
      :style="{ left: `calc(${percent}% )` }"
    >
      {{ props.modelValue.toFixed(2) }}
    </div>
    <div class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{{ props.min }}</span>
      <span>{{ props.max }}</span>
    </div>
  </div>
</template>

<style scoped>
.range-input {
  @apply appearance-none w-full h-3 rounded-full bg-gray-300 dark:bg-gray-700 outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed;
}
.range-input::-webkit-slider-thumb {
  @apply appearance-none h-6 w-6 rounded-full bg-blue-600 dark:bg-blue-400 shadow-md cursor-pointer disabled:cursor-not-allowed;
}
.range-input:disabled::-webkit-slider-thumb {
  @apply bg-blue-600 dark:bg-blue-400;
}
.range-input::-moz-range-thumb {
  @apply h-6 w-6 rounded-full bg-blue-600 dark:bg-blue-400 border-none cursor-pointer disabled:cursor-not-allowed;
}
.range-input:disabled::-moz-range-thumb {
  @apply bg-blue-600 dark:bg-blue-400;
}
</style>
