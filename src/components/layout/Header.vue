<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FullscreenToggle from '~/components/ui/FullscreenToggle.vue'
import { useAudioStore } from '~/stores/audio'

const showSettings = ref(false)
const showAudio = ref(false)
const showDeveloper = ref(false)
const showDevButton = import.meta.env.VITE_DEV_TOOLS === 'true'
const clickTimer = ref<UseTimeoutFnReturn | null>(null)
const audio = useAudioStore()
const { t, locale } = useI18n()
const currentLocale = Intl.DateTimeFormat().resolvedOptions().locale

function onClick() {
  if (clickTimer.value)
    clickTimer.value.stop()
  clickTimer.value = useTimeoutFn(() => {
    showAudio.value = true
  }, 300)
}

function onDoubleClick() {
  if (clickTimer.value)
    clickTimer.value.stop()
  audio.isMusicEnabled = !audio.isMusicEnabled
}
</script>

<template>
  <header class="h-12 flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
    <div class="flex items-center gap-2">
      <img src="/logo.png" :alt="t('components.layout.Header.logoAlt')" class="h-20 -my-4">
      <div class="flex flex-col text-xs leading-tight">
        <span class="font-bold sm:text-sm">{{ t('components.layout.Header.title') }}</span>
        <span>{{ t('components.layout.Header.language') }}: {{ locale }}</span>
        <span>{{ t('components.layout.Header.locale') }}: {{ currentLocale }}</span>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <FullscreenToggle />
      <ThemeToggle />
      <UiButton
        type="icon"
        :aria-label="t('components.layout.Header.audio')"
        @click.stop="onClick"
        @dblclick.stop="onDoubleClick"
      >
        <div :class="audio.isMusicEnabled ? 'i-carbon-volume-up' : 'i-carbon-volume-mute'" />
      </UiButton>
      <AudioSettingsModal v-model="showAudio" />
      <UiButton type="icon" :aria-label="t('components.layout.Header.settings')" @click="showSettings = true">
        <div class="i-carbon-settings" />
      </UiButton>
      <SettingsSettingsModal v-model="showSettings" />
      <UiButton
        v-if="showDevButton"
        type="icon"
        :aria-label="t('components.layout.Header.developer')"
        @click="showDeveloper = true"
      >
        <div class="i-carbon-debug" />
      </UiButton>
      <DeveloperSettingsModal v-if="showDevButton" v-model="showDeveloper" />
    </div>
  </header>
</template>
