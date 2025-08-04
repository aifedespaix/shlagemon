<script setup lang="ts">
import type { ActiveEffect } from '~/type/effect'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{ effect: ActiveEffect, now: number }>()
const emit = defineEmits<{ (e: 'click'): void }>()

const remaining = computed(() => formatDuration(props.effect.expiresAt - props.now))

const { t } = useI18n()
const tooltipText = computed(() =>
  t(`components.battle.EffectBadge.${props.effect.type}`, { remaining: remaining.value }),
)

const colorClasses = computed(() => {
  switch (props.effect.type) {
    case 'attack':
      return 'text-red-500 dark:text-red-400 bg-red-500/15 outline-red-500 dark:border-red-700'
    case 'defense':
      return 'text-blue-500 dark:text-blue-400 bg-blue-500/15 outline-blue-500 dark:border-blue-700'
    case 'xp':
      return 'text-green-500 dark:text-green-400 bg-green-500/15 outline-green-500 dark:border-green-700'
    case 'vitality':
      return 'text-violet-500 dark:text-violet-400 bg-violet-500/15 outline-violet-500 dark:border-violet-700'
    case 'capture':
      return 'text-teal-500 dark:text-teal-400 bg-teal-500/15 outline-teal-500 dark:border-teal-700'
    default:
      return ''
  }
})
</script>

<template>
  <div
    v-tooltip="tooltipText"
    class="flex items-center gap-1 rounded px-1 text-xs font-mono"
    :class="colorClasses"
    @click="emit('click')"
  >
    <div class="h-4 w-4" :class="[`${props.effect.icon}`, props.effect.iconClass]" />
    <span>{{ remaining }}</span>
  </div>
</template>
