<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  readonly selected: DexShlagemon | null
  readonly cost: number
  readonly durationMin: number
}
const props = defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div class="min-w-0 w-full flex flex-col gap-3">
    <div v-if="props.selected" class="w-full flex flex-col items-center gap-2">
      <div class="flex items-center gap-1 text-sm">
        <span class="text-gray-500 dark:text-gray-400">
          {{ t('components.panel.Breeding.cost') }}:
        </span>
        <UiCurrencyAmount :amount="props.cost" currency="shlagidolar" />
      </div>
      <div class="text-sm">
        <span class="text-gray-500 dark:text-gray-400">
          {{ t('components.panel.Breeding.duration') }}:
        </span>
        <span class="ml-1">{{ props.durationMin }}</span>
        <span class="ml-1">{{ t('components.panel.Breeding.minutes') }}</span>
      </div>
    </div>
  </div>
</template>
