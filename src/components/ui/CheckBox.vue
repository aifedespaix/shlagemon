<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    disabled?: boolean
    id?: string
  }>(),
  {
    label: '',
    disabled: false,
    id: undefined,
  },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// Génère un id unique si non fourni, pour lier le label et l'input
const internalId = computed(() =>
  props.id || `ui-checkbox-${Math.random().toString(36).slice(2, 10)}`,
)

// Mise à jour du modèle uniquement si différent
function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  if (checked !== props.modelValue)
    emit('update:modelValue', checked)
}
</script>

<template>
  <label
    :for="internalId"
    class="group flex select-none items-center gap-3 text-base font-medium transition-opacity"
    :class="props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
  >
    <!-- Checkbox stylisée -->
    <span
      class="relative h-5 w-5 inline-flex items-center justify-center border border-neutral-400 rounded-lg bg-white shadow-sm transition-all duration-200 dark:border-neutral-700 group-hover:border-blue-500 dark:bg-neutral-900 group-focus-within:ring-2 group-focus-within:ring-blue-500"
    >
      <input
        :id="internalId"
        type="checkbox"
        class="peer absolute inset-0 z-10 h-full w-full cursor-inherit opacity-0"
        :checked="props.modelValue"
        :disabled="props.disabled"
        :aria-checked="props.modelValue"
        :aria-disabled="props.disabled"
        tabindex="0"
        @change="onChange"
      >
      <!-- Visuel du check (SVG) -->
      <span
        class="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200"
        :class="props.modelValue
          ? 'scale-100 opacity-100'
          : 'scale-0 opacity-0'"
      >
        <!-- Un check SVG moderne -->
        <svg viewBox="0 0 20 20" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 10l4 4 6-7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>

    <!-- Slot ou fallback label -->
    <span>
      <slot>
        {{ props.label }}
      </slot>
    </span>
  </label>
</template>
