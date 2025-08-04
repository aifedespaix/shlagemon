<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { t } = useI18n()

const target = typeof document !== 'undefined' ? document.documentElement : null
const { isFullscreen, toggle } = useFullscreen(target)
</script>

<template>
  <UiButton
    v-tooltip.bottom="t('components.ui.FullscreenToggle.label')"
    type="icon"
    :aria-label="t('components.ui.FullscreenToggle.label')"
    size="xs"
    @click="toggle"
  >
    <div :class="isFullscreen ? 'i-carbon-minimize' : 'i-carbon-maximize'" />
  </UiButton>
</template>
