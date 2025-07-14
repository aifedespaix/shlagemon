<script setup lang="ts">
import type { Achievement } from '~/stores/achievements'
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  achievement: Achievement & { achieved: boolean }
  opened?: boolean
}>(), {
  opened: false,
})

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

function toggle() {
  emit('toggle')
}
</script>

<template>
  <div
    class="flex flex-col border rounded-lg p-2 text-sm shadow-sm transition-colors"
    :class="props.achievement.achieved
      ? 'border-cyan-600 bg-cyan-50 text-gray-900 dark:border-cyan-500 dark:bg-cyan-950/40 dark:text-gray-100'
      : 'border-gray-300 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'"
  >
    <div class="flex cursor-pointer items-center justify-between" @click="toggle">
      <div class="flex items-center gap-2">
        <div :class="props.achievement.icon" class="inline-block text-lg" />
        <span class="font-bold">{{ props.achievement.title }}</span>
      </div>
      <div class="i-carbon-chevron-down transition-transform" :class="props.opened ? '' : 'rotate-90'" />
    </div>
    <div v-show="props.opened" class="mt-1 text-xs">
      <p>{{ props.achievement.description }}</p>
    </div>
  </div>
</template>
