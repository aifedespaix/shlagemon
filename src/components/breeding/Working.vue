<script setup lang="ts">
interface Props {
  readonly isRunning: boolean
  readonly progress: number
  readonly remainingLabel: string
}
const props = defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full rounded-xl p-1 dark:border-gray-700">
      <div
        class="h-2 w-full rounded bg-gray-300 dark:bg-gray-700"
        role="progressbar"
        :aria-label="t('components.panel.Breeding.progress')"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(props.progress)"
      >
        <div
          class="will-change-[width] h-full rounded bg-green-500 transition-[width] duration-300"
          :style="{ width: `${props.progress}%` }"
        />
      </div>

      <div class="flex items-center justify-between text-sm">
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('components.panel.Breeding.remaining') }}:
          <span class="tabular-nums">{{ props.remainingLabel }}</span>
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          {{ Math.round(props.progress) }}%
        </p>
      </div>

      <span aria-live="polite" class="sr-only">
        {{ t('components.panel.Breeding.progress') }}: {{ Math.round(props.progress) }}%,
        {{ t('components.panel.Breeding.remaining') }} {{ props.remainingLabel }}
      </span>
    </div>
  </div>
</template>
