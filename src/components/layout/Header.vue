<script setup lang="ts">
import type { Stoppable } from '@vueuse/shared'
import { useTimeoutFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAudioStore } from '~/stores/audio'

const showSettings = ref(false)
const showAudio = ref(false)
const showDeveloper = ref(false)
const showDevButton = import.meta.env.VITE_DEV_TOOLS === 'true'
const clickTimer = ref<Stoppable<[]> | null>(null)
const audio = useAudioStore()
const { t } = useI18n()

const headerId = 'main-header'

function onClick() {
  if (clickTimer.value)
    clickTimer.value.stop()
  clickTimer.value = useTimeoutFn(() => {
    showAudio.value = true
  }, 200)
}
function onDoubleClick() {
  if (clickTimer.value)
    clickTimer.value.stop()
  audio.isMusicEnabled = !audio.isMusicEnabled
}
function onContextMenu(event: Event) {
  event.preventDefault()
  onDoubleClick()
}
const audioIconClass = computed(() =>
  audio.isMusicEnabled
    ? 'i-carbon-volume-up text-green-500 dark:text-green-400 transition-colors duration-150'
    : 'i-carbon-volume-mute text-red-400 dark:text-red-400 animate-shake-x transition-colors duration-150',
)
const headerClass = [
  'flex items-center justify-between',
  'bg-gray-50/80 dark:bg-gray-900/90',
  'px-2 sm:px-3',
  'backdrop-blur',
  'shadow-xs',
  'transition-colors',
  'select-none',
  'z-50',
  'relative',
]
</script>

<template>
  <header
    :id="headerId"
    :style="{ height: '44px', minHeight: '44px', maxHeight: '44px' }"
    :class="headerClass"
    role="banner"
    :tabindex="-1"
    aria-label="Header"
  >
    <div class="h-full min-w-0 flex items-center">
      <img
        src="/logo.png"
        :alt="t('components.layout.Header.logoAlt')"
        class="block h-full w-auto select-none transition-transform duration-200 hover:scale-105"
        draggable="false"
        style="max-height:44px; min-height:44px;"
      >
    </div>
    <nav class="h-full flex items-center gap-1" aria-label="Header actions">
      <ThemeToggle />

      <UiButton
        type="icon"
        :aria-label="t('components.layout.Header.audio')"
        :tabindex="0"
        size="xs"
        @click.stop="onClick"
        @dblclick.stop="onDoubleClick"
        @contextmenu.stop.prevent="onContextMenu"
      >
        <div :class="audioIconClass" aria-live="polite" />
      </UiButton>
      <AudioSettingsModal v-model="showAudio" />

      <UiButton
        type="icon"
        :aria-label="t('components.layout.Header.settings')"
        :tabindex="0"
        size="xs"
        @click="showSettings = true"
      >
        <div class="i-carbon-settings" />
      </UiButton>
      <SettingsSettingsModal v-model="showSettings" />

      <UiButton
        v-if="showDevButton"
        type="icon"
        :aria-label="t('components.layout.Header.developer')"
        :tabindex="0"
        size="xs"
        @click="showDeveloper = true"
      >
        <div class="i-carbon-debug" />
      </UiButton>
      <DeveloperSettingsModal v-if="showDevButton" v-model="showDeveloper" />

      <!-- Plein écran : même hauteur/largeur/visuel que les autres ! -->
      <UiFullscreenToggle />
    </nav>
  </header>
</template>

<style scoped>
@keyframes shake-x {
  10%,
  90% {
    transform: translateX(-1px);
  }
  20%,
  80% {
    transform: translateX(2px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }
  40%,
  60% {
    transform: translateX(4px);
  }
}
.animate-shake-x {
  animation: shake-x 0.15s linear;
}
</style>
