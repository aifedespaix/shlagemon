<script setup lang="ts">
import { useAchievementsStore } from '~/stores/achievements'

const store = useAchievementsStore()
const list = computed(() => store.unlockedList)
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      v-for="a in list"
      :key="a.id"
      class="flex items-center gap-2 border border-gray-300 rounded bg-gray-50 p-1 text-xs dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="i-carbon-award inline-block text-green-600" />
      <span>{{ a.title }}</span>
    </div>
  </div>
</template>
