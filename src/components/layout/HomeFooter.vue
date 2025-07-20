<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="border-gray-200 bg-gray-100 p-4 text-center text-xs font-size-2.5 text-gray-600 -m-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
    <div class="font-bold">
      © 2025 <span v-if="new Date().getFullYear() !== 2025">- {{ new Date().getFullYear() }}</span> Shlagémon
    </div>
    <div class="italic">
      {{ t('components.layout.HomeFooter.rights') }}
    </div>
    <div class="">
      {{ t('components.layout.HomeFooter.imageDisclaimer') }}
    </div>
  </footer>
</template>
