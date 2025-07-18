<script setup lang="ts">
import { ref } from 'vue'
import { useEggStore } from '~/stores/egg'

const eggs = useEggStore()
const now = ref(Date.now())
setInterval(() => now.value = Date.now(), 1000)

function remaining(egg: { hatchesAt: number }) {
  return Math.max(0, Math.ceil((egg.hatchesAt - now.value) / 1000))
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <h3 class="font-bold">
        Poulailler
      </h3>
    </template>
    <template #content>
      <div v-if="!eggs.eggs.length" class="text-center text-sm">
        Aucun œuf en incubation
      </div>
      <div
        v-for="egg in eggs.eggs"
        :key="egg.id"
        class="flex items-center justify-between border-b p-1"
      >
        <div class="flex items-center gap-1">
          <div
            class="i-game-icons:egg-eye h-6 w-6"
            :class="{
              'text-orange-500 dark:text-orange-400': egg.type === 'feu',
              'text-blue-500 dark:text-blue-400': egg.type === 'eau',
              'text-green-500 dark:text-green-400': egg.type === 'herbe',
            }"
          />
          <span class="text-sm capitalize">{{ egg.type }}</span>
        </div>
        <span class="text-xs">{{ remaining(egg) }}s</span>
      </div>
    </template>
  </LayoutScrollablePanel>
</template>
