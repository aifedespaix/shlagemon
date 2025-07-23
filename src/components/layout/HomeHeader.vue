<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
    <RouterLink to="/" class="flex items-center gap-2">
      <img src="/logo.webp" :alt="t('components.layout.HomeHeader.logoAlt')" class="h-8 w-auto">
      <span class="font-bold">{{ t('components.layout.HomeHeader.title') }}</span>
    </RouterLink>
    <nav class="hidden gap-4 md:flex">
      <RouterLink to="/" class="hover:underline">
        {{ t('components.layout.HomeHeader.home') }}
      </RouterLink>
      <RouterLink to="/schlagedex" class="hover:underline">
        {{ t('components.layout.HomeHeader.dex') }}
      </RouterLink>
    </nav>
    <ThemeToggle />
  </header>
</template>
