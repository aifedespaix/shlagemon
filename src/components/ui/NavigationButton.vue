<script setup lang="ts">
const props = withDefaults(defineProps<{ icon: string, label: string, disabled?: boolean }>(), {
  disabled: false,
})
const emit = defineEmits(['click'])
</script>

<template>
  <UiTooltip :text="props.label">
    <button
      class="grid grid-rows-2 max-h-[120px] flex-shrink-0 gap-1 rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      :class="props.disabled ? 'opacity-50 cursor-not-allowed' : ''"
      :disabled="props.disabled"
      @click="emit('click')"
    >
      <div class="flex-center">
        <div class="h-6 w-6" :class="props.icon" />
      </div>
      <div class="flex-center">
        <span>{{ props.label }}</span>
      </div>
    </button>
  </UiTooltip>
</template>
