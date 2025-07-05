<script setup lang="ts">
import Tooltip from '~/components/ui/Tooltip.vue'

const props = defineProps<{ remaining: number }>()
</script>

<template>
  <Tooltip :text="`Malade : ${props.remaining} combats restants`">
    <div class="relative flex items-center gap-1 border border-red-500 rounded bg-red-500/20 px-1 text-xs text-red-500">
      <Disease class="h-4 w-4" />
      {{ props.remaining }}
    </div>
  </Tooltip>
</template>
