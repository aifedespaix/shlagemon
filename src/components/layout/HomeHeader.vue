<script setup lang="ts">
</script>

<template>
  <header class="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
    <RouterLink to="/" class="flex items-center gap-2">
      <img src="/logo.png" alt="Logo Shlagémon" class="h-8 w-auto">
      <span class="font-bold">Shlagémon</span>
    </RouterLink>
    <nav class="hidden gap-4 md:flex">
      <RouterLink to="/" class="hover:underline">
        Accueil
      </RouterLink>
      <RouterLink to="/schlagedex" class="hover:underline">
        Shlagédex
      </RouterLink>
    </nav>
    <ThemeToggle />
  </header>
</template>
