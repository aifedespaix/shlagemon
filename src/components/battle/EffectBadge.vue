<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{ effect: ActiveEffect, now: number }>()
const emit = defineEmits<{ (e: 'click'): void }>()

const remaining = computed(() => formatDuration(props.effect.expiresAt - props.now))

const tooltipText = computed(() => {
  switch (props.effect.type) {
    case 'attack':
      return `Votre attaque est boostée pour encore ${remaining.value}`
    case 'defense':
      return `Votre défense est boostée pour encore ${remaining.value}`
    case 'xp':
      return `Vos gains d'XP sont augmentés pour encore ${remaining.value}`
    default:
      return ''
  }
})

const colorClasses = computed(() => {
  switch (props.effect.type) {
    case 'attack':
      return 'text-red-500 dark:text-red-400 bg-red-500/15 outline-red-500 dark:border-red-700'
    case 'defense':
      return 'text-blue-500 dark:text-blue-400 bg-blue-500/15 outline-blue-500 dark:border-blue-700'
    case 'xp':
      return 'text-green-500 dark:text-green-400 bg-green-500/15 outline-green-500 dark:border-green-700'
    default:
      return ''
  }
})
</script>

<template>
  <UiTooltip :text="tooltipText">
    <div
      class="flex items-center gap-1 rounded px-1 text-xs font-mono"
      :class="colorClasses"
      @click="emit('click')"
    >
      <div class="h-4 w-4" :class="[`${props.effect.icon}`, props.effect.iconClass]" />
      <span>{{ remaining }}</span>
    </div>
  </UiTooltip>
</template>
