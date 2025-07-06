<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: number, min?: number, max?: number, step?: number, disabled?: boolean }>(), {
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
  <div class="relative w-full">
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="props.modelValue"
      :disabled="props.disabled"
      class="range-input"
      @input="onInput"
    >
    <div
      class="absolute rounded bg-gray-700 px-1 text-xs text-white -top-4 -translate-x-1/2 dark:bg-gray-200 dark:text-gray-800"
      :style="{ left: `calc(${percent}% )` }"
    >
      {{ props.modelValue.toFixed(2) }}
    </div>
  </div>
</template>

<style scoped>
.range-input {
  @apply appearance-none w-full h-2 rounded bg-gray-300 dark:bg-gray-700 outline-none accent-blue-600 dark:accent-blue-400;
}
.range-input::-webkit-slider-thumb {
  @apply appearance-none h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 cursor-pointer;
}
.range-input::-moz-range-thumb {
  @apply h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 cursor-pointer;
}
</style>
