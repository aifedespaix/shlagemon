<script setup lang="ts">
const props = defineProps<{ title?: string, isInline?: boolean }>()
const opened = ref(true)
function toggle() {
  if (props.title)
    opened.value = !opened.value
}
</script>

<template>
  <div class="panel-wrapper" v-bind="$attrs" :class="isInline ? '' : 'overflow-hidden'" md="h-full">
    <div v-if="props.title" class="mb-1 flex cursor-pointer items-center justify-between" @click="toggle">
      <span class="font-bold">{{ props.title }}</span>
      <div class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <div v-show="opened" class="tiny-scrollbar flex flex-1 flex-col" :class="isInline ? ' flex items-center justify-center' : 'overflow-auto'">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel-wrapper {
  @apply flex-1 flex flex-col;
}
</style>
