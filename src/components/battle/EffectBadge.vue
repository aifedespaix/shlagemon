<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import { computed } from 'vue'
import Tooltip from '~/components/ui/Tooltip.vue'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{ effect: ActiveEffect, now: number }>()

const remaining = computed(() => formatDuration(props.effect.expiresAt - props.now))

const tooltipText = computed(() =>
  props.effect.type === 'attack'
    ? `Votre attaque est boostée pour encore ${remaining.value}`
    : `Votre défense est boostée pour encore ${remaining.value}`,
)

const colorClasses = computed(() => {
  switch (props.effect.type) {
    case 'attack':
      return 'text-red-500 dark:text-red-400 bg-red-500/15 outline-red-500 dark:border-red-700'
    case 'defense':
      return 'text-blue-500 dark:text-blue-400 bg-blue-500/15 outline-blue-500 dark:border-blue-700'
    default:
      return ''
  }
})
</script>

<template>
  <Tooltip :text="tooltipText">
    <div class="flex items-center gap-1 rounded px-1 text-xs font-mono" :class="colorClasses">
      <div class="h-4 w-4" :class="[`${props.effect.icon}`, props.effect.iconClass]" />
      <span class="">{{ remaining }}</span>
    </div>
  </Tooltip>
</template>
