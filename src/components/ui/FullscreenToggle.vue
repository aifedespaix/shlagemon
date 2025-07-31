<script setup lang="ts">
const isFullscreen = ref(false)
const { t } = useI18n()

function toggle() {
  if (!isFullscreen.value) {
    document.documentElement.requestFullscreen?.()
  }
  else {
    document.exitFullscreen?.()
  }
}

useEventListener(document, 'fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement
})
</script>

<template>
  <UiButton
    type="icon" :aria-label="t('components.ui.FullscreenToggle.label')"
    size="xs"
    @click="toggle"
  >
    <div :class="isFullscreen ? 'i-carbon-minimize' : 'i-carbon-maximize'" />
  </UiButton>
</template>
