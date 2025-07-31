<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
// Strictement typé, même si ce composant n'a pas de props ici
import { computed, ref } from 'vue'

const isDark = useDark()
const toggle = useToggle(isDark)
const { t } = useI18n()

// Pour accessibilité : focus visible
const buttonRef = ref<HTMLButtonElement | null>(null)
const isFocusVisible = ref(false)
function handleFocus(e: FocusEvent) {
  // Focus clavier uniquement
  if ((e as any).sourceCapabilities?.firesTouchEvents === false || e.detail === 0) {
    isFocusVisible.value = true
  }
}
function handleBlur() {
  isFocusVisible.value = false
}
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :aria-label="t('components.ThemeToggle.toggle')"
    :aria-pressed="isDark"
    class="group shadow-input relative h-8 w-16 inline-flex select-none items-center rounded-full bg-gray-200 p-1 outline-none transition-colors duration-300 dark:bg-gray-800"
    :class="isDark ? 'bg-gray-700 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-800'"
    tabindex="0"
    @click="toggle()"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Barre de fond animée -->
    <span
      class="pointer-events-none absolute inset-0 rounded-full transition-colors duration-300"
      :class="isDark ? 'bg-gradient-to-r from-indigo-700 via-slate-700 to-slate-900 opacity-70' : 'bg-gradient-to-r from-yellow-200 via-yellow-50 to-white opacity-60'"
    />

    <!-- Pastille / Thumb -->
    <span
      class="ring-primary relative z-10 h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md ring-offset-2 transition-transform duration-300 dark:bg-gray-900 group-focus-visible:ring-2"
      :class="isDark ? 'translate-x-8' : 'translate-x-0'"
      :style="{ boxShadow: isFocusVisible ? '0 0 0 4px rgba(96,165,250,0.7)' : '' }"
    >
      <div
        class="text-lg transition-colors duration-200"
        :class="isDark ? 'i-carbon-moon text-indigo-300' : 'i-carbon-sun text-yellow-500'"
      />
    </span>
    <!-- Bordure focus accessible -->
    <span
      v-if="isFocusVisible"
      class="ring-primary pointer-events-none absolute inset-0 rounded-full ring-2 ring-offset-2"
    />
    <!-- Optionnel : label pour accessibilité screen-reader -->
    <span class="sr-only">{{ t('components.ThemeToggle.toggle') }}</span>
  </button>
</template>
