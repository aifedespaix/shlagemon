<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Valeur actuelle des points d'entraînement. */
  points: number
  /** Maximum possible (safeMax). */
  maxPoints: number
  /** Coût actuel. */
  cost: number
  /** Durée actuelle en minutes. */
  durationMin: number
  /** Solde actuel du joueur. */
  shlagidolar: number
  /** IDs pour accessibilité. */
  ids: {
    slider: string
    number: string
    cost: string
    duration: string
  }
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:points', value: number): void
  (e: 'slider-input', value: number): void
  (e: 'number-input', value: number | string): void
}>()

const { t } = useI18n()

const limitReached = computed(() => props.maxPoints === 1)
</script>

<template>
  <div class="w-full flex flex-col gap-4 border border-gray-200 rounded-xl p-3 dark:border-gray-700">
    <div v-if="limitReached" class="flex flex-col items-center justify-between">
      <div class="text-xs text-amber-500">
        {{ t('components.panel.Dojo.rarity.limitReached') }}
      </div>
    </div>

    <div v-else-if="cost > shlagidolar" class="flex flex-col items-center gap-1 text-sm" :aria-labelledby="ids.cost">
      <span class="text-red-500">
        {{ t('components.panel.Dojo.cost.insufficient') }}
      </span>
    </div>

    <div v-else class="flex flex-col items-center gap-1 text-sm" :aria-labelledby="ids.duration">
      <span :id="ids.duration" class="font-medium">
        {{ t('components.panel.Dojo.duration.label') }}
      </span>
      <span>
        {{ durationMin }}
        <span v-if="durationMin === 1">
          {{ t('components.panel.Dojo.duration.minute') }}
        </span>
        <span v-else>
          {{ t('components.panel.Dojo.duration.minutes') }}
        </span>
      </span>
    </div>
  </div>
</template>
