<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  isCompact?: boolean
}>(), {
  modelValue: '',
  disabled: false,
  isCompact: true,
})
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
const { t } = useI18n()
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative w-full">
    <input
      :value="props.modelValue"
      type="text"
      :placeholder="props.placeholder ?? t('placeholder')"
      :disabled="props.disabled"
      class="w-full border-2 border-slate-400 rounded-lg bg-white pr-10 text-sm text-slate-800 shadow-sm transition-all dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-500" :class="[
        props.isCompact
          ? 'px-2 py-1 h-8 text-xs'
          : 'px-4 py-2 h-11',
      ]"
      @input="onInput"
    >
    <button
      v-if="props.modelValue"
      type="button"
      class="absolute right-2 top-1/2 flex items-center justify-center rounded text-slate-400 transition-colors -translate-y-1/2 hover:bg-slate-100 dark:text-slate-300 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-700" :class="[
        props.isCompact
          ? 'h-5 w-5 text-base'
          : 'h-6 w-6 text-lg',
      ]"
      :aria-label="t('components.ui.SearchInput.clear')"
      v-tooltip="t('components.ui.SearchInput.clear')"
      :tabindex="0"
      @click="clear"
    >
      <span class="i-carbon-close pointer-events-none" aria-hidden="true" />
    </button>
  </div>
</template>
