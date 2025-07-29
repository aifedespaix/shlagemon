<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <label class="text-sm font-bold">
      {{ t('components.settings.LanguageTab.label') }}
    </label>
    <LanguageSelector />
    <p class="text-center text-xs opacity-80">
      {{ t('components.settings.LanguageTab.description') }}
    </p>
  </div>
</template>
