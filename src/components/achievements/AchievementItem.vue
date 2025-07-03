<script setup lang="ts">
import type { Achievement } from '~/stores/achievements'

const props = defineProps<{ achievement: Achievement & { achieved: boolean } }>()
const opened = ref(false)
function toggle() {
  opened.value = !opened.value
}
</script>

<template>
  <div
    class="flex flex-col border rounded p-1 text-xs transition-colors"
    :class="props.achievement.achieved
      ? 'bg-blue-600 border-blue-500 text-white dark:bg-blue-700'
      : 'bg-gray-50 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-700'"
  >
    <div class="flex cursor-pointer items-center justify-between" @click="toggle">
      <div class="flex items-center gap-2">
        <div :class="props.achievement.icon" class="inline-block" />
        <span>{{ props.achievement.title }}</span>
      </div>
      <div class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <div v-show="opened" class="mt-1">
      <p>{{ props.achievement.description }}</p>
    </div>
  </div>
</template>
