<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  label?: string
  id?: string
}>(), {
  min: 0,
  max: 1,
  step: 0.01,
  label: '',
  id: undefined,
})

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const sliderId = computed(() => props.id || `range-${Math.random().toString(36).slice(2, 10)}`)

const percent = computed(() =>
  ((props.modelValue - props.min) / (props.max - props.min)) * 100,
)

const displayValue = computed(() =>
  props.step < 1 ? props.modelValue.toFixed(2) : props.modelValue.toFixed(0),
)

const bubblePercent = ref(percent.value)
watch(percent, (val) => {
  requestAnimationFrame(() => {
    bubblePercent.value = val
  })
})
</script>

<template>
  <div class="mx-auto max-w-80 w-full md:max-w-96">
    <label
      v-if="props.label"
      :for="sliderId"
      class="mb-2 block text-sm text-gray-900 font-medium dark:text-gray-100"
    >
      {{ props.label }}
    </label>

    <div class="relative flex flex-col items-center">
      <!-- Range stylé -->
      <input
        :id="sliderId"
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="props.modelValue"
        :disabled="props.disabled"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuenow="props.modelValue"
        :aria-label="props.label"
        class="h-3 w-full cursor-pointer rounded-full from-blue-400 via-blue-500 to-blue-600 bg-gradient-to-r outline-none transition-all disabled:cursor-not-allowed dark:from-blue-800 dark:via-blue-700 dark:to-blue-900 disabled:opacity-50 focus-visible:(ring-2 ring-offset-2 ring-blue-400 ring-offset-white dark:ring-blue-500 dark:ring-offset-gray-950)"
        @input="e => emit('update:modelValue', Number.parseFloat((e.target as HTMLInputElement).value))"
      >
      <div
        class="pointer-events-none absolute z-10 min-w-12 select-none border border-blue-200 rounded-lg bg-white px-2 py-1 text-xs text-blue-700 font-mono shadow-lg transition-colors -top-8 dark:border-blue-800 dark:bg-gray-900 dark:text-blue-200"
        :style="{
          left: `calc(${bubblePercent}% - 1.25rem)`,
          transition: 'left 0.2s cubic-bezier(.4,1,.6,1)',
        }"
        aria-hidden="true"
      >
        {{ displayValue }}
      </div>
    </div>

    <div class="mt-1 flex select-none justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{{ props.min }}</span>
      <span>{{ props.max }}</span>
    </div>
  </div>
</template>

<style>
/* --- THUMB ultra custom, moderne, thème à la volée --- */
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 60%, #1e40af 100%);
  border: 2.5px solid #fff;
  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.25);
  transition:
    box-shadow 0.15s,
    border 0.2s;
}
input[type='range']:focus-visible::-webkit-slider-thumb {
  box-shadow:
    0 0 0 4px #60a5fa88,
    0 2px 8px 0 rgba(30, 64, 175, 0.25);
  border-color: #3b82f6;
}
input[type='range']:disabled::-webkit-slider-thumb {
  background: #d1d5db;
  border-color: #e5e7eb;
}
input[type='range']::-moz-range-thumb {
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 60%, #1e40af 100%);
  border: 2.5px solid #fff;
  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.25);
  transition:
    box-shadow 0.15s,
    border 0.2s;
}
input[type='range']:focus-visible::-moz-range-thumb {
  box-shadow:
    0 0 0 4px #60a5fa88,
    0 2px 8px 0 rgba(30, 64, 175, 0.25);
  border-color: #3b82f6;
}
input[type='range']:disabled::-moz-range-thumb {
  background: #d1d5db;
  border-color: #e5e7eb;
}
input[type='range']::-ms-thumb {
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 60%, #1e40af 100%);
  border: 2.5px solid #fff;
  box-shadow: 0 2px 8px 0 rgba(30, 64, 175, 0.25);
  transition:
    box-shadow 0.15s,
    border 0.2s;
}
input[type='range']:focus-visible::-ms-thumb {
  box-shadow:
    0 0 0 4px #60a5fa88,
    0 2px 8px 0 rgba(30, 64, 175, 0.25);
  border-color: #3b82f6;
}
input[type='range']:disabled::-ms-thumb {
  background: #d1d5db;
  border-color: #e5e7eb;
}
</style>
