<script setup lang="ts">
const isFullscreen = ref(false)

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
  <UiButton type="icon" aria-label="Plein écran" @click="toggle">
    <div :class="isFullscreen ? 'i-carbon-minimize' : 'i-carbon-maximize'" />
  </UiButton>
</template>
