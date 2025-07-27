<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  options: { label: string, value: string | number, icon?: string, highlight?: boolean }[]
  colors?: Record<string | number, string>
  hoverColors?: Record<string | number, string>
  activeColors?: Record<string | number, string>
  highlightClasses?: string
  disabled?: boolean
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()
function select(val: string | number) {
  if (props.disabled)
    return
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-1">
    <button
      v-for="opt in props.options"
      :key="opt.value"
      class="flex items-center gap-1 rounded-t px-1 py-1 text-sm"
      :class="[
        props.modelValue === opt.value
          ? ['font-bold', props.activeColors?.[opt.value] ?? props.colors?.[opt.value] ?? 'bg-gray-200 dark:bg-gray-700']
          : [
            props.colors?.[opt.value] ?? 'bg-white dark:bg-gray-900',
            props.disabled ? '' : props.hoverColors?.[opt.value] ?? 'hover:bg-gray-100 dark:hover:bg-gray-800',
            opt.highlight && opt.value !== props.modelValue && !props.disabled ? props.highlightClasses ?? 'animate-pulse-alt animate-count-infinite' : '',
          ],
        props.disabled ? 'pointer-events-none opacity-50' : '',
      ]"
      :disabled="props.disabled"
      @click="select(opt.value)"
    >
      <div v-if="opt.icon" :class="opt.icon" />
      <span>{{ opt.label }}</span>
    </button>
  </div>
</template>
