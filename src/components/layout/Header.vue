<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue'
import { useSaveStore } from '~/stores/save'

const save = useSaveStore()

function reset() {
  save.reset()
}
</script>

<template>
  <header class="flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
    <img src="/logo.png" alt="Logo Shlagémon" class="h-8">
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <button class="p-1" aria-label="Reset Save" @click="reset">
        🗑
      </button>
    </div>
  </header>
</template>
