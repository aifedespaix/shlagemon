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

function colorClasses(prefix: string) {
  if (!props.effect.iconClass)
    return ''
  return props.effect.iconClass
    .split(' ')
    .filter(c => c.includes('text-'))
    .map((c) => {
      const dark = c.startsWith('dark:')
      const cls = c.replace(/^(dark:)?text-/, '')
      return `${dark ? 'dark:' : ''}${prefix}-${cls}`
    })
    .join(' ')
}

const border = computed(() => `${colorClasses('border')} border`)
const bg = computed(() => `${colorClasses('bg')}/20`)
</script>

<template>
  <Tooltip :text="tooltipText">
    <div class="flex items-center gap-1 rounded px-1 text-xs font-mono" :class="[bg, border]">
      <div class="h-4 w-4" :class="[`i-${props.effect.icon}`, props.effect.iconClass]" />
      <span class="">{{ remaining }}</span>
    </div>
  </Tooltip>
</template>
