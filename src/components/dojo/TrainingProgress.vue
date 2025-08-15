<script setup lang="ts">
import { computed } from 'vue'

interface Ids {
  /** ID pour le role="progressbar" */
  progress: string
}

interface Props {
  /** Entraînement en cours (affiche le bandeau + timer). */
  isRunning: boolean
  /** Progression 0..100 (peut être décimale, arrondie pour l’ARIA). */
  progress: number
  /** Libellé mm:ss déjà formaté. */
  remainingLabel: string
  /** Identifiants ARIA/DOM. */
  ids: Ids
}

const props = defineProps<Props>()
const { t } = useI18n()

const ariaNow = computed(() => Math.round(props.progress))
</script>

<template>
  <div class="w-full flex flex-col gap-2 border border-gray-200 rounded-xl p-3 dark:border-gray-700">
    <div
      v-if="isRunning"
      class="w-full flex flex-col items-center rounded-lg bg-amber-50 px-3 py-2 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100"
    >
      <div>{{ t('components.panel.Dojo.status.running') }}</div>
      <div><span class="tabular-nums">{{ remainingLabel }}</span></div>
    </div>

    <div
      :id="ids.progress"
      class="h-2 w-full rounded bg-gray-300 dark:bg-gray-700"
      role="progressbar"
      :aria-label="t('components.panel.Dojo.progress')"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="ariaNow"
    >
      <div
        class="will-change-[width] h-full rounded bg-green-500 transition-[width] duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <div class="mt-2 flex items-center justify-center text-sm">
      <p class="text-gray-500 dark:text-gray-400">
        {{ ariaNow }}%
      </p>
    </div>

    <!-- Live region pour lecteurs d’écran -->
    <span aria-live="polite" class="sr-only">
      {{ t('components.panel.Dojo.progress') }}: {{ ariaNow }}%, {{ t('components.panel.Dojo.duration.remaining') }} {{ remainingLabel }}
    </span>
  </div>
</template>
