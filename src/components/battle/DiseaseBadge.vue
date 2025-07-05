<script setup lang="ts">
import Tooltip from '~/components/ui/Tooltip.vue'

const props = defineProps<{ remaining: number }>()
</script>

<template>
  <Tooltip :text="`Malade : ${props.remaining} combats restants`">
    <div class="relative flex items-center gap-1 border border-red-500 rounded bg-red-500/20 px-1 text-xs text-red-500">
      <span class="absolute left-1/2 font-bold -top-2 -translate-x-1/2">{{ props.remaining }}</span>
      <div class="i-mdi:sword-cross h-4 w-4" />
      <div class="i-mdi:shield h-4 w-4" />
    </div>
  </Tooltip>
</template>
