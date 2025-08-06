<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const accessibility = useAccessibilityStore()
const { autoHideTooltips } = storeToRefs(accessibility)
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-center text-lg font-bold">
      {{ t('components.settings.SettingsModal.tabs.accessibility') }}
    </h3>
    <UiCheckBox v-model="autoHideTooltips">
      {{ t('components.settings.AccessibilityTab.autoHide.label') }}
    </UiCheckBox>
    <p class="text-xs opacity-80">
      {{ t('components.settings.AccessibilityTab.autoHide.description') }}
    </p>
  </div>
</template>
