<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const props = defineProps<{ title?: string, isInline?: boolean }>()
const opened = ref(true)
const isMobile = useMediaQuery('(max-width: 767px)')
function toggle() {
  if (isMobile.value)
    return
  if (props.title)
    opened.value = !opened.value
}
</script>

<template>
  <div class="panel-wrapper" v-bind="$attrs" :class="isInline ? '' : 'overflow-hidden'" md="">
    <div v-if="props.title" class="mb-1 flex items-center justify-between" :class="isMobile ? '' : 'cursor-pointer'" @click="toggle">
      <div class="flex items-center gap-1">
        <slot name="icon" />
        <span class="font-bold">{{ props.title }}</span>
      </div>
      <div v-if="!isMobile" class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <div v-show="opened" class="tiny-scrollbar flex flex-1 flex-col" :class="isInline ? ' flex items-center justify-center' : 'overflow-auto'">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel-wrapper {
  @apply flex-1 flex flex-col h-full;
}
</style>
