<script setup lang="ts">
const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <button
    aria-label="Changer de thème"
    class="relative h-6 w-12 rounded-full bg-gray-200 transition-colors dark:bg-gray-700"
    type="button"
    @click="toggle()"
  >
    <span
      class="absolute left-0.5 top-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-white text-yellow-500 transition-all dark:bg-gray-900 dark:text-yellow-300"
      :class="isDark ? 'translate-x-6' : ''"
    >
      <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" />
    </span>
  </button>
</template>
