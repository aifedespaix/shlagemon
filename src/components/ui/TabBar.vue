<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  options: { label: string, value: string | number, icon?: string }[]
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()
function select(val: string | number) {
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <button
      v-for="opt in props.options"
      :key="opt.value"
      class="flex flex-1 items-center gap-1 border rounded bg-white px-2 py-1 text-sm dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
      :class="props.modelValue === opt.value ? 'font-bold bg-gray-200 dark:bg-gray-700' : ''"
      @click="select(opt.value)"
    >
      <div v-if="opt.icon" :class="opt.icon" />
      <span>{{ opt.label }}</span>
    </button>
  </div>
</template>
