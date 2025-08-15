<script setup lang="ts">
import type { InfoColor } from '~/type/info'

const props = withDefaults(
  defineProps<{ color?: InfoColor, okButton?: boolean }>(),
  { color: 'info', okButton: false },
)

const emit = defineEmits<{ (e: 'ok'): void }>()

const { t } = useI18n()

const colorClasses = computed(() => {
  const map: Record<InfoColor, string> = {
    primary: 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-700 bg-blue-600/10 dark:bg-blue-700/10',
    alert: 'text-yellow-700 dark:text-yellow-500 border-yellow-500 dark:border-yellow-600 bg-yellow-500/10 dark:bg-yellow-600/10',
    danger: 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-700 bg-red-600/10 dark:bg-red-700/10',
    info: 'text-cyan-600 dark:text-cyan-400 border-cyan-600 dark:border-cyan-700 bg-cyan-600/10 dark:bg-cyan-700/10',
    neutral: 'text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-400/10 dark:bg-gray-600/10',
  }
  return map[props.color]
})
</script>

<template>
  <div class="border rounded p-2 text-sm" :class="colorClasses">
    <div class="flex items-center justify-between gap-2">
      <slot />
      <UiButton
        v-if="props.okButton"
        size="sm"
        @click="emit('ok')"
      >
        {{ t('components.ui.Infos.ok') }}
      </UiButton>
    </div>
  </div>
</template>
