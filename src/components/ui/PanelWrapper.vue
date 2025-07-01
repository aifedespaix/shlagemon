<script setup lang="ts">
const props = defineProps<{ title?: string }>()
const opened = ref(true)
function toggle() {
  if (props.title)
    opened.value = !opened.value
}
</script>

<template>
  <div class="panel-wrapper" v-bind="$attrs">
    <div v-if="props.title" class="mb-1 flex cursor-pointer items-center justify-between" @click="toggle">
      <span class="font-bold">{{ props.title }}</span>
      <div class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <div v-show="opened" class="w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel-wrapper {
  @apply overflow-hidden w-full;
}
</style>
