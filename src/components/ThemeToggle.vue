<script setup lang="ts">
const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <button class="p-1" :aria-label="isDark ? 'Basculer en thème clair' : 'Basculer en thème sombre'" @click="toggle()">
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>
