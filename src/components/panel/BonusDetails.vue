<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const dex = useShlagedexStore()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <p v-html="t('components.panel.BonusDetails.intro1')" />
    <p v-html="t('components.panel.BonusDetails.intro2')" />
    <p class="text-center text-xs font-mono">
      {{ t('components.panel.BonusDetails.formula') }}
    </p>
    <div class="mt-2 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <IconShlagedex class="h-5 w-5" />
        <span>{{ t('components.panel.BonusDetails.completion') }} {{ Math.round(dex.potentialCompletionPercent) }}%</span>
      </div>
      <div class="flex items-center gap-2">
        <IconXp class="h-5 w-5" />
        <span>{{ t('components.panel.BonusDetails.averageLevel') }} {{ dex.averageLevel.toFixed(1) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <IconBonus class="h-5 w-5" />
        <span>{{ t('components.panel.BonusDetails.currentBonus') }} +{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </div>
  </div>
</template>
