<script setup lang="ts">
import { useAudioStore } from '~/stores/audio'

const showSettings = ref(false)
const showAudio = ref(false)
const showDeveloper = ref(false)
const clickTimer = ref<number | null>(null)
const audio = useAudioStore()

function onClick() {
  clearTimeout(clickTimer.value as any)
  clickTimer.value = window.setTimeout(() => {
    showAudio.value = true
  }, 300)
}

function onDoubleClick() {
  clearTimeout(clickTimer.value as any)
  audio.isMusicEnabled = !audio.isMusicEnabled
}
</script>

<template>
  <header class="h-12 flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
    <img src="/logo.png" alt="Logo Shlagémon" class="h-20 -my-4">
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <UiButton
        type="icon"
        aria-label="Audio"
        @click.stop="onClick"
        @dblclick.stop="onDoubleClick"
      >
        <div :class="audio.isMusicEnabled ? 'i-carbon-volume-up' : 'i-carbon-volume-mute'" />
      </UiButton>
      <AudioSettingsModal v-model="showAudio" />
      <UiButton type="icon" aria-label="Paramètres" @click="showSettings = true">
        <div class="i-carbon-settings" />
      </UiButton>
      <SettingsModal v-model="showSettings" />
      <UiButton type="icon" aria-label="Développeur" @click="showDeveloper = true">
        <div class="i-carbon-debug" />
      </UiButton>
      <DeveloperSettingsModal v-model="showDeveloper" />
    </div>
  </header>
</template>
