<script setup lang="ts">
const props = defineProps<{ remaining: number }>()
const { t } = useI18n()
</script>

<template>
  <div
    v-tooltip="t('components.battle.DiseaseBadge.tooltip', { n: props.remaining })"
    class="relative flex items-center gap-1 border border-red-500 rounded bg-red-500/20 px-1 text-xs text-red-500"
  >
    <Disease class="h-4 w-4" />
    {{ props.remaining }}
  </div>
</template>
