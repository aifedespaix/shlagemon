<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const accessibility = useAccessibilityStore()
const { autoHideTooltips } = storeToRefs(accessibility)
</script>

<template>
  <div class="flex flex-col gap-2">
    <UiCheckBox v-model="autoHideTooltips">
      {{ t('components.settings.AccessibilityTab.autoHide.label') }}
    </UiCheckBox>
    <p class="text-xs opacity-80">
      {{ t('components.settings.AccessibilityTab.autoHide.description') }}
    </p>
  </div>
</template>
